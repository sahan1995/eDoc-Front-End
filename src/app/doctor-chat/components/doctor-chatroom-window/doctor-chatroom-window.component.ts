import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ChatroomService} from "../../../service/chatroom.service";
import {ActivatedRoute} from "@angular/router";
import {DoctorChatRoomService} from "../../../service/doctor-chat-room.service";

@Component({
  selector: 'app-doctor-chatroom-window',
  templateUrl: './doctor-chatroom-window.component.html',
  styleUrls: ['./doctor-chatroom-window.component.css']
})
export class DoctorChatroomWindowComponent implements OnInit {


  public docchatroom:Observable<any>=null;
  public docmessages:Observable<any>



  constructor(
    private route:ActivatedRoute,
    private DocchatroomService:DoctorChatRoomService
  ) {
    this.DocchatroomService.selectedChatRoom.subscribe(chatroom=>{
      this.docchatroom=chatroom;
    })
    this.DocchatroomService.selectedChatroomMessages.subscribe(messages=>{
      if(messages!=null){
        messages.forEach(msg=>{
          if(msg.sender.firstName==localStorage.getItem('fname')){
            msg["float"]="right"
            msg['bgColor']='lightgreen';
          }else{
            msg["float"]="left"
            msg['bgColor']='white';
          }

        })
        this.docmessages = messages;
        console.log(this.docmessages)
      }

    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      const  chatroomId = params.get("chatroomId");
      console.log(chatroomId)
      this.DocchatroomService.changeChatRomm.next(chatroomId)

      // var chatRoomName = localStorage.getItem("fname")+"chat";
      // this.getselectedChatRoomAndMessages(chatRoomName,chatroomId);
    })
  }

}
