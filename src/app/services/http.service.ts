import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadModel } from '../main-module/file-upload/file-upload.model';
import { shareFileModel } from '../main-module/my-uploads/share_file.model';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private basePath = '/fileUploads';
  constructor(private httpClient:HttpClient, private storage: AngularFireStorage) { }

  getAllManagers() {
    const getAllManagerUrl = environment.APIs.getAllManagers;
    return this.httpClient.get<any>(getAllManagerUrl).pipe(

      catchError(this.handleError)
    )
  }

  getFiles(user_id:number) {
    const getFilesUrl = environment.APIs.getFile+user_id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getFilesUrl).subscribe(
        (res) => {
          resolve(res)
        }
      )
    })
  }

  getApprovalFiles(user_id:number) {
    const getFilesUrl = environment.APIs.getFileManager+user_id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getFilesUrl).subscribe(
        (res) => {
          resolve(res)
        }
      )
    })
  }

  approveFile(id:number) {
    const approveUrl = environment.APIs.approve+id;
    return new Promise((resolve) => {
      this.httpClient.put(approveUrl, {}).subscribe(
        (res) => {
          resolve(res);
        }
      )
    })
  }

  denyFile(id:number) {
    const denyUrl = environment.APIs.deny+id;
    return new Promise((resolve) => {
      this.httpClient.put(denyUrl, {}).subscribe(
        (res) => {
          resolve(res);
        }
      )
    })
  }

  handleError(error: HttpErrorResponse) {

    let errorMsg = '';
    if (error.status === 0) {
  
      errorMsg = "Network Error";
    } 
    else {
      
      errorMsg = error.error.error.message;
    }
    
    return throwError(() => new Error(errorMsg));
  }

  getAllUsers() {
    const getAllUsersUrl = environment.APIs.getAllUsers;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getAllUsersUrl).subscribe(
        (res) => {
          resolve(res);
        }
      )
    })
  }

  shareFile(shareFile:shareFileModel) {

    const shareFileUrl = environment.APIs.share;
    return new Promise((resolve) => {
      this.httpClient.post<shareFileModel>(shareFileUrl, shareFile).subscribe(
        (res) => {
          resolve(res)
        }
      )
    })
  }

  getShared(id:number) {
    const getSharedUrl = environment.APIs.getShared+id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getSharedUrl).subscribe(
        (res) => {
          resolve(res);
        }
      )
    })
  }


  pushFileToStorage(fileUpload: FileUploadModel): Observable<number | undefined> {
    const randomNo = Math.floor(Math.random()*10000).toString();
    const filePath = `${this.basePath}/${fileUpload.user_id.toString()}/${randomNo}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.data);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.path = downloadURL;
          fileUpload.name = fileUpload.data.name;
          this.sendFile(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  sendFile(file:FileUploadModel) {
    const fileUploadUrl = environment.APIs.fileUpload;
    return new Promise((resolve) => {
      this.httpClient.post<FileUploadModel>(fileUploadUrl, file).subscribe(
        (res) => {
          resolve(res)
        }
      )
    })
  }

  getSpecificFileUrl(id:number) {
    const getSingleFileUrl = environment.APIs.getSingleFile+id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getSingleFileUrl).subscribe(
        (res) => {
          resolve(res);
          console.log(res.File.path, "ser")
        }
      )
    })
  }

  getApprovedManagerFile(id:number) {
    const getApprovedFileUrl = environment.APIs.getManagerApproved+id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getApprovedFileUrl).subscribe(
        (res) => {
          resolve(res);
          console.log(res.File.path, "ser")
        }
      )
    })
  }

  getDeniedManagerFile(id:number) {
    const getDeniedFileUrl = environment.APIs.getManagerDenied+id;
    return new Promise((resolve) => {
      this.httpClient.get<any>(getDeniedFileUrl).subscribe(
        (res) => {
          resolve(res);
          console.log(res.File.path, "ser")
        }
      )
    })
  }
}
