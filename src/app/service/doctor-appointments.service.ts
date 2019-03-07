import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentsService {

  constructor(private http:HttpClient) { }


  private url= "http://localhost:8080/api/v1/"
  getDoctorAppointments(DID){

    return this.http.get(this.url+"doctors/getDoctorAppointments?DID="+DID);

  }

  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"patients/getPic?picName="+picName,httpOptions)
  }
  findByAppType(appType,DID){


    return this.http.get(this.url+"appointments/findByType?appType="+appType+"&DID="+DID)
  }


  findByDate(date,DID){

    return this.http.get(this.url+"appointments/findByDate?date="+date+"&DID="+DID);
  }

  findByDateAndAppType(date, DID, appType){

    return this.http.get(this.url+"appointments/findByDateAndType?date="+date+"&DID="+DID+"&appType="+appType);
  }

  getFinishedApointments(DID){
    return this.http.get(this.url+"doctors/finishedAppointments?DID="+DID);
  }

  isFamPatient(PID,DID){
    return this.http.get(this.url+"patientFamDoc/isFamDoc?PID="+PID+"&DID="+DID);
  }
}
