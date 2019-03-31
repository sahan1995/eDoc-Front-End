import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyPrivatePracticeService {
  private url= "http://localhost:8080/api/v1/"
  constructor(private  http:HttpClient) { }

  getTodayAppCount(DID){
    return this.http.get(this.url+"appointments/getAppCount?DID="+DID);
  }

  getAppointment(appCode){
    return this.http.get(this.url+"appointments/"+appCode);
  }

  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"patients/getPic?picName="+picName,httpOptions)
  }

  addPrescription(presID,appCode,prescription){

    return this.http.put(this.url+"prescription/"+presID+"?appCode="+appCode,prescription)
  }

  getPrescriptionID(){

    return this.http.get(this.url+"prescription/getLastID");
  }
  addDrug(presID,drug){
    return this.http.put(this.url+"drugs?presID="+presID,drug);
  }

  finishAppointment(appCode){
    return this.http.post(this.url+"appointments/finishAppointment?appCode="+appCode);
  }

  justTest(){
    return this.http.get("http://192.168.1.104:8080/api/v1/doctors");
  }
  patientAppointments(PID){
    return this.http.get(this.url+"patients/finishedAppointmet?PID="+PID);
  }
}
