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
    return this.http.get(this.url+"patients/getVideoKey?PID="+PID)
  }



  addMedialReport(report){
   return this.http.put(this.url+"medicalReports",report);
  }

  getMedicalReport(){
    return this.http.get(this.url+"medicalReports");
  }


}
