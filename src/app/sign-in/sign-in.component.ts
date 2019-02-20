import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInService} from "../service/sign-in.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private signService:SignInService,private route:Router) { }

  ngOnInit() {
  }

  signIn(userForm){
    let userDetails = userForm.value;
    this.signService.signIn(userDetails).subscribe(result=>{
      if(result==""){
        console.log("User Name or Password Invalid")
      }else{
        localStorage.setItem("fname",result['fname'])
        localStorage.setItem("lname",result['lname'])
        localStorage.setItem("id",result['id'])

        let role = result["role"];

        if(role=="patient"){
          this.route.navigate(['/Patient-Home'])
          console.log(role)
        }else if(role=="doctor"){
          console.log(role)
          this.route.navigate(['/Doctor-Home'])
        }

      }
    })

  }

}
