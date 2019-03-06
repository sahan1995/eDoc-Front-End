import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorChatService {

  constructor(private http :HttpClient) { }

  private url= "http://localhost:8080/api/v1/"
  updateKey(DID,key){

    console.log(DID)
    console.log(key)
   return this.http.post(this.url+"doctors/updateVideoKey?DID="+DID+"&Key="+key);
  }

  getPatientKey(PID){
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
    return this.http.get(this.url+"patients/getVideoKey?PID="+PID,httpOptions)
  }


  addDrug(presID,drug){
    return this.http.put(this.url+"drugs?presID="+presID,drug);
  }

  addMedialReport(appCode,report){


    return this.http.put(this.url+"medicalReports/"+appCode,report);
  }

  getMedicalReport(){
    return this.http.get(this.url+"medicalReports");
  }

  getAppointment(appCode){

    return this.http.get(this.url+"appointments/"+appCode);
  }


  addPrescription(presID,appCode,prescription){

    return this.http.put(this.url+"prescription/"+presID+"?appCode="+appCode,prescription)
  }

  getPrescriptionLastId(){

    return this.http.get(this.url+"prescription/getLastID");
  }

  finishAppointment(appCode){
    return this.http.post(this.url+"appointments/finishAppointment?appCode="+appCode);
  }



  getDoctorDetails(DID){
    return this.http.get(this.url+"doctors/"+DID);
  }

}
