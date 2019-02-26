import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoChatService} from "../service/video-chat.service";
import {DoctorChatService} from "../service/doctor-chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {count} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material";

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
  private appCode
  private count=1;
  private arry;
  private PID;
  private drug="";
  private meal;
  private morning=false;
  private afternoon = false;
  private evening = false;
  private night = false;
  private qty ="";
  private days="";
  private pressID;
  private prescAdded = false;
  private lastID;
  private prescription :any;
  constructor(private videoChat:VideoChatService,private doctorChatService:DoctorChatService,private route:Router,private Aroute: ActivatedRoute,
              private snackBar: MatSnackBar) {
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

    //---------------------------------------------------------------------------
    //Get this side peer id and update it in to the data base
    this.peer = new Peer({key: "p17fpt3b2vnuq5mi"})
    setTimeout(() => {
      this.myPeerID = this.peer.id;
      this.updateKey(this.DID,this.myPeerID);
    }, 1000)
    //----------------------------------------------------------------------------


    // this.peer.on('connection', function (conn) {
    //   conn.on('data', function (data) {
    //
    //     console.log(data);
    //   })
    // })

    //--------------------------------------------------------------------------
    //Answer the request come from other end
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
    //-----------------------------------------------------------------------------
    this.getPatientKey();
  }

  // connect() {
  //   var conn = this.peer.connect(this.anotherid);
  //   conn.on('open', function () {
  //     conn.send('hi')
  //   })
  // }

  //--------------------------------------------------------------------------
  //Connect to the the other id and video call
  videoConnect(key) {
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname =key;
    console.log(fname)
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
  //-------------------------------------------------------------------------------
  }


  getPatientKey(){
    this.doctorChatService.getPatientKey(this.PID).subscribe(result=>{
      this.videoConnect(result)
    })
  }
  updateKey(DID,key){
    this.doctorChatService.updateKey(DID,key).subscribe(result=>{})
  }


  addTextBox(){
    this.count++;
    this.arry = Array(this.count).fill(0).map((x,i)=>i);


  }

  submitPrescription(drugForm){

    let drug = drugForm.value;
    var nums;

      this.doctorChatService.getPrescriptionLastId().subscribe(result=>{
        if(this.prescAdded==false){
          this.lastID = result;
          var num =  parseInt(this.lastID)+1;
          nums = 222;
          this.pressID = "Pres" + num;
          this.prescription={
            prescriptionID : this.pressID,
            date:this.myFormattedDate
          }
          this.addPrespription(this.pressID,this.prescription)
        }


        console.log(this.prescription)
        drug["meal"] = this.meal;
        drug["prescriptionDTO"] = this.prescription
        this.doctorChatService.addDrug(this.pressID,drug).subscribe(result=>{
          if(result){
              this.morning = false;
              this.afternoon = false;
              this.night = false;
              this.evening = false;
              this.drug = "";
              this.qty = "";
              this.days = ""
              this.snackBar.open("Drug Added", "",{
                duration: 5000,
              });
          }
        });

      })
  }


  selectMeal(meal){
    this.meal = meal;
  }

  addPrespription(presID,prescription){

    this.doctorChatService.addPrescription(presID,this.appCode,prescription).subscribe(result=>{
      if(result==true){
        this.prescAdded = true;
      }
    })
  }
e
  finishAppointment(){
      console.log(this.patientKey)
    var conn = this.peer.connect(this.patientKey);
    conn.on('open', function () {
      conn.send("hello")
    })
    // this.route.navigate(["Doctor-Appointment"])

    // this.route.navigateByUrl('/Doctor-VideoChat-DashBoard', {skipLocationChange: true}).then(()=>
    //   this.route.navigate(["Doctor-Appointment"]));
    // this.doctorChatService.finishAppointment(this.appCode).subscribe(result=>{
    //   if(result){
    //
    //   }
    // })
  }

}
