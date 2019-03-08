import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatServiceService} from "../service/chat-service.service";
import {AngularFireList} from "@angular/fire/database";
import {ChatMessage} from "../models/chat-message.model";

@Component({
  selector: 'app-family-doctors',
  templateUrl: './family-doctors.component.html',
  styleUrls: ['./family-doctors.component.css']
})
export class FamilyDoctorsComponent implements OnInit, OnChanges {

  private message: string;

  private feed: any;

  constructor(private chat: ChatServiceService) {
  }

  ngOnInit() {
    // this.feed = this.chat.getMessages();

    this.feed = this.chat.getMessages();
    console.log(this.feed)
  }

  send() {
    this.chat.sendMessage(this.message)
  }

  ngOnChanges() {
    // this.feed = this.chat.getMessages();
  }







}
