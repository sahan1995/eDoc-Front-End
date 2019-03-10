import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {userError} from "@angular/compiler-cli/src/transformers/util";
import {PatientServiceService} from "../service/patient-service.service";
import {MatDialog,MatDialogConfig} from "@angular/material";
import {Router} from "@angular/router"
import {AuthService} from "../service/auth.service";
@Component({
  selector: 'app-patient-sign-up',
  templateUrl: './patient-sign-up.component.html',
  styleUrls: ['./patient-sign-up.component.css']
})
export class PatientSignUpComponent implements OnInit {


  constructor(private patientService:PatientServiceService,private dialog:MatDialog,
              private route:Router,private auth:AuthService
              ) {
  }

  public lat = 7.8731;
  public lng = 80.7718;
  public zoom =7;
  public userFile :any;
  public patientID;
  ngOnInit() {


  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
       this.lat =  position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 18;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  setMarker(event){

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  localUrl = "assets/profile.png";
  showPreviewImage(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.userFile = file;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;

      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  Register(userForm){
    this.fireBaseSignUP("sahan","rajakaruna","test@exam.com","abcd0000")
    // var lastID;
    // this.getProfilePic();
    // let serializedForm = (userForm.value);
    // this.patientService.getLastID().subscribe(result=>{
    //
    //   if(result==""){
    //     this.patientID="pat1";
    //     serializedForm["ID"]=this.patientID;
    //
    //   }else{
    //     lastID = result;
    //     var num = parseInt(lastID)+1;
    //     this.patientID="pat"+num;
    //     serializedForm["ID"]=this.patientID;
    //   }
    //
    //   let file = this.proPic.nativeElement.files[0];
    //
    //   // serializedForm["PID"]=this.patientID;
    //   serializedForm["lat"]=this.lat;
    //   serializedForm["lng"]=this.lng;
    //   serializedForm["profilePic"] = file.name;
    //   serializedForm["role"] = "patient";
    //
    //   console.log(serializedForm)


      // this.patientService.registerPatient(this.patientID,serializedForm).subscribe(data=>{
      //     alert("Successfully Register !")
      //     this.route.navigate(['/SignIn'])
      //
      // });
      // console.log(patient)
    // })
     // this.json=JSON.stringify(u)
  }



  @ViewChild("proPic")
  proPic:ElementRef;
  getProfilePic(){
    let file = this.proPic.nativeElement.files[0];
    this.patientService.uploadProFilePic(file).subscribe(data=>{

    });


  }

  onCreate(){
    this.dialog.open(PatientSignUpComponent,{
      width:'250px',
      data:{name:"sas"}
      }
    );
  }

  fireBaseSignUP(fname,lname,email,password){
    this.auth.signUp(fname, lname, email, uname, password).subscribe(result=>{
      console.log(result)
    })
  }




}
