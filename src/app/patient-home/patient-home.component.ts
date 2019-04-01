import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  constructor(private route:Router) { }

  private  fullName;
  public lat = 7.8731;
  public lng = 80.7718;
  public zoom =7;
  ngOnInit() {

    if(localStorage.getItem("fname")==null){
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname")+" "+localStorage.getItem("lname");
  }


  signOut(){
    localStorage.clear();
    this.route.navigate(["/"])
  }

}
