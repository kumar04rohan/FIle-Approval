import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ManagerGuard } from './guards/manager.guard';
import { UserGuard } from './guards/user.guard';
import { ApprovalComponent } from './main-module/approval/approval.component';
import { ApprovedComponent } from './main-module/approved/approved.component';
import { DeniedComponent } from './main-module/denied/denied.component';
import { FileUploadComponent } from './main-module/file-upload/file-upload.component';
import { LandingPageComponent } from './main-module/landing-page/landing-page.component';
import { ManagerComponent } from './main-module/manager/manager.component';
import { MyUploadsComponent } from './main-module/my-uploads/my-uploads.component';
import { SharedComponent } from './main-module/shared/shared.component';
import { UserComponent } from './main-module/user/user.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user', component:UserComponent, canActivate:[UserGuard], children:[
    {path:'upload', component:FileUploadComponent},
    {path:'my-uploads', component:MyUploadsComponent},
    {path:'shared', component:SharedComponent}
  ]},
  {path:'manager', component:ManagerComponent, canActivate:[ManagerGuard], children:[
    {path:'pending', component:ApprovalComponent},
    {path:'approved', component:ApprovedComponent},
    {path:'denied', component:DeniedComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
