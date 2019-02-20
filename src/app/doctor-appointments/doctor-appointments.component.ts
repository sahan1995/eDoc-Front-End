import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

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
