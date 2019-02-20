import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ConsultDoctorService} from "../service/consult-doctor.service";


@Component({
  selector: 'app-consult-doctor',
  templateUrl: './consult-doctor.component.html',
  styleUrls: ['./consult-doctor.component.css']
})
export class ConsultDoctorComponent implements OnInit {

  public doctors: any;
  public profilePic;
  public picArray = [];

  public picArr:Array<String>;
  constructor(private route: Router, private conDoc: ConsultDoctorService) {

  }

  private fullName;

  ngOnInit() {


    this.getAllDoctors();

    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
  }


  getAllDoctors() {
    this.conDoc.getAllDoctor().subscribe(result => {
      this.doctors = result;
      this.doctors.forEach(doc => {

        this.conDoc.getProPic(doc.profilePic).subscribe(result=>{

          let reader= new FileReader();
          reader.addEventListener("load",()=>{
            doc["img"]=reader.result;
          },false)
          if(result){
            const  img = result as Blob
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
      this.profilePic =   reader.result;

      return this.profilePic;


    }, false);

    if (image) {
      reader.readAsDataURL(image);
      return this.profilePic;
    }
    return this.profilePic;
  }


  profile(){
    return this.profilePic;
  }


}
