import { Component, OnInit } from '@angular/core';
import {ChatroomService} from "../../../service/chatroom.service";

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit {

  constructor(public chatroomService:ChatroomService) { }

  ngOnInit() {

    this.getChatRooms();


  }


  getChatRooms(){
    var chatroom = localStorage.getItem("fname")+'chat';
    this.chatroomService.getChatRooms(chatroom)
  }

}
