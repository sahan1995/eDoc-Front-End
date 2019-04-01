import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorRequestService {


  private url= "http://localhost:8080/api/v1/"
  constructor(private http:HttpClient) { }


  getDoctorRequests(DID){

    return this.http.get(this.url+"requestForDoctor/getDoctorRequests?DID="+DID);

  }


  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"patients/getPic?picName="+picName,httpOptions)
  }

  addPatient(PID,DID){

    return this.http.put(this.url+"patientFamDoc?PID="+PID+"&DID="+DID);
  }

  updateIsAccept(PID,DID){
    return this.http.post(this.url+"requestForDoctor/updateIsAccept?PID="+PID+ "&DID="+DID)
  }
  hasPP(DID){
    return this.http.get(this.url+"privatepractices/hasPP?DID="+DID)
  }


}
