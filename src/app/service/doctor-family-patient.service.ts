import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorFamilyPatientService {
  private url = "http://localhost:8080/api/v1/"
  constructor(private http:HttpClient) { }


  getFamilyPatients(DID){
    return this.http.get(this.url+"patientFamDoc/doctorsFamilyPatients?DID="+DID)
  }

  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"doctors/getPic?picName="+picName,httpOptions)
  }

  removePatientFromRequest(PID,DID){
    return this.http.delete((this.url+"requestForDoctor/removeDoctor?PID="+PID+"&DID="+DID))
  }


  removePatient(PID,DID){
    return this.http.delete(this.url+"patientFamDoc?PID="+PID+"&DID="+DID);
  }

  hasPP(DID){
    return this.http.get(this.url+"privatepractices/hasPP?DID="+DID)
  }

}
