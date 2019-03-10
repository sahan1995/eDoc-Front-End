import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInService} from "../service/sign-in.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private subscriptions:Subscription[]=[];
  constructor(private signService:SignInService,private route:Router,private authservice:AuthService) { }

  ngOnInit() {
  }

  signIn(userForm){

    console.log(userForm.value.uname)



    let userDetails = userForm.value;
    this.signService.signIn(userDetails).subscribe(result=>{
      if(result==""){
        console.log("User Name or Password Invalid")
      }else{
        console.log(result)
        localStorage.setItem("fname",result['fname'])
        localStorage.setItem("lname",result['lname'])
        localStorage.setItem("id",result['id'])
        localStorage.setItem("lat",result['lat'])
        localStorage.setItem("lng",result['lng'])
        
        let role = result["role"];

        this.fireBaseLogin(result["email"],userForm.value.pass,role);


      }
    })

  }


  fireBaseLogin(uname,password,role){
    this.authservice.logins(uname,password).subscribe(success=>{
      console.log(success)
      if(role=="patient"){
        this.route.navigate(['/Patient-Home'])
        console.log(role)
      }else if(role=="doctor"){
        console.log(role)
        this.route.navigate(['/Doctor-Home'])
      }
    })
  }

}
