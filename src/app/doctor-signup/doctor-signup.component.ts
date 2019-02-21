import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DoctorServiceService} from "../service/doctor-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {



  constructor(private docServie:DoctorServiceService,private route:Router) { }
  public lat = 7.8731;
  public lng = 80.7718;
  public zoom =7;
  public userFile :any;
  public doctorID;
  public lastID;
  public proImgeName;
  public userName;
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
    this.uploadProfile();

    let serializedForm = userForm.value;
    this.docServie.getLasID().subscribe(result=>{
      if(result==""){
        this.doctorID = "Doc1";
        console.log(this.doctorID)
      }else{
        this.lastID =result;
        var num = parseInt(this.lastID)+1;
        this.doctorID = "Doc"+num;

      }

      serializedForm["DID"] = this.doctorID;
      serializedForm["lat"] = this.lat;
      serializedForm["lng"] = this.lng;
      serializedForm["profilePic"] = this.proImgeName;
      serializedForm["role"] = "doctor";
      serializedForm["aboutMe"] = "Joyce Lee, MD, MPH, is the Robert P. Kelch, MD Research Professor of Pediatrics at the University of Michigan Medical School and Professor at the Medical School and at the University of Michigan School of Public Health. Dr Lee attended Brown University for her undergraduate education and the University of Pennsylvania for her medical degree, where she was elected to the Alpha Omega Alpha Honors Society. She completed internship and residency in General Pediatrics at the Boston Combined Residency Program (Children's Hospital, Boston and Boston Medical Center). She completed dual training in Pediatric Endocrinology and Pediatric Health Services Research and received a Master in Public Health from the Department of Health Management and Policy at the University of Michigan."
      this.docServie.register(this.doctorID,serializedForm).subscribe(result=>{
        alert("Done");
        this.route.navigate(["/SignIn"])
      })
    })


  }

  @ViewChild("proPic")
  proPic:ElementRef;
  uploadProfile(){
    let file = this.proPic.nativeElement.files[0];
    this.proImgeName = file.name;
    this.docServie.uploadProFilePic(file).subscribe(data=>{
      console.log(data);
    });


  }
  passWordOnFocus(){
    if(this.userName!=""){


        this.docServie.isUserNameExsists(this.userName).subscribe(result=>{
          console.log(result);
        })

    }
  }

}
