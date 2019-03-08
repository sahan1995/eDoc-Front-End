import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterPpService {


  public url = "http://localhost:8080/api/v1/"
  constructor(private http:HttpClient) { }



  getDoctor(DID){
    return this.http.get(this.url+"doctors/"+DID)
  }


  registerPP(PPID,ppForm){
    return this.http.put(this.url+"privatepractices/"+PPID,ppForm)
  }


  getCount(){
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
    return this.http.get(this.url+"privatepractices/getLastID",httpOptions);
  }
}
