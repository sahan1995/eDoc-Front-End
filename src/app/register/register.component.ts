import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
    public  patient:boolean = false;
    public  doctor:boolean = false;
    public  pharmcay:boolean = false;
  ngOnInit() {
  }

  doctorClick(){
    this.doctor = true;
    this.patient = false;
    this.pharmcay = false
  }
  phamacyClick(){
    this.pharmcay = true;
    this.patient = false;
    this.doctor = false;
  }
  patientClick(){
    this.patient = true;
    this.doctor = false;
    this.pharmcay = false
  }
}
