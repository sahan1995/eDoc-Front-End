import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MyPrivatePracticeService} from "../service/my-private-practice.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-my-private-practice',
  templateUrl: './my-private-practice.component.html',
  styleUrls: ['./my-private-practice.component.css']
})
export class MyPrivatePracticeComponent implements OnInit {

  constructor(private route: Router, private myppService: MyPrivatePracticeService, private snackBar: MatSnackBar) {
  }

  private user_Full_Name;
  private DID;
  private todayAppCount;
  public appCode = "";
  private appointment: any;
  private isSearch = false;

  private morning = false;
  private afternoon = false;
  private evening = false;
  private night = false;
  private qty = "";
  private days = "";
  private drug = "";
  private prescAdded = false;
  private lastID;
  private pressID;
  private prescription: any;
  private meal;
  curDate = new Date();
  dateFormat = require('dateformat');
  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(this.curDate, 'yyyy-MM-dd');
  time = this.dateFormat(this.curDate, "h:MM:ss TT")

  public finishedAppointments: any;

  ngOnInit() {
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    } else {
      this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }

    this.getTodayAppCount();
  }


  getTodayAppCount() {
    this.myppService.getTodayAppCount(this.DID).subscribe(result => {
      this.todayAppCount = result;
    })
  }


  getAppointment() {

    this.myppService.getAppointment(this.appCode).subscribe(result => {
      this.appointment = result;
      this.myppService.getProPic(this.appointment.patientDTO.profilePic).subscribe(imgRes => {

        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.appointment["patientPic"] = reader.result;
          this.appointment["fullname"] = this.appointment.patientDTO.fname + " " + this.appointment.patientDTO.lname
          this.myppService.patientAppointments(this.appointment.patientDTO.id).subscribe(appnts => {
            console.log(appnts);

            this.finishedAppointments = appnts;
            this.finishedAppointments.forEach(fapp=>{
              this.myppService.getProPic(fapp.doctorDTO.profilePic).subscribe(docImg=>{
                let reader2 = new FileReader();
                reader2.addEventListener("load", () => {
                  fapp["doctorPic"] = reader2.result;
                }, false)
                if (result) {
                  const img2 = docImg as Blob
                  reader2.readAsDataURL(img2)
                }
              })
            })

          })
          this.isSearch = true;
          // console.log(this.appointment)
        }, false)
        if (imgRes) {
          const img = imgRes as Blob
          reader.readAsDataURL(img)
        }

      })

      // console.log(result)
    })
    // console.log(this.appCode)
  }

  submitPrescription(drugForm) {

    let drug = drugForm.value;
    // var nums;

    this.myppService.getPrescriptionID().subscribe(result => {
      if (this.prescAdded == false) {
        this.lastID = result;
        var num = parseInt(this.lastID) + 1;
        // nums = 222;
        this.pressID = "Pres" + num;
        this.prescription = {
          prescriptionID: this.pressID,
          date: this.myFormattedDate
        }
        this.addPrespription(this.pressID, this.prescription)
      }


      console.log(this.prescription)
      drug["meal"] = this.meal;
      drug["prescriptionDTO"] = this.prescription
      this.myppService.addDrug(this.pressID, drug).subscribe(result => {
        if (result) {
          this.morning = false;
          this.afternoon = false;
          this.night = false;
          this.evening = false;
          this.drug = "";
          this.qty = "";
          this.days = ""
          this.snackBar.open("Drug Added", "", {
            duration: 5000,
          });
        }
      });

    })
  }


  selectMeal(meal) {
    this.meal = meal;
  }

  addPrespription(presID, prescription) {

    this.myppService.addPrescription(presID, this.appCode, prescription).subscribe(result => {
      if (result == true) {
        this.prescAdded = true;
      }
    })
  }

  finishAppointment() {
    this.myppService.finishAppointment(this.appCode).subscribe(result => {
      if (result) {
        this.isSearch = false;


      }
    })
  }

  test() {
    console.log("test")
    this.myppService.justTest().subscribe(res => {
      console.log(res);
    })
  }
}
