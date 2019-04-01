import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DoctorFamilyPatientService} from "../service/doctor-family-patient.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-doctors-family-patients',
  templateUrl: './doctors-family-patients.component.html',
  styleUrls: ['./doctors-family-patients.component.css']
})
export class DoctorsFamilyPatientsComponent implements OnInit {

  constructor(private route:Router,private docService:DoctorFamilyPatientService,private snackBar: MatSnackBar) { }
  private user_Full_Name;
  private DID;
  private patients;
  private doctorFname;
  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
      this.doctorFname=localStorage.getItem("fname")
    }

    this.getPatients();
  }



  getPatients(){
    this.docService.getFamilyPatients(this.DID).subscribe(result=>{
      this.patients=result;

      this.patients.forEach(pat=>{
        this.docService.getProPic(pat.patientDTO.profilePic).subscribe(Patimg=>{
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            pat["img"] = reader.result;
          }, false)
          if (result) {
            const img = Patimg as Blob
            reader.readAsDataURL(img)
          }
        })
      })
    })
  }

  removePatient(PID){
    this.docService.removePatientFromRequest(PID,this.DID).subscribe(result=>{
      if(result){
        this.docService.removePatient(PID,this.DID).subscribe(result=>{
          if(result){
            this.getPatients();
            this.snackBar.open("Doctor Removed ", "Ok", {
              duration: 3000,
            });
          }
        })
      }
    })
  }
  hasPP(){
    this.docService.hasPP(this.DID).subscribe(result=>{
      if(!result){
        this.route.navigate(["/Register-Private-Practice"])
      }else{
        this.route.navigate(["/My-Private-Practice"])
      }
    })
  }
}
