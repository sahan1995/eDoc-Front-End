import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PatientHomeService} from "../service/patient-home.service";

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  constructor(private route:Router,private patientHomeService:PatientHomeService) { }

  private  fullName;
  private PID;
  public lat = 7.8731;
  public lng = 80.7718;
  public zoom =7;
  private todayApp:any;
  ngOnInit() {

    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
    this.PID = localStorage.getItem("id");
    this.todayAppointments();
  }


  signOut(){
    localStorage.clear();
    this.route.navigate(["/"])
  }



  todayAppointments(){

    this.patientHomeService.todayApp(this.PID).subscribe(result=>{
      console.log(result)
      this.todayApp=result;
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
