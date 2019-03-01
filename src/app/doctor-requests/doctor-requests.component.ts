import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoctorRequestService} from "../service/doctor-request.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-doctor-requests',
  templateUrl: './doctor-requests.component.html',
  styleUrls: ['./doctor-requests.component.css']
})
export class DoctorRequestsComponent implements OnInit {

  constructor(private route: Router, private docReqSer: DoctorRequestService, private snackBar: MatSnackBar) {
  }

  private user_Full_Name;
  private DID;
  private docRequests;

  ngOnInit() {
    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    } else {
      this.user_Full_Name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
      this.DID = localStorage.getItem("id")
    }


    this.getDocRequests();

  }


  getDocRequests() {

    this.docReqSer.getDoctorRequests(this.DID).subscribe(result => {
      this.docRequests = result;

      this.docRequests.forEach(docReq => {
        docReq["patientFullName"] = docReq.patientDTO.fname + " " + docReq.patientDTO.mname + " " + docReq.patientDTO.lname;
        docReq["patientAddress"] = docReq.patientDTO.code + ", " + docReq.patientDTO.lane + ", " + docReq.patientDTO.city + ", " + docReq.patientDTO.country
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

  acceptRequest(PID) {
    console.log(PID)
    this.docRequests.forEach(req => {
      if (req.pid == PID) {
        this.docReqSer.addPatient(PID, this.DID).subscribe(result => {
          req.isAccept = true;

          this.docReqSer.updateIsAccept(PID,this.DID).subscribe();
          this.snackBar.open("Request Accepted", "Ok", {
            duration: 3000,
          });
        })

      }

    })
  }

}
