import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoChatService} from "../service/video-chat.service";
import {DoctorChatService} from "../service/doctor-chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {count} from "rxjs/operators";
import {DatePipe} from "@angular/common";

declare var Peer: any;

@Component({
  selector: 'app-doctor-videochat-dashboard',
  templateUrl: './doctor-videochat-dashboard.component.html',
  styleUrls: ['./doctor-videochat-dashboard.component.css']
})
export class DoctorVideochatDashboardComponent implements OnInit {

  @ViewChild("myVideo")
  myVideo: any;

  peer
  anotherid;
  myPeerID;
  private patientKey
  private DID;
  private PIP;
  private appCode
  private count=1;
  private arry;

  private drug="";
  private meal;
  private morning=false;
  private afternoon = false;
  private evening = false;
  private night = false;
  private qty ="";
  private days="";


  constructor(private videoChat:VideoChatService,private doctorChatService:DoctorChatService,private route:Router,private Aroute: ActivatedRoute) {
  }

  curDate = new Date();
  dateFormat = require('dateformat');
  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(this.curDate, 'yyyy-MM-dd');
  time = this.dateFormat(this.curDate, "h:MM:ss TT");


  ngOnInit() {
  console.log(this.morning)

    this.arry = Array(this.count).fill(0).map((x,i)=>i);
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
      return;
    }
    this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.DID = localStorage.getItem("id");

    this.PID = this.Aroute.snapshot.params.id;
    this.appCode = this.Aroute.snapshot.params.appCode;


    let video = this.myVideo.nativeElement;
    this.DID = localStorage.getItem('id')
    this.peer = new Peer({key: "p17fpt3b2vnuq5mi"})
    setTimeout(() => {
      this.myPeerID = this.peer.id;
      this.updateKey(this.DID,this.myPeerID);
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
    this.getPatientKey();
  }

  connect() {
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', function () {
      conn.send('hi')
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

  getPatientKey(){
    this.videoChat.cast.subscribe(result=>{
      this.patientKey = result;
    })
  }
  updateKey(DID,key){
    this.doctorChatService.updateKey(DID,key).subscribe(result=>{})
  }


  addTextBox(){
    this.count++;
    this.arry = Array(this.count).fill(0).map((x,i)=>i);


  }

  submitPrescription(prescriptionForm){

    let precription = prescriptionForm.value;
    this.morning = false;
    precription["appCode"] = this.appCode;
    precription ["meal"] = this.meal;
    precription["date"] = this.myFormattedDate;
    console.log(precription)

    // this.doctorChatService.addMedialReport(precription).subscribe(result=>{})
    this.doctorChatService.getMedicalReport().subscribe(result=>{
      console.log(result)
    })
  }


  selectMeal(meal){
    this.meal = meal;
  }
}
