import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatSnackBar} from "@angular/material";
import {ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {FindDoctorService} from "../service/find-doctor.service";


export interface Symptom {
  name: string;
}

export interface Doctor {

  special: string;

}

@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})


export class FindDoctorComponent implements OnInit {

  private isChild = false;
  private selectedDoctor;
  private fullName;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  symstoms: Symptom[] = [
    {
      name: "Fever",
      name: "Fits"
    }
  ];

  doctors: Doctor[] = [];

  private doctorsForSepect: Doctor[] = [];
  private doct = [];


  private hasChronicCought = false;
  private hasChronicWhezzing = false;
  private hasHeamoptysrc = false;
  private hasSeverAbdominalPain = false;
  private hasFever = false;
  private isPregnentCase = false;
  private toothR = false;
  private regexp = new RegExp('\\b(\\w*Pregnent\\w*)\\b');
  private toothRegex = new RegExp('\\b(\\w*Tooth\\w*)\\b');

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if (value == "Cough") {
        this.ChronicCought();
      }
      if (value == "Wheezing") {
        this.ChronicWheezing();
      }
      if (value == "Abdominal Pain") {
        this.ServerAbdominal();
      }
      if (this.regexp.test(value)) {

        this.isPregnentCase = true
      }
      if (value == "Fever") {
        this.hasFever = true;
      }

      if (this.toothRegex.test(value)) {
        this.toothR = true;
      }
      this.symstoms.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(symstom: Symptom): void {
    const index = this.symstoms.indexOf(symstom);

    if (index >= 0) {
      this.symstoms.splice(index, 1);
    }
  }


  constructor(private route: Router, private findDocService: FindDoctorService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    if (localStorage.getItem("fname") == null) {
      this.route.navigate(["/SignIn"])
    }

    this.fullName = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
  }


