import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentsService {

  constructor(private http: HttpClient) {
  }

  private url = "http://localhost:8080/api/v1/"


  getAppointments(PID) {

    return this.http.get(this.url + "patients/patientAppointments?PID=" + PID)
  }

  getProPic(picName) {
    const httpOptions = {
      'responseType': 'blob' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get(this.url + "doctors/getPic?picName=" + picName, httpOptions)
  }

  findByAppType(appType, PID) {


    return this.http.get(this.url + "patients/getAppointmentByType?PID=" + PID + "&appType=" + appType)
  }


  getFinishedAppointments(PID){
    return this.http.get(this.url+"patients/finishedAppointmet?PID="+PID);
  }

  isFamDoc(PID,DID){
    return this.http.get(this.url+"patientFamDoc/isFamDoc?PID="+PID+"&DID="+DID);
  }


}
