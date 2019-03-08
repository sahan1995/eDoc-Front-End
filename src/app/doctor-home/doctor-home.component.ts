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
  ngOnInit() {
    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }else{
      this.user_Full_Name = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }

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












}
