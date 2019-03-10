import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  public newMessageText:string='';


  constructor() { }

  ngOnInit() {
  }

  submit(message){

    console.log("New Message : ",message)

    this.newMessageText ='';
  }
}
