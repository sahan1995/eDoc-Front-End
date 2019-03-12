import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {ChatroomService} from "../../../service/chatroom.service";

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.css']
})
export class ChatroomWindowComponent implements OnInit {


  public chatroom:Observable<any>=null;
  public messages:Observable<any>

  constructor(
    private route:ActivatedRoute,
    private chatroomService:ChatroomService
  ) {




    this.chatroomService.selectedChatRoom.subscribe(chatroom=>{

      this.chatroom=chatroom;
    })
    this.chatroomService.selectedChatroomMessages.subscribe(messages=>{
      console.log(messages)
      this.messages = messages;
    })
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      const  chatroomId = params.get("chatroomId");
      console.log(chatroomId)
      this.chatroomService.changeChatRomm.next(chatroomId)

      // var chatRoomName = localStorage.getItem("fname")+"chat";
      // this.getselectedChatRoomAndMessages(chatRoomName,chatroomId);
    })
  }

  getselectedChatRoomAndMessages(chatRoomName,chatroomID){

    this.chatroom = this.chatroomService.selectedChatRoomFun(chatRoomName,chatroomID);
    this.messages = this.chatroomService.getSelectedCharRoomMessages(chatRoomName,chatroomID);
    console.log(this.messages)
  }


}
