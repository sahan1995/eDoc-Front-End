import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { PatientSignUpComponent } from './patient-sign-up/patient-sign-up.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AgmCoreModule} from "@agm/core"
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from '@angular/material/dialog';4
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import { SignInComponent } from './sign-in/sign-in.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { ConsultDoctorComponent } from './consult-doctor/consult-doctor.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { AgmDirectionModule } from 'agm-direction';
import { DoctorVideochatDashboardComponent } from './doctor-videochat-dashboard/doctor-videochat-dashboard.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';

// import { PatientComponent } from './patient/patient.component';
import { PatientVideochatDashboardComponent } from './patient-videochat-dashboard/patient-videochat-dashboard.component'
import {VideoChatService} from "./service/video-chat.service";
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { FindDoctorComponent } from './find-doctor/find-doctor.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PatientSignUpComponent,
    SignInComponent,
    PatientHomeComponent,
    DoctorSignupComponent,
    DoctorHomeComponent,
    ConsultDoctorComponent,
    DoctorDetailComponent,
    DoctorAppointmentsComponent,
    DoctorVideochatDashboardComponent,
    PatientVideochatDashboardComponent,
    PatientAppointmentsComponent,
    FindDoctorComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD_W5R3Qs6myPZQyIFLs8M7hmbLiVP08xE',
    }),
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    LyResizingCroppingImageModule,
    LyButtonModule,
    LyIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    AgmDirectionModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule


  ],
  providers: [VideoChatService],
  bootstrap: [AppComponent],
  entryComponents:[PatientSignUpComponent]
})
export class AppModule { }
