import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  public url = "http://localhost:8080/";

  signIn(userForm){

    // const httpOptions = {
    //   'responseType'  : 'text' as 'json'
    //
    // };

    let userDetails = new FormData();
    userDetails.append("uname",userForm["uname"])
    userDetails.append("password",userForm["pass"])
    return this.http.post(this.url+"api/v1/signIn",userDetails);

  }
}
