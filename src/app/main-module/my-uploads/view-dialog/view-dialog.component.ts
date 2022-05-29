import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent implements OnInit {

  url!:string;
  doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';

  constructor(@Inject(MAT_DIALOG_DATA)
  public data:any) { }

  ngOnInit(): void {
    this.url = this.data.url;
    console.log(this.url, "u")
  }

}
