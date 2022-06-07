import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommonModuleModule } from '../common-module/common-module.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';
import {MatTableModule} from '@angular/material/table';
import { ApprovalComponent } from './approval/approval.component';
import { ShareDialogComponent } from './my-uploads/share-dialog/share-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponent } from './shared/shared.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ViewDialogComponent } from './my-uploads/view-dialog/view-dialog.component';
import { ManagerComponent } from './manager/manager.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ApprovedComponent } from './approved/approved.component';
import { DeniedComponent } from './denied/denied.component';
import { UserComponent } from './user/user.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { MatInputModule } from '@angular/material/input';
import { ViewComponent } from './landing-page/view/view.component';
import {MatIconModule} from '@angular/material/icon';
import { ManagerSharedComponent } from './manager/manager-shared/manager-shared.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    FileUploadComponent,
    NavBarComponent,
    MyUploadsComponent,
    ApprovalComponent,
    ShareDialogComponent,
    SharedComponent,
    ViewDialogComponent,
    ManagerComponent,
    ApprovedComponent,
    DeniedComponent,
    UserComponent,
    SubscribeComponent,
    ViewComponent,
    ManagerSharedComponent,
  ],
  imports: [
    CommonModule,
    CommonModuleModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxDocViewerModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    LandingPageComponent,
    FileUploadComponent
  ]
})
export class MainModuleModule { }

