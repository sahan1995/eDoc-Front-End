import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chatroom-title-bar',
  templateUrl: './chatroom-title-bar.component.html',
  styleUrls: ['./chatroom-title-bar.component.css']
})
export class ChatroomTitleBarComponent implements OnInit {

  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

}
