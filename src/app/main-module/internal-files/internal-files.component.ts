import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { displayModel } from '../landing-page/display.model';

@Component({
  selector: 'app-internal-files',
  templateUrl: './internal-files.component.html',
  styleUrls: ['./internal-files.component.css']
})
export class InternalFilesComponent implements OnInit {

  isLoading = true;
  files: any;
  displayedColumns: string[] = [
    'name',
    'version',
    'department',
    'view_download',
  ];
  dataSource!: displayModel[];
  viewDoc = false;
  noFiles = true;
  constructor(private httpService: HttpService, private router:Router) {}


  ngOnInit(): void {
    this.getData();
  }  

  getData() {
    this.httpService.getDataByPermissionId(2)
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
      for (let data of this.files) {
        const dataElement = {id: data.id, name:data.name, version:data.version, department:data.tag_id};
        dataSource.push(dataElement);
      }
      this.dataSource = dataSource;
    }
   else {
     this.noFiles = true;
   }
  }
  
  downloadDoc(index:number) {
    console.log("sas")
    const url = this.files[index].path;
    const name = this.files[index].name;
    console.log(url, name, this.files)
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
}
