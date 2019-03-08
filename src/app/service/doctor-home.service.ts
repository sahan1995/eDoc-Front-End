import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorHomeService {

  public url = "http://localhost:8080/api/v1/"

  constructor(private  http: HttpClient) { }




  hasPP(DID){
    return this.http.get(this.url+"privatepractices/hasPP?DID="+DID)
  }




}
