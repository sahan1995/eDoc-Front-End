import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PatientFamilyDoctorService} from "../service/patient-family-doctor.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-patient-family-doctors',
  templateUrl: './patient-family-doctors.component.html',
  styleUrls: ['./patient-family-doctors.component.css']
})
export class PatientFamilyDoctorsComponent implements OnInit {

  private  fullName;
  private PID;
  private familyDoctors;
  private patientFname;
  constructor(private route:Router,private patientFamDocService:PatientFamilyDoctorService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
    this.patientFname=localStorage.getItem("fname");
    this.PID = localStorage.getItem("id");

    this.getPatientFamilyDoctrs();
  }

  signOut(){
    localStorage.clear();
    this.route.navigate(["/SignIn"])
  }


  getPatientFamilyDoctrs(){
    this.patientFamDocService.getPatientFamilyDoctors(this.PID).subscribe(result=>{
      this.familyDoctors = result;
      this.familyDoctors.forEach(doc=>{

        this.patientFamDocService.getProPic(doc.doctorDTO.profilePic).subscribe(Docimg=>{
          let reader = new FileReader();
          reader.addEventListener("load", () => {

            doc["img"] = reader.result;
          }, false)
          if (result) {
            const img = Docimg as Blob
            reader.readAsDataURL(img)
          }
        })

      })


      console.log(this.familyDoctors)

    })
  }
  removeDoctor(DID){

    console.log(DID)
    this.patientFamDocService.removeDoctorFromRequest(this.PID,DID).subscribe(result=>{
      if(result){
        this.patientFamDocService.removeDoctor(this.PID,DID).subscribe(result=>{
          if(result){


            this.getPatientFamilyDoctrs();
            this.snackBar.open("Doctor Removed ", "Ok", {
              duration: 3000,
            });
          }
        })
      }
    })

  }
}
