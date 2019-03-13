import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../classes/message";

@Component({
  selector: 'app-doctor-chat-message',
  templateUrl: './doctor-chat-message.component.html',
  styleUrls: ['./doctor-chat-message.component.css']
})
export class DoctorChatMessageComponent implements OnInit {
  @Input() message :Message;
  constructor() { }

  ngOnInit() {
  }

}
