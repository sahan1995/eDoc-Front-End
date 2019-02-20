import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,private router:Router,private docDetailSer:DoctorDetailService) {
  }

  ngOnInit() {
   this.DID =  this.route.snapshot.params.id;
   this.getDetails(this.DID);
    if (localStorage.getItem("fname") == null) {
      this.router.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
    this.PID = localStorage.getItem("id")
  }


  getDetails(DID){
    this.docDetailSer.doctorDetails(DID).subscribe(result=>{

      this.docFullName = result["fname"]+" "+result["mname"]+" "+result["lname"]
      this.docSpecial = result["specilizedIn"]
      this.docAddress = result["code"]+" "+result["lane"]+" "+result["city"]+" "+result["city"]
      this.docAbout = result["aboutMe"]
      this.docUni = result["university"]
      this.docPP = result["ppFee"]
      this.docWeb = result["webFee"]
      this.docHome = result["toHomeFee"]

    })
  }

  bookingDoc(bookinForm){
   let serial =  (bookinForm.value);
    this.date = serial["date"]
    this.time = serial["time"]

    this.docDetailSer.isBooked(this.DID,this.time,this.date).subscribe(result=>{

      if(result){
        alert("This date and time Doctor Busy")
        return;
      }else{
        this.docDetailSer.getLastID().subscribe(result=>{
            this.lastCode = result;
            if(result==""){
              this.appCode = "App1";

            }else{
              var arr =  this.lastCode.split("App");
              var num = parseInt(arr[1])+1;
              this.appCode = "App"+num;
            }



              serial["appCode"] = this.appCode;
              serial["appType"] =this.type;
              serial["check"] = false;
              serial["DID"] = this.DID;
              serial["PID"]=this.PID
              // serial["patientDTO"] = this.PID;
              // serial["doctorDTO"]=this.DID;

              // var appDetails={
              //   AppCode:this.appCode,
              //   AppType : this.type,
              //   date : this.date,
              //   isCheck : 0,
              //   time : this.time
              //   // DID: this.DID,
              //   // PID:this.PID
              // }

              console.log(serial)


              this.docDetailSer.saveAppointment(this.appCode,serial).subscribe(result=>{
                console.log(result);
              })
              // var jason={
              //   name:"name",
              //   lea: "2225"
              // }
              // console.log(jason)


        })

      }
    })

  }
typeChecked(type){
    this.type=type;
}

}
