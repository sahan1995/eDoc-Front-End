import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doctor-chatroom-title-bar',
  templateUrl: './doctor-chatroom-title-bar.component.html',
  styleUrls: ['./doctor-chatroom-title-bar.component.css']
})
export class DoctorChatroomTitleBarComponent implements OnInit {

  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

}
