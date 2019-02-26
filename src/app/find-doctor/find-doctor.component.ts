import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from "@angular/material";
import {ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {FindDoctorService} from "../service/find-doctor.service";


export interface Symptom {
  name: string;
}
export interface Doctor {

  special : string;

}
@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})



export class FindDoctorComponent implements OnInit {

  private isAdult  = true;
  private selectedDoctor;
  private  fullName;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  symstoms: Symptom[] = [

  ];

  doctors: Doctor[] = [

  ];

  private doct = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.symstoms.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(symstom: Symptom): void {
    const index = this.symstoms.indexOf(symstom);

    if (index >= 0) {
      this.symstoms.splice(index, 1);
    }
  }


  constructor(private route :Router,private findDocService:FindDoctorService) { }

  ngOnInit() {

    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
  }





  findDoctor(){

   for(var x = 0;x<this.doctors.length;x++){
     this.doctors.splice(x);
   }

    for( var y = 0;y<this.doct.length;y++){
      this.doct.splice(y);
    }


    if(this.isAdult==true){

      var isNegurologist = false;
      var isGeneral = false;
      var isCardologist=false;
      this.symstoms.forEach(sysm=>{

        if(sysm.name=="Fever"||sysm.name=="Cough"||sysm.name=="Cold"||sysm.name=="Wheezing"||sysm.name=="Abdominal Pain"||sysm.name=="Dharrhoca"||sysm.name=="Vomiting"
          || sysm.name=="Dysurea"||sysm.name=="Fits"||sysm.name=="Rashes"||sysm.name=="Irregular Heart Rate"||sysm.name =="Blue Discolouration if Skin"||sysm.name=="Palpitations"
        ||sysm.name=="Server Headache"){
          isGeneral  = true;
          if(sysm.name=="Fits"||sysm.name=="Server Headache"){
            isNegurologist=true;
          }
          if(sysm.name=="Irregular Heart Rate"||sysm.name =="Blue Discolouration if Skin"||sysm.name=="Palpitations"){
            isCardologist = true;
          }


        }


      })

      if(isGeneral){

        if(isCardologist&&isNegurologist){
          this.doctors.push({special:"General Peadiatrition"})
          this.doctors.push({special:"Peadratric Neurologist"})
          this.doctors.push({special:"Peadratric Cardiologist"})
        }else if(isCardologist){
          this.doctors.push({special:"Peadratric Cardiologist"})
          this.doctors.push({special:"General Peadiatrition"})

        }else if(isNegurologist){
          this.doctors.push({special:"Peadratric Neurologist"})
          this.doctors.push({special:"General Peadiatrition"})

        }else{
          this.doctors.push({special:"General Peadiatrition"})
        }

      }

      this.doctors.forEach(doc=>{

        this.findDocService.getDoctorBySpecial(doc.special).subscribe(result=>{
          let doc = result;
        console.log(result[0]['profilePic'])
          // this.findDocService.getProPic("ssss")
          this.findDocService.getProPic(result[0]['profilePic']).subscribe(picture=>{
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              doc[0]["patientPic"] = reader.result;
              this.doct.push(doc)
              console.log(doc)
            }, false)
            if (result) {
              const img = picture as Blob
              reader.readAsDataURL(img)
            }

          })



        })

      })

    console.log(this.doct)

    }



  }

}