  findDoctor() {

    for (var x = 0; x < this.doctors.length; x++) {
      this.doctors.splice(x);
    }

    for (var y = 0; y < this.doct.length; y++) {
      this.doct.splice(y);
    }


    if (this.isChild == true) {

      var isNegurologist = false;
      var isGeneral = false;
      var isCardologist = false;
      this.symstoms.forEach(sysm => {

        if (sysm.name == "Fever" || sysm.name == "Cough" || sysm.name == "Cold" || sysm.name == "Wheezing" || sysm.name == "Abdominal Pain" || sysm.name == "Dharrhoca" || sysm.name == "Vomiting"
          || sysm.name == "Dysurea" || sysm.name == "Fits" || sysm.name == "Rashes" || sysm.name == "Irregular Heart Rate" || sysm.name == "Blue Discolouration if Skin" || sysm.name == "Palpitations"
          || sysm.name == "Server Headache" || sysm.name == "Chest Pain") {
          isGeneral = true;
          if (sysm.name == "Fits" || sysm.name == "Server Headache") {
            isNegurologist = true;
          }
          if (sysm.name == "Irregular Heart Rate" || sysm.name == "Blue Discolouration if Skin" || sysm.name == "Palpitations") {
            isCardologist = true;
          }


        }


      })

      if (isGeneral) {

        if (isCardologist && isNegurologist) {
          this.doctors.push({special: "General Peadiatrition"})
          this.doctors.push({special: "Peadratric Neurologist"})
          this.doctors.push({special: "Peadratric Cardiologist"})
        } else if (isCardologist) {
          this.doctors.push({special: "Peadratric Cardiologist"})
          this.doctors.push({special: "General Peadiatrition"})

        } else if (isNegurologist) {
          this.doctors.push({special: "Peadratric Neurologist"})
          this.doctors.push({special: "General Peadiatrition"})

        } else {
          this.doctors.push({special: "General Peadiatrition"})
        }

      }
      this.doctorsForSepect = this.doctors;
      this.getDoctors();

      console.log(this.doct)

    } else {
      var isGeneralPhysician = false;
      var isConsultantCheshPhysician = false;
      var isACardiologist = false;
      var isGeneralSurgeon = false;
      var isENTSurgeon = false;
      var isEyeSurgeon = false;
      var isVOOG = false;
      var isDentis = false;
      this.symstoms.forEach(sysm => {

        if (sysm.name == "Fever" || sysm.name == "Cough" || sysm.name == "Whezzing" || sysm.name == "Chest Pain" || sysm.name == "Shortness of Breath" || sysm.name == "Dysuria" || sysm.name == "Faint" || sysm.name == "Head Ache"
          || sysm.name == "Vertigo" || sysm.name == "Polyurea" || sysm.name == "Excessive Sweating" || sysm.name == "Sleepiness" || sysm.name == "Palpitation" || sysm.name == "Abdominal Pain" || sysm.name == "Vomiting" || sysm.name == "Fits"
          || sysm.name == "Cold") {
          isGeneralPhysician = true;
          if (this.hasChronicCought || this.hasChronicWhezzing || this.hasHeamoptysrc) {
            isConsultantCheshPhysician = true;
          }
          if (sysm.name == "Chest Pain" || sysm.name == "Palpitation") {
            isACardiologist = true;
          }
        }
        if (sysm.name == "Lumps" || sysm.name == "Hernia" || sysm.name == "Per Rectal Bleeding" || this.hasSeverAbdominalPain || sysm.name == "Wounds" || sysm.name == "Ear Pain" || sysm.name == "Throat Pain" || sysm.name == "Goiter"
          || sysm.name == "Nose Pain") {
          isGeneralSurgeon = true;

          if (sysm.name == "Ear Pain" || sysm.name == "Throat Pain" || sysm.name == "Goiter" || sysm.name == "Nose Pain") {
            isENTSurgeon = true;
          }
        }
        if (sysm.name == "Poor Vision" || sysm.name == "Colour Blindness") {
          isEyeSurgeon = true;
        }
        if (sysm.name == "Sub Fertility" || sysm.name == "Irregular Menstruation" || this.isPregnentCase) {
          isVOOG = true;
        }
        if (sysm.name == "Tooth Ache") {
          isDentis = true;
        }

      })

      //
      // console.log(this.hasChronicCought)
      // console.log(this.hasChronicWhezzing)
      // console.log(this.hasHeamoptysrc)


      if (isGeneralPhysician) {
        if (isConsultantCheshPhysician && isACardiologist && isGeneralSurgeon && isENTSurgeon && isEyeSurgeon && isVOOG) {
          this.doctors.push({special: "General Physician"})
          this.doctors.push({special: "Consult Chest Physician"})
          this.doctors.push({special: "Cardiologist"})
          this.doctors.push({special: "General Surgeon"})
          this.doctors.push({special: "ENT Surgeon"})
          this.doctors.push({special: "Eye Surgeon"})
          this.doctors.push({special: "Consultant Obstetrician and Gynaecologist"})
        } else if (isConsultantCheshPhysician && isACardiologist) {
          this.doctors.push({special: "Cardiologist"})
          this.doctors.push({special: "Consult Chest Physician"})
          this.doctors.push({special: "General Physician"})
        } else if (isConsultantCheshPhysician) {
          this.doctors.push({special: "Consult Chest Physician"})
          this.doctors.push({special: "General Physician"})
        } else if (isACardiologist) {
          this.doctors.push({special: "Cardiologist"})
          this.doctors.push({special: "General Physician"})
        } else if (isDentis || this.toothR) {
          this.doctors.push({special: "General Physician"})
          this.doctors.push({special: "Dental Surgeon"})
          if (this.hasFever) {
            this.hints("Your Fever cause by Tooth Pain");
          }

        } else if (isEyeSurgeon) {
          this.doctors.push({special: "Eye Surgeon"})
          this.doctors.push({special: "General Physician"})
        }
        else {
          this.doctors.push({special: "General Physician"})
        }
      } else if (isGeneralSurgeon) {

        if (isENTSurgeon) {

          this.doctors.push({special: "ENT Surgeon"})
          this.doctors.push({special: "General Surgeon"})
        }

      } else if (isEyeSurgeon) {
        this.doctors.push({special: "Eye Surgeon"});
      } else if (isVOOG) {
        this.doctors.push({special: "Consultant Obstetrician and Gynaecologist"})
      } else if (isDentis || this.toothR) {
        this.doctors.push({special: "Dental Surgeon"})
      }
      this.doctorsForSepect = this.doctors;
      this.getDoctors();


      // console.log("General "+isGeneralSurgeon)
      // console.log("Chest "+isConsultantCheshPhysician)

      this.clear();


    }


  }

