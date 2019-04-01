import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientHomeService {

  private url = "http://localhost:8080/api/v1/";
  constructor(private http:HttpClient) { }

  todayApp(PID){
    return this.http.get(this.url+"appointments/todayAppointment?PID="+PID);
  }

}
