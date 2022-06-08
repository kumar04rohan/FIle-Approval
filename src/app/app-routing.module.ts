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
import { InternalFilesComponent } from './main-module/internal-files/internal-files.component';
import { LandingPageComponent } from './main-module/landing-page/landing-page.component';
import { ViewComponent } from './main-module/landing-page/view/view.component';
import { AddDepartmentComponent } from './main-module/manager/add-department/add-department.component';
import { ManagerSharedComponent } from './main-module/manager/manager-shared/manager-shared.component';
import { ManagerComponent } from './main-module/manager/manager.component';
import { MyUploadsComponent } from './main-module/my-uploads/my-uploads.component';
import { SharedComponent } from './main-module/shared/shared.component';
import { SubscribeComponent } from './main-module/subscribe/subscribe.component';
import { UserComponent } from './main-module/user/user.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'view/:id', component:ViewComponent},
  {path:'subscribe', component:SubscribeComponent},
  {path:'user', component:UserComponent, children:[
    {path:'upload', component:FileUploadComponent},
    {path:'my-uploads', component:MyUploadsComponent},
    {path:'shared', component:SharedComponent},
    {path: 'internal-files', component:InternalFilesComponent}
  ]},
  {path:'admin', component:ManagerComponent, children:[
    {path: 'upload', component:FileUploadComponent},
    {path:'pending', component:ApprovalComponent},
    {path:'approved', component:ApprovedComponent},
    {path:'denied', component:DeniedComponent},
    {path:'my-uploads', component:MyUploadsComponent},
    {path:'shared', component:ManagerSharedComponent},
    {path:'add-department', component:AddDepartmentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
