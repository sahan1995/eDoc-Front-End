import { Component, OnInit } from '@angular/core';
import {DoctorChatRoomService} from "../../../service/doctor-chat-room.service";

@Component({
  selector: 'app-doctor-chat-list',
  templateUrl: './doctor-chat-list.component.html',
  styleUrls: ['./doctor-chat-list.component.css']
})
export class DoctorChatListComponent implements OnInit {

  constructor(public doctorchatRoomSerivce:DoctorChatRoomService) { }

  ngOnInit() {

    var chatroom = localStorage.getItem("fname")+'chat';
    this.doctorchatRoomSerivce.getChatRooms(chatroom)


  }




}
