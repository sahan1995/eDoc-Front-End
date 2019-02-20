import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsultDoctorService {

  public url = "http://localhost:8080/"
  constructor(private http:HttpClient) { }


  getAllDoctor(){

   return this.http.get(this.url+"api/v1/doctors");
  }
  getProPic(picName){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url+"api/v1/doctors/getPic?picName="+picName,httpOptions)
  }
}
