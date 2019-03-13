import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.css']
})
export class DoctorChatComponent implements OnInit {
  private user_Full_Name;
  private DID;
  constructor(private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }
  }

}
