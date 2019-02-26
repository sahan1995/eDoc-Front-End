import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoctorAppointmentsService} from "../service/doctor-appointments.service";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  @Input() appoint:Observable<any>;
  // mydate = new Date();
  constructor(private route: Router, private doctorAppSer: DoctorAppointmentsService) {

  }

  curDate = new Date();
  dateFormat = require('dateformat');
  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(this.curDate, 'yyyy-MM-dd');
  time = this.dateFormat(this.curDate, "h:MM:ss TT");


  private user_Full_Name;
  private DID;
  private appointments;
  private appointDetails: any;
  private appType;
  private showMapTitle = "Show Direction";
  private mapFlag = false;
  public origin: any;
  public destination: any;

  ngOnInit() {


    // this.mydate = this.datePipe.transform(this.mydate,"yyyy-MM-dd");
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
      return;
    }
    this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.DID = localStorage.getItem("id");
    this.appoint = Observable.interval(1000).startWith(0).switchMap(()=>this.doctorAppSer.getDoctorAppointments(this.DID))

    this.getDoctorAppointments(this.DID);

  }

  getDoctorAppointments(DID) {
    this.appType = "All  Appointment"
    this.doctorAppSer.getDoctorAppointments(DID).subscribe(result => {
      this.loadResult(result)
    })
  }


  findByAppType(appType, DID) {
    this.doctorAppSer.findByAppType(appType, DID).subscribe(result => {
      this.loadResult(result)
    })
  }


  webConsultation() {
    this.appType = "Web Consultation";
    this.findByAppType(this.appType, this.DID);
  }

  homeConsultation() {
    this.appType = "Home Consultation";
    this.findByAppType(this.appType, this.DID);
  }

  ppConsultation() {
    this.appType = "Private Practice Consultation";
    this.findByAppType(this.appType, this.DID);
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


  showMap(lat, lng) {

    this.getDirection(lat, lng)

    if (this.mapFlag) {
      this.mapFlag = false;
      this.showMapTitle = "Show Direction";
      return;
    }
    this.mapFlag = true;
    this.showMapTitle = "Hide Direction";
  }

  getDirection(lat, lng) {
    this.origin = {lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng"))};
    this.destination = {lat: lat, lng: lng};

    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }


  dateSelected(date) {
    var selectDate = date.value;
    if (this.appType == "All  Appointment") {
      this.doctorAppSer.findByDate(selectDate, this.DID).subscribe(result => {

        this.loadResult(result);

      })

    }else if(this.appType=="Web Consultation"){

      this.doctorAppSer.findByDateAndAppType(selectDate,this.DID,this.appType).subscribe(result=>{
        this.loadResult(result)
      })
    }else if(this.appType=="Home Consultation"){
      this.doctorAppSer.findByDateAndAppType(selectDate,this.DID,this.appType).subscribe(result=>{
        this.loadResult(result)
      })
    }else if(this.appType=="Private Practice Consultation"){
      this.doctorAppSer.findByDateAndAppType(selectDate,this.DID,this.appType).subscribe(result=>{
        this.loadResult(result)
      })
    }
  }


  loadResult(result) {
    this.appointments = result;

    this.appointments.forEach(appoint => {
      // this.appointDetails["appCode"] = appoint.patientDTO.fname;
      // console.log(appoint.patientDTO.fname)
      this.appointDetails = appoint;
      appoint["PID"] = appoint.patientDTO.pid;
      appoint["patientName"] = appoint.patientDTO.fname + " " + appoint.patientDTO.lname;
      appoint["lat"] = appoint.patientDTO.lat;
      appoint["lng"] = appoint.patientDTO.lng;
      appoint["time"] = this.tConvert(appoint.time);
      this.doctorAppSer.getProPic(appoint.patientDTO.profilePic).subscribe(result => {

        let reader = new FileReader();
        reader.addEventListener("load", () => {
          appoint["patientPic"] = reader.result;
        }, false)
        if (result) {
          const img = result as Blob
          reader.readAsDataURL(img)
        }
      })
    })
  }
}
