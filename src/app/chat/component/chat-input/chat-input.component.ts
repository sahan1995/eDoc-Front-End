import { Component, OnInit } from '@angular/core';
import {ChatroomService} from "../../../service/chatroom.service";

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  public newMessageText:string='';


  constructor(
    private chatrommService:ChatroomService
  ) { }

  ngOnInit() {
  }

  submit(message){

    this.chatrommService.createMessage(message)
    console.log("New Message : ",message)

    this.newMessageText ='';
  }
}
