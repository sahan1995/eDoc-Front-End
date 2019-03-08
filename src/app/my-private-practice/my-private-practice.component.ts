import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-private-practice',
  templateUrl: './my-private-practice.component.html',
  styleUrls: ['./my-private-practice.component.css']
})
export class MyPrivatePracticeComponent implements OnInit {

  constructor(private route:Router) { }

  private user_Full_Name;
  private DID;

  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }
  }




}
