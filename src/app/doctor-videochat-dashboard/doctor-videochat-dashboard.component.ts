import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoChatService} from "../service/video-chat.service";
import {DoctorChatService} from "../service/doctor-chat.service";

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
  constructor(private videoChat:VideoChatService,private doctorChatService:DoctorChatService) {
  }


  ngOnInit() {
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
}
