import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ConsultDoctorService} from "../service/consult-doctor.service";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-consult-doctor',
  templateUrl: './consult-doctor.component.html',
  styleUrls: ['./consult-doctor.component.css']
})
export class ConsultDoctorComponent implements OnInit {

  public doctors: any;
  public profilePic;
  public picArray = [];

  public picArr: Array<String>;

  constructor(private route: Router, private conDoc: ConsultDoctorService, private snackBar: MatSnackBar) {

  }

  private fullName;
  private PID;
  private sendRequest = false;
  private isReqeust;
  ngOnInit() {


    this.getAllDoctors();

    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.PID = localStorage.getItem("id");
  }


  getAllDoctors() {
    this.conDoc.getAllDoctor().subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {

        this.conDoc.isFamDoc(this.PID,doc["did"]).subscribe(isPresent=>{
            this.conDoc.isSendRequest(this.PID,doc["did"]).subscribe(isSendRequest=>{

              if(isPresent==false&&isSendRequest==false){
                doc["sendRequest"] = true;
              }else if(isSendRequest&&isPresent){
                doc["sendRequest"] = false;
                doc["remove"] = true;
              }else if(isSendRequest){
                doc["cancleRequest"] = true;
              }
            })
        })
        this.conDoc.getProPic(doc.profilePic).subscribe(resultImg => {

          let reader = new FileReader();
          reader.addEventListener("load", () => {
            doc["img"] = reader.result;

          }, false)
          if (resultImg) {
            const img = resultImg as Blob
            reader.readAsDataURL(img)
          }

        })


      })


      // this.getProPic(result.profilePic)
    })

  }

  getProPic(picName) {
    this.conDoc.getProPic(picName).subscribe(result => {
      this.createImageFromBlob(result)

    })
  }

  createImageFromBlob(image) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // console.log(reader.result)
      this.profilePic = reader.result;

      return this.profilePic;


    }, false);

    if (image) {
      reader.readAsDataURL(image);
      return this.profilePic;
    }
    return this.profilePic;
  }


  profile() {
    return this.profilePic;
  }

  findDoctor(parm) {

    this.conDoc.findDoctor(parm).subscribe(result=>{
      this.doctors = result;
      this.doctors.forEach(doc => {
        this.conDoc.isFamDoc(this.PID,doc["did"]).subscribe(isPresent=>{
          this.conDoc.isSendRequest(this.PID,doc["did"]).subscribe(isSendRequest=>{

            if(isPresent==false&&isSendRequest==false){
              doc["sendRequest"] = true;
            }else if(isSendRequest&&isPresent){
              doc["sendRequest"] = false;
              doc["remove"] = true;
            }else if(isSendRequest){
              doc["cancleRequest"] = true;
            }
          })

        })
        this.conDoc.getProPic(doc.profilePic).subscribe(result => {

          let reader = new FileReader();
          reader.addEventListener("load", () => {
            doc["img"] = reader.result;
          }, false)
          if (result) {
            const img = result as Blob
            reader.readAsDataURL(img)
          }

        })


      })
    })

  }

  send(DID){

    console.log(DID)
    this.conDoc.sendRequest(this.PID,DID).subscribe(result=>{

      if(result){

        this.doctors.forEach(doc=>{
          if(doc["did"]==DID){
            doc["sendRequest"]=false;
            doc["cancleRequest"] = true;
          }
        })

        this.snackBar.open("Request Sent to the Doctor     ", "Ok", {
          duration: 3000,
        });
      }


    })

  }
  deleteReq(DID){
    this.conDoc.deleteRequest(this.PID,DID).subscribe(result=>{

      if(result){

        this.doctors.forEach(doc=>{
          if(doc["did"]==DID){
            doc["sendRequest"]=true;
            doc["cancleRequest"] = false;
          }
        })

        this.snackBar.open("Request Deleted ", "Ok", {
          duration: 3000,
        });
      }


    })
  }
  removeDoctor(DID){

    console.log(DID)
    this.conDoc.removeDoctorFromRequest(this.PID,DID).subscribe(result=>{
      if(result){
        this.conDoc.removeDoctor(this.PID,DID).subscribe(result=>{
          if(result){

            console.log(DID)
            this.doctors.forEach(doc=>{

              if(doc["did"]==DID){
                console.log("HERE")
                doc["sendRequest"]=true;
                doc["cancleRequest"] = false;
                doc["remove"] = false;
              }
            })
            this.snackBar.open("Doctor Removed ", "Ok", {
              duration: 3000,
            });
          }
        })
      }
    })

  }

}