  ChronicCought() {
    let snack = this.snackBar.open("Do you have Cought More than 3 Weeks?     ", "Yes", {
      duration: 3000,
    });
    snack.onAction().subscribe(() => {
      this.hasChronicCought = true;
      this.Heamoptysrc()
    })
    snack.afterDismissed().subscribe(() => {
      this.Heamoptysrc();
    })
  }

  ChronicWheezing() {
    let snack = this.snackBar.open("Do you have Wheezing More than 3 Weeks?     ", "Yes", {
      duration: 3000,
    });
    snack.onAction().subscribe(() => {
      this.hasChronicWhezzing = true;
    })
  }

  Heamoptysrc() {
    let snack = this.snackBar.open("Bleed with Cought ?     ", "Yes", {
      duration: 3000,
    });
    snack.onAction().subscribe(() => {
      this.hasHeamoptysrc = true;
    })
  }

  ServerAbdominal() {
    let snack = this.snackBar.open("Do you have Sever Abdominal Pain ?     ", "Yes", {
      duration: 3000,
    });
    snack.onAction().subscribe(() => {
      this.hasSeverAbdominalPain = true;
    })
  }

  hints(hint) {
    this.snackBar.open(hint, "Ok", {
      duration: 3000,
    });
  }

  clear() {
    this.hasHeamoptysrc = false;
    this.hasChronicWhezzing = false;
    this.hasChronicCought = false;
    this.hasSeverAbdominalPain = false;
    this.hasFever = false;
    // this.toothR = false;
  }

  filter(special) {

    if (special == "All") {
      this.getDoctors();
      return;
    }
    this.getDoctorBySpecial(special)

  }


  getDoctors() {

    this.doctors.forEach(doc => {

      this.findDocService.getDoctorBySpecial(doc.special).subscribe(result => {
        let doc = result;
        console.log(result[0]['profilePic'])
        // this.findDocService.getProPic("ssss")
        this.findDocService.getProPic(result[0]['profilePic']).subscribe(picture => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            doc[0]["patientPic"] = reader.result;
            this.doct.push(doc)
            console.log(doc)
          }, false)
          if (result) {
            const img = picture as Blob
            reader.readAsDataURL(img)
          }

        })

      })
    })
  }

  getDoctorBySpecial(special) {
    //   for (var x = 0; x < this.doctors.length; x++) {
    //     this.doctors.splice(x);
    //   }
    //
    //   for (var y = 0; y < this.doct.length; y++) {
    //     this.doct.splice(y);
    //   }
    //
    //
    //   this.findDocService.getDoctorBySpecial(special).subscribe(result => {
    //     let doc = result;
    //     console.log(result[0]['profilePic'])
    //     // this.findDocService.getProPic("ssss")
    //     this.findDocService.getProPic(result[0]['profilePic']).subscribe(picture => {
    //       let reader = new FileReader();
    //       reader.addEventListener("load", () => {
    //         doc[0]["patientPic"] = reader.result;
    //         this.doct.push(doc)
    //         console.log(doc)
    //       }, false)
    //       if (result) {
    //         const img = picture as Blob
    //         reader.readAsDataURL(img)
    //       }
    //
    //     })
    //
    //   })
    // }
  }
}


