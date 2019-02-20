import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  constructor(private http:HttpClient) { }

  private URL = "http://localhost:8080/api/v1/doctors"

  getLasID(){
    const httpOptions = {
      'responseType'  : 'text' as 'json'

    };
    return this.http.get(this.URL+"/getLastID",httpOptions)

  }
  uploadProFilePic(proPic:File){
    let file = new FormData();
    file.append("proImg",proPic);
    return this.http.put(this.URL+"/proImg",file);

  }
  register(DID,serializedForm){
    return this.http.put(this.URL+"/"+DID,serializedForm);
  }
  isUserNameExsists(userName){
    return this.http.get(this.URL+"/isExsists/"+userName);
  }
}
