import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { displayModel } from './display.model';
import { displayModel2 } from './display2.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLoading = true;
  files: any;
  displayedColumns: string[] = [
    'name',
    'version',
    'department',
    'view_download',
  ];
  dataSource!: displayModel2[];
  viewDoc = false;
  noFiles = true;
  constructor(private httpService: HttpService, private router:Router) {}


  ngOnInit(): void {
    this.getData();
  }  

  getData() {
    this.httpService.getDataByPermissionId(1)
    .subscribe((res: any) => {
      this.files = res.File;
      this.setDataSource();
      this.isLoading = false;
    });
  }

  setDataSource() {
    const dataSource = [];
    console.log(this.files.length, "len")
    if (this.files.length > 0) {
      this.noFiles = false;
      let ind = 0
      for (let data of this.files) {
        const dataElement = {id: data.id, name:data.name, version:data.version, department:data.tag_id, index:ind};
        dataSource.push(dataElement);
        ind = ind +1;
      }
      this.dataSource = dataSource;
    }
   else {
     this.noFiles = true;
   }
  }
  
  downloadDoc(index:number) {
    const url = this.files[index].path;
    const name = this.files[index].name;
    // console.log(url, name, this.files)
    const e = document.createElement('a');
    e.href = url;
    e.download = name+"docx";
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
  }


  viewNavigate(id:number) {
    if (window.innerWidth < 500) {
      this.router.navigate(['view/'+id]);
    }
  }

  view(id:number) {
    this.router.navigate(['view/'+id]);
  }

  getDepartmentList() {
    this.httpService.getAllDepartment().subscribe(
      (res) => {
        console.log(res)
      }
    )
  }
}
