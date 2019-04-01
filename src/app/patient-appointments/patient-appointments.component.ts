import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PatientAppointmentsService} from "../service/patient-appointments.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {


  curDate = new Date();
  dateFormat = require('dateformat');
  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(this.curDate, 'yyyy-MM-dd');
  time = this.dateFormat(this.curDate, "h:MM:ss TT");
  private user_Full_Name;
  private appType;
  private PID;
  private appointments;
  private appointDetails: any;
  private appType;
  private showMapTitle = "Show Direction";
  private mapFlag = false;
  public origin: any;
  public destination: any;

  public isFinishedAppointments = false;
  public isCurrentAppointments = true;

  public finishedAppointments :any;
  constructor(private route:Router,private patientAppService:PatientAppointmentsService) { }

  ngOnInit() {
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
      return;
    }
    this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.PID = localStorage.getItem("id");

    this.getPatientAppointments();

    this.finishedAppointments();
  }
  signOut(){
    localStorage.clear();
    this.route.navigate(["/"])
  }

  getPatientAppointments(){
    this.appType = "All  Appointment"
    this.patientAppService.getAppointments(this.PID).subscribe(result=>{
        this.loadResult(result)
    })
  }

  webConsultation() {
    this.appType = "Web Consultation";
    this.findByAppType(this.appType);
  }

  homeConsultation() {
    this.appType = "Home Consultation";
    this.findByAppType(this.appType);
  }

  ppConsultation() {
    this.appType = "Private Practice Consultation";
    this.findByAppType(this.appType);
  }

  findByAppType(appType){
    this.patientAppService.findByAppType(appType,this.PID).subscribe(result=>{
      this.loadResult(result);
    })
  }

  loadResult(result) {
    this.appointments = result;

    this.appointments.forEach(appoint => {
      // this.appointDetails["appCode"] = appoint.patientDTO.fname;
      // console.log(appoint.patientDTO.fname)
      // this.appointDetails = appoint;
      appoint["DID"] = appoint.doctorDTO.did
      appoint["doctorName"] = appoint.doctorDTO.fname + " " + appoint.doctorDTO.lname;
      appoint["lat"] = appoint.doctorDTO.lat;
      appoint["lng"] = appoint.doctorDTO.lng;
      appoint["time"] = this.tConvert(appoint.time);
      this.patientAppService.getProPic(appoint.doctorDTO.profilePic).subscribe(result => {

        let reader = new FileReader();
        reader.addEventListener("load", () => {
          appoint["doctorPic"] = reader.result;
        }, false)
        if (result) {
          const img = result as Blob
          reader.readAsDataURL(img)
        }
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



  getFinishedAppointmets(){
    this.isFinishedAppointments = true;
    this.isCurrentAppointments = false;

  }

  getCurrentAPoointments(){
    this.isFinishedAppointments = false;
    this.isCurrentAppointments = true;
  }



  finishedAppointments(){
    this.patientAppService.getFinishedAppointments(this.PID).subscribe(result=>{
      this.finishedAppointments = result;
      this.finishedAppointments.forEach(finishApp=>{

        finishApp["DID"] = finishApp.doctorDTO.did
        finishApp["doctorName"] = finishApp.doctorDTO.fname + " " + finishApp.doctorDTO.lname;
        finishApp["drugs"] = finishApp.prescriptionDTO.drugs;
        this.patientAppService.isFamDoc(this.PID,finishApp.doctorDTO.did).subscribe(result=>{
          finishApp["isFamDoc"] = result;
        })
        this.patientAppService.getProPic(finishApp.doctorDTO.profilePic).subscribe(result => {

          let reader = new FileReader();
          reader.addEventListener("load", () => {
            finishApp["doctorPic"] = reader.result;
          }, false)
          if (result) {
            const img = result as Blob
            reader.readAsDataURL(img)
          }
        })


      })

    })
  }

}
