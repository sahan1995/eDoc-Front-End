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



  findDoctor(param){
    return this.http.get(this.url+"api/v1/doctors/getDoctor?param="+param);
  }

  isFamDoc(PID,DID){

    return this.http.get(this.url+"api/v1/patientFamDoc/isFamDoc?PID="+PID+"&DID="+DID);
  }

  isSendRequest(PID,DID){
    return this.http.get(this.url+"api/v1/requestForDoctor/isPresent?PID="+PID+"&DID="+DID);
  }

  sendRequest(PID,DID){
    return this.http.put(this.url+"api/v1/requestForDoctor?PID="+PID+"&DID="+DID,null);
  }

  deleteRequest(PID,DID){
    return this.http.delete(this.url+"api/v1/requestForDoctor?PID="+PID+"&DID="+DID)
  }

  removeDoctorFromRequest(PID,DID){
    return this.http.delete((this.url+"api/v1/requestForDoctor/removeDoctor?PID="+PID+"&DID="+DID))
  }


  removeDoctor(PID,DID){

    return this.http.delete(this.url+"api/v1/patientFamDoc?PID="+PID+"&DID="+DID);

  }
}
