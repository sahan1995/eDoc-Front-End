import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  constructor(private route:Router) { }

  private user_Full_Name;

  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");

    }

  }

}
