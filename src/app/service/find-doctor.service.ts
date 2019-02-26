import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FindDoctorService {

  public url = "http://localhost:8080/api/v1/"
  constructor(private http :HttpClient) { }


  getDoctorBySpecial(special){

    let s = special;

  return this.http.get(this.url+"doctors/getDoctorbySpecial?special="+special);

  }


  getProPic(PicName){
      const httpOptions = {
        'responseType'  : 'blob' as 'json'
        //'responseType'  : 'blob' as 'json'        //This also worked
      };
      return this.http.get(this.url+"patients/getPic?picName="+PicName,httpOptions)
    }


  // getProPic(picName){
  //   const httpOptions = {
  //     'responseType'  : 'blob' as 'json'
  //     //'responseType'  : 'blob' as 'json'        //This also worked
  //   };
  //   return this.http.get(this.url+"patients/getPic?picName="+picName,httpOptions)
  // }
}
