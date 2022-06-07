import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  fileId!: any;
  data: any;
  url = '';
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.fileId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.fileId);
    this.getData(this.fileId);
  }

  getData(id: number) {
    this.httpService.getFileById(id).subscribe((res: any) => {
      console.log(res, 1);
      this.data = res.File;
      console.log(this.data, "da")
      this.url = this.data.path;
      this.loading = false;
    });
  }

  downloadFile() {
    const e = document.createElement('a');
    e.href = this.url;
    e.download = this.data.name+"docx";
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
  }
}
