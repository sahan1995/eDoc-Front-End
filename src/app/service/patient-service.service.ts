import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(private http:HttpClient) { }

  getLastID(){
    //api meka hadanne response type eka text ekak kra ganna
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
   return this.http.get("http://localhost:8080/api/v1/patients/getLastID",httpOptions);
  }

  registerPatient(PID:String,File){
      // console.log(patient)
      return this.http.put("http://localhost:8080/api/v1/patients/"+PID,File);

  }
  uploadProFilePic(proPic:File){
    let file = new FormData();
    file.append("proPic",proPic);
    return this.http.put("http://localhost:8080/api/v1/patients/uploadPic",file);

  }
}
