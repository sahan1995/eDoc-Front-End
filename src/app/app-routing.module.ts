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
import {FindDoctorComponent} from "./find-doctor/find-doctor.component";
import {DoctorRequestsComponent} from "./doctor-requests/doctor-requests.component";
import {RegisterPrivatePracticeComponent} from "./register-private-practice/register-private-practice.component";
import {FamilyDoctorsComponent} from "./family-doctors/family-doctors.component";
import {MyPrivatePracticeComponent} from "./my-private-practice/my-private-practice.component";
import {ChatComponent} from "./chat/chat.component";
import {DoctorChatComponent} from "./doctor-chat/doctor-chat.component";

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
  {path :'Find-Doctor',component:FindDoctorComponent},
  {path :'Doctor-Requests',component:DoctorRequestsComponent},
  {path :'Register-Private-Practice',component:RegisterPrivatePracticeComponent},
  {path :'My-Private-Practice',component:MyPrivatePracticeComponent},
  {path :'Family-Doctors',component:FamilyDoctorsComponent},
  {path :'My-Chat',
    children:[
      {path:'',component:ChatComponent},
      {path:':chatroomId',component:ChatComponent}
    ]
  },
  {path :'My-patients',
    children:[
      {path:'',component:DoctorChatComponent},
      {path:':chatroomId',component:DoctorChatComponent}
    ]},
  {path:'',component:IndexwindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[RegisterComponent,IndexwindowComponent,PatientSignUpComponent,SignInComponent,PatientHomeComponent,
DoctorSignupComponent,DoctorHomeComponent,ConsultDoctorComponent,DoctorDetailComponent,DoctorAppointmentsComponent,DoctorVideochatDashboardComponent,
PatientVideochatDashboardComponent,PatientAppointmentsComponent,FindDoctorComponent,DoctorRequestsComponent,RegisterPrivatePracticeComponent,
FamilyDoctorsComponent,MyPrivatePracticeComponent,ChatComponent,DoctorChatComponent]
