import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientVideochatService {

  constructor(private http:HttpClient) { }


  private url= "http://localhost:8080/api/v1/"
  updateKey(PID,key){
    return this.http.post(this.url+"patients/updateVideoKey?PID="+PID+"&Key="+key);
  }

  getDoctorKey(DID){
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
    return this.http.get(this.url+"doctors/getVideoKey?DID="+DID,httpOptions)
  }



  getPrescription(appCode){

    return this.http.get(this.url+"prescription/getPres?appCode="+appCode)
  }
}
