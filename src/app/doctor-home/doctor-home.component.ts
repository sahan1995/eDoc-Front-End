import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {DoctorHomeService} from "../service/doctor-home.service";

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  constructor(private route:Router,private docHomeS:DoctorHomeService) { }

  private user_Full_Name;
  private DID;
  private todayApp:any;
  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }

    this.todayAppointments();
  }



  hasPP(){
    this.docHomeS.hasPP(this.DID).subscribe(result=>{
      if(!result){
        this.route.navigate(["/Register-Private-Practice"])
      }else{
        this.route.navigate(["/My-Private-Practice"])
      }
    })
  }

  todayAppointments(){
    this.docHomeS.todayApp(this.DID).subscribe(result=>{
      console.log(result);
      this.todayApp = result;
      this.todayApp.forEach(app=>{
        app["time"]=this.tConvert(app.time);
      })
    })
  }




  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM ' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }




}
