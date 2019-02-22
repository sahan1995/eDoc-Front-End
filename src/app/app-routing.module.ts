import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {IndexwindowComponent} from "./indexwindow/indexwindow.component";
import {PatientSignUpComponent} from "./patient-sign-up/patient-sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {PatientHomeComponent} from "./patient-home/patient-home.component";
import {DoctorSignupComponent} from "./doctor-signup/doctor-signup.component";
import {DoctorHomeComponent} from "./doctor-home/doctor-home.component";
import {ConsultDoctorComponent} from "./consult-doctor/consult-doctor.component";
import {DoctorDetailComponent} from "./doctor-detail/doctor-detail.component";
import {DoctorAppointmentsComponent} from "./doctor-appointments/doctor-appointments.component";
import {DoctorVideochatDashboardComponent} from "./doctor-videochat-dashboard/doctor-videochat-dashboard.component";
import {PatientVideochatDashboardComponent} from "./patient-videochat-dashboard/patient-videochat-dashboard.component";
import {PatientAppointmentsComponent} from "./patient-appointments/patient-appointments.component";

const routes: Routes = [
  {path :'',redirectTo:'home',pathMatch:'full'},
  {path :'SignUp',component:RegisterComponent},
  {path :'Patient-Sign_Up',component:PatientSignUpComponent},
  {path :'SignIn',component:SignInComponent},
  {path :'Patient-Home',component:PatientHomeComponent},
  {path :'Doctor-SignUp',component:DoctorSignupComponent},
  {path :'Doctor-Home',component:DoctorHomeComponent},
  {path :'Consult-Doctor',component:ConsultDoctorComponent},
  {path :'Doctor-Detail/:id',component:DoctorDetailComponent},
  {path :'Doctor-Appointment',component:DoctorAppointmentsComponent},
  {path :'Doctor-VideoChat-DashBoard/:id/:appCode',component:DoctorVideochatDashboardComponent},
  {path :'Patient-VideoChat-DashBoard/:id/:appCode',component:PatientVideochatDashboardComponent},
  {path :'Patient-Appointment',component:PatientAppointmentsComponent},
  {path:'',component:IndexwindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[RegisterComponent,IndexwindowComponent,PatientSignUpComponent,SignInComponent,PatientHomeComponent,
DoctorSignupComponent,DoctorHomeComponent,ConsultDoctorComponent,DoctorDetailComponent,DoctorAppointmentsComponent,DoctorVideochatDashboardComponent,
PatientVideochatDashboardComponent,PatientAppointmentsComponent]
