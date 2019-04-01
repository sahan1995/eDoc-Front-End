import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoctorRequestService} from "../service/doctor-request.service";
import {MatSnackBar} from "@angular/material";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-doctor-requests',
  templateUrl: './doctor-requests.component.html',
  styleUrls: ['./doctor-requests.component.css']
})
export class DoctorRequestsComponent implements OnInit {

  constructor(private route: Router, private docReqSer: DoctorRequestService, private snackBar: MatSnackBar,
              private db :AngularFirestore) {
  }

  private user_Full_Name;
  private DID;
  private docRequests;
  private patientName;
  private doctorName;
  private patientFullName;
  ngOnInit() {
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    } else {
      this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
      this.doctorName=localStorage.getItem("fname")
    }


    this.getDocRequests();

  }


  getDocRequests() {

    this.docReqSer.getDoctorRequests(this.DID).subscribe(result => {
      this.docRequests = result;
      if(this.docRequests.length==0){
        console.log("here")
      }
      this.docRequests.forEach(docReq => {

        this.patientFullName = docReq.patientDTO.fname + " " + docReq.patientDTO.mname + " " + docReq.patientDTO.lname;
        docReq["patientFullName"] = docReq.patientDTO.fname + " " + docReq.patientDTO.mname + " " + docReq.patientDTO.lname;
        docReq["patientAddress"] = docReq.patientDTO.code + ", " + docReq.patientDTO.lane + ", " + docReq.patientDTO.city + ", " + docReq.patientDTO.country
        docReq["patientFname"] = docReq.patientDTO.fname;
        this.docReqSer.getProPic(docReq.patientDTO.profilePic).subscribe(imgResult => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            docReq["patientPic"] = reader.result;
          }, false)
          if (result) {
            const img = imgResult as Blob
            reader.readAsDataURL(img)
          }
        })


      })


    })
  }

  acceptRequest(PID,patientFullName,patientFname) {
    console.log(PID)
    console.log(patientFullName)
    this.docRequests.forEach(req => {
      if (req.pid == PID) {
        this.docReqSer.addPatient(PID, this.DID).subscribe(result => {
          req.isAccept = true;
          this.docReqSer.updateIsAccept(PID,this.DID).subscribe();
          this.createChatRooms(patientFullName,patientFname);
          this.snackBar.open("Request Accepted", "Ok", {
            duration: 3000,
          });
        })

      }

    })
  }

  createChatRooms(patientFullName,patientFname){
    var patientChatRoom = patientFname+"chat";
    var doctorChatRomm = this.doctorName+"chat";

    this.db.collection(patientChatRoom).doc(patientFname+'&'+this.doctorName).set({
      id:patientFname+'&'+this.doctorName,
      name: 'Dr '+this.user_Full_Name
    })



    this.db.collection(doctorChatRomm).doc(this.doctorName+'&'+patientFname).set({
      id:this.doctorName+'&'+patientFname,
      name: 'Mr '+patientFullName
    })


  }
  hasPP(){
    this.docReqSer.hasPP(this.DID).subscribe(result=>{
      if(!result){
        this.route.navigate(["/Register-Private-Practice"])
      }else{
        this.route.navigate(["/My-Private-Practice"])
      }
    })
  }
}
