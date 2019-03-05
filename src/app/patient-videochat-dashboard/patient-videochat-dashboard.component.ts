import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {VideoChatService} from "../service/video-chat.service";
import {DoctorChatService} from "../service/doctor-chat.service";
import {PatientVideochatService} from "../service/patient-videochat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Promise} from "q";

declare var Peer: any;
declare let paypal:any;
@Component({
  selector: 'app-patient-videochat-dashboard',
  templateUrl: './patient-videochat-dashboard.component.html',
  styleUrls: ['./patient-videochat-dashboard.component.css']
})


export class PatientVideochatDashboardComponent implements OnInit,AfterViewChecked {

  @ViewChild("myVideo")
  myVideo: any;

  peer
  anotherid;
  myPeerID;
  private doctorKey;
  private PID;
  private DID;
  private appCode
  private callConnected = false;
  private drugs: any;
  private showPres = false;
  private bootbox = this;

  private addScpipt : boolean = false;
  private finalAmount : number = 1;


  private paypalConfig = {
    env : 'sandbox',
    client:{
      sandbox : 'AacN8iysR1yat5jumlfFPF05UVLPfYPuXL3XTG3WknnjLa1P_xFWjwmsjHwtiDBpymRZ_3xHM9cGgX16',

    },
    commit : true,
    payment:(data,actions)=>{
      return actions.payment.create({
        payment:{
          transactions:[
            {amount:{total:this.finalAmount,currency:'USD'}}
          ]
        }
      });
    },
    onAuthorize : (data,actions)=>{
      return actions.payment.execute().then((payment)=>{
        console.log("Success ")
      })
    }
  };

  constructor(private videoChat: VideoChatService, private patientVideoChatSer: PatientVideochatService,
              private route: Router, private Aroute: ActivatedRoute,) {
  }


  ngOnInit() {

    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
      return;
    }
    this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.PID = localStorage.getItem("id");
    this.DID = this.Aroute.snapshot.params.id;
    this.appCode = this.Aroute.snapshot.params.appCode;
    console.log(this.appCode)

    console.log(this.DID + " " + this.appCode)

    // let video = this.myVideo.nativeElement;
    this.peer = new Peer({key: "p17fpt3b2vnuq5mi"})
    setTimeout(() => {
      this.myPeerID = this.peer.id;
      this.setMyKey(this.myPeerID)
      this.updateMyKey(this.myPeerID);
    }, 1000)


    var thisCom = this;
    // var test = this.endCallAndShowPrescription();
    this.peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        if (data) {
          // thisCom.endCallAndShowPrescription();
          console.log()

          thisCom.patientVideoChatSer.getPrescription(thisCom.appCode).subscribe(result => {
            console.log(result.drugs);
            thisCom.showPres = true;
            thisCom.drugs = result.drugs;

          })
        }
      })
    })

    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia
    this.peer.on('call', function (call) {
      n.getUserMedia({video: true, audio: true}, function (stream) {
        call.answer(stream)
        call.on('stream', function (remotestream) {
          video.src = URL.createObjectURL(remotestream);
          video.play()

        })
      }, function (err) {
        console.log('Failed to get local stream', err);
      })
    })

    this.getKey();


  }

  connect() {
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', function () {
      conn.send('hi')
    })
  }


  getDoctorKey() {

    this.patientVideoChatSer.getDoctorKey(this.DID).subscribe(result => {
      this.videoConnect(result)
    })

  }


  videoConnect(doctorKey) {
    this.callConnected = true;
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var key = doctorKey
    // var fname = this.anotherid;

    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia

    n.getUserMedia({video: true, audio: true}, function (stream) {
      var call = localvar.call(key, stream);

      console.log(call)

      call.on('stream', function (remotestream) {

        video.src = URL.createObjectURL(remotestream)
        video.play();
      })


    }, function (err) {
      console.log('Failed to get local stream', err);
    })

  }

  getKey() {
    this.videoChat.cast.subscribe(result => {
      this.doctorKey = result;
    })
  }

  setMyKey(key) {

    this.videoChat.addKey(key);
  }

  updateMyKey(key) {
    this.patientVideoChatSer.updateKey(this.PID, key).subscribe(result => {
    })
  }

  endCallAndShowPrescription() {

    this.showPres = true;
    this.patientVideoChatSer.getPrescription(this.appCode).subscribe(result => {
      this.drugs = result.drugs;
    })

  }


  addPaypalScript(){
    this.addScpipt = true;
    return new Promise((resolve,reject)=>{

      let scripttagElement = document.createElement('script')
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement)

    })
  }

  ngAfterViewChecked():void{
    if(!this.addScpipt){
      this.addPaypalScript().then(()=>{

        paypal.Button.render(this.paypalConfig,'paypal-checkout-btn')
      })
    }
  }

}
