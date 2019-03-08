import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterPpService} from "../service/register-pp.service";

@Component({
  selector: 'app-register-private-practice',
  templateUrl: './register-private-practice.component.html',
  styleUrls: ['./register-private-practice.component.css']
})
export class RegisterPrivatePracticeComponent implements OnInit {

  constructor(private route:Router,private regPP:RegisterPpService) { }
  private user_Full_Name;
  private DID;
  public lat = 7.8731;
  public lng = 80.7718;
  public zoom =7;
  private ppForm;
  private PPID;
  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }

  }
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat =  position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 18;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  setMarker(event){

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }


  registerPP(ppForm){

    this.ppForm = ppForm.value;
    this.regPP.getDoctor(this.DID).subscribe(docResult=>{

      this.regPP.getCount().subscribe(result=>{

        if(result=='0'){
          this.PPID = 'PPID1'
        }else{
          var count = result;
          var num = parseInt(count)+1;
          this.PPID="PPID"+num;

        }
        this.ppForm["PPID"]=this.PPID;
        console.log(this.PPID)
        this.ppForm = ppForm.value;
        this.ppForm["lat"] = this.lat;
        this.ppForm["lng"] = this.lng
        this.ppForm["doctorDTO"] = docResult;
        this.regPP.registerPP(this.PPID,this.ppForm).subscribe(result=>{

        this.route.navigate(["/My-Private-Practice"])


        })
      })




    })



  }


}
