import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DoctorAppointmentsService} from "../service/doctor-appointments.service";

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(private route:Router,private doctorAppSer:DoctorAppointmentsService) { }
  private user_Full_Name;
  private DID;
  private appointments;
  private appointDetails :any;
  private appType = "Type of Appointment"
  ngOnInit() {

    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
      return;
    }
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id");

      this.getDoctorAppointments(this.DID);

  }

  getDoctorAppointments(DID){

    this.doctorAppSer.getDoctorAppointments(DID).subscribe(result=>{
      this.appointments = result;

      this.appointments.forEach(appoint=>{
        // this.appointDetails["appCode"] = appoint.patientDTO.fname;
        // console.log(appoint.patientDTO.fname)
        this.appointDetails = appoint;
        appoint["patientName"] = appoint.patientDTO.fname+" "+appoint.patientDTO.lname;
        appoint["time"]=this.tConvert(appoint.time);
        this.doctorAppSer.getProPic(appoint.patientDTO.profilePic).subscribe(result=>{

          let reader= new FileReader();
          reader.addEventListener("load",()=>{
            appoint["patientPic"]=reader.result;
          },false)
          if(result){
            const  img = result as Blob
            reader.readAsDataURL(img)
          }

        })

      })


    })

  }

   tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM ' : ' PM' ; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

}
