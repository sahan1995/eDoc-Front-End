import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientFamilyDoctorService {

  private url = "http://localhost:8080/api/v1/"
  constructor(private http:HttpClient) { }


  getPatientFamilyDoctors(PID){
    return this.http.get(this.url+"patientFamDoc/patientFamilyDoctors?PID="+PID)
  }

  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"doctors/getPic?picName="+picName,httpOptions)
  }

  removeDoctorFromRequest(PID,DID){
    return this.http.delete((this.url+"requestForDoctor/removeDoctor?PID="+PID+"&DID="+DID))
  }


  removeDoctor(PID,DID){

    return this.http.delete(this.url+"patientFamDoc?PID="+PID+"&DID="+DID);

  }
}
