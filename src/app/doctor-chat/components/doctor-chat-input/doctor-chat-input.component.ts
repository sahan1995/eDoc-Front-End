import { Component, OnInit } from '@angular/core';
import {DoctorChatRoomService} from "../../../service/doctor-chat-room.service";

@Component({
  selector: 'app-doctor-chat-input',
  templateUrl: './doctor-chat-input.component.html',
  styleUrls: ['./doctor-chat-input.component.css']
})
export class DoctorChatInputComponent implements OnInit {
  public newMessageText:string='';

  constructor(private docChatRoomService:DoctorChatRoomService) { }

  ngOnInit() {
  }
  submit(message){

    this.docChatRoomService.createMessage(message)
    console.log("New Message : ",message)

    this.newMessageText ='';
  }
}
