import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoChatService} from "../service/video-chat.service";
import {DoctorChatService} from "../service/doctor-chat.service";
import {PatientVideochatService} from "../service/patient-videochat.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var Peer: any;
@Component({
  selector: 'app-patient-videochat-dashboard',
  templateUrl: './patient-videochat-dashboard.component.html',
  styleUrls: ['./patient-videochat-dashboard.component.css']
})
export class PatientVideochatDashboardComponent implements OnInit {

  @ViewChild("myVideo")
  myVideo: any;

  peer
  anotherid;
  myPeerID;
  private doctorKey;
  private PID;
  private DID;
  private appCode
  constructor(private videoChat:VideoChatService, private patientVideoChatSer:PatientVideochatService,
              private route:Router,private Aroute: ActivatedRoute,) {
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


    console.log(this.DID+" "+this.appCode)

    let video = this.myVideo.nativeElement;
    this.peer = new Peer({key: "p17fpt3b2vnuq5mi"})
    setTimeout(() => {
      this.myPeerID = this.peer.id;
      this.setMyKey(this.myPeerID)
      this.updateMyKey(this.myPeerID);
    }, 1000)
    this.peer.on('connection', function (conn) {
      conn.on('data', function (data) {

        console.log(data);
      })
    })
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia||n.webkitGetUserMedia||n.mozGetUserMedia
    this.peer.on('call',function (call) {
      n.getUserMedia({video:true,audio:true},function (stream) {
        call.answer(stream)
        call.on('stream',function (remotestream) {
          video.src = URL.createObjectURL(remotestream);
          video.play()
        })
      },function (err) {
        console.log('Failed to get local stream' ,err);
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


  getDoctorKey(){

    this.patientVideoChatSer.getDoctorKey(this.DID).subscribe(result=>{
      console.log(result);
    })

  }


  videoConnect() {
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;

    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia||n.webkitGetUserMedia||n.mozGetUserMedia

    n.getUserMedia({video:true,audio:true},function (stream) {
      var call = localvar.call(fname,stream);
      call.on('stream',function (remotestream) {
        video.src = URL.createObjectURL(remotestream)
        video.play();
      })
    },function (err) {
      console.log('Failed to get local stream' ,err);
    })

  }

    getKey(){
    this.videoChat.cast.subscribe(result=>{
      this.doctorKey = result;
    })
    }

    setMyKey(key){

    this.videoChat.addKey(key);
    }

    updateMyKey(key){
      this.patientVideoChatSer.updateKey(this.PID,key).subscribe(result=>{})
    }


}
