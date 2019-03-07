import { Component, OnInit } from '@angular/core';
import {ChatServiceService} from "../service/chat-service.service";

@Component({
  selector: 'app-family-doctors',
  templateUrl: './family-doctors.component.html',
  styleUrls: ['./family-doctors.component.css']
})
export class FamilyDoctorsComponent implements OnInit {

  private message:string;
  constructor(private chat:ChatServiceService) { }

  ngOnInit() {
  }


  send(){
    this.chat.sendMessage(this.message)
  }


}
