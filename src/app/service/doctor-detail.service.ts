import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailService {

  constructor(private http:HttpClient) { }

  private url = "http://localhost:8080/api/v1/";
  doctorDetails(DID){

  return this.http.get(this.url+"doctors/"+DID)

  }

  isBooked(DID,time,date){
    return this.http.get(this.url+"appointments/isBooked?DID="+DID+"&date="+date+"&time="+time)

  }

  getLastID(){
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
    return this.http.get(this.url+"appointments/lastID",httpOptions)
  }

  saveAppointment(appCode, appDetails){

    let file = new FormData();
    file.append("test",appDetails)

    return this.http.put(this.url+"appointments/"+appCode,appDetails);
  }
}
