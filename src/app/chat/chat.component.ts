import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  private  fullName;



  constructor(private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
  }

}
