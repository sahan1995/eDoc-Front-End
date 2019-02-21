import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorDetailService} from "../service/doctor-detail.service";

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  private PID;
  private DID;
  private fullName;
  private docFullName;
  private docSpecial;
  private docAddress;
  private docPhone;
  private docAbout;
  private docUni;
  private docPP;
  private docWeb;
  private docHome;
  private docLat;
  private docLng
  private appCode;
  private type;
  private lastCode;
  private date;
  private time;
  private imgName;
  private proPic : any;
  constructor(private route: ActivatedRoute, private router: Router, private docDetailSer: DoctorDetailService) {
  }

  ngOnInit() {

    if (localStorage.getItem("fname") == null) {
      this.router.navigate(["/SignIn"])
    }
    this.DID = this.route.snapshot.params.id;
    this.getDetails(this.DID);

    this.fullName = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.PID = localStorage.getItem("id")
  }


  getDetails(DID) {
    this.docDetailSer.doctorDetails(DID).subscribe(result => {
      console.log(result)
      this.docFullName = result["fname"] + " " + result["mname"] + " " + result["lname"]
      this.docSpecial = result["specilizedIn"]
      this.docAddress = result["code"] + " " + result["lane"] + " " + result["city"] + " " + result["city"]
      this.docAbout = result["aboutMe"]
      this.docUni = result["university"]
      this.docPP = result["ppFee"]
      this.docWeb = result["webFee"]
      this.docHome = result["toHomeFee"]
      this.imgName = result["profilePic"];
      this.loadProfilePicture(this.imgName);

    })
  }

  bookingDoc(bookinForm) {
    let serial = (bookinForm.value);
    this.date = serial["date"]
    this.time = serial["time"]

    this.docDetailSer.isBooked(this.DID, this.time, this.date).subscribe(result => {

      if (result) {
        alert("This date and time Doctor Busy")
        return;
      } else {
        this.docDetailSer.getLastID().subscribe(result => {
          this.lastCode = result;
          if (result == "") {
            this.appCode = "App1";

          } else {
            var num =  parseInt(this.lastCode)+1;
            this.appCode = "App" + num;
          }
          serial["appCode"] = this.appCode;
          serial["appType"] = this.type;
          serial["check"] = false;
          serial["DID"] = this.DID;
          serial["PID"] = this.PID;

          this.docDetailSer.saveAppointment(this.appCode, serial).subscribe(result => {
            console.log(result);
          })


        })

      }
    })

  }

  typeChecked(type) {
    this.type = type;
  }

  loadProfilePicture(imgName){

    console.log(imgName)
    this.docDetailSer.getProfilePic(imgName).subscribe(result=>{
      this.generateProfilePic(result)
    })
  }

  generateProfilePic(file){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.proPic = reader.result;
      // console.log(this.localUrl)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

}
