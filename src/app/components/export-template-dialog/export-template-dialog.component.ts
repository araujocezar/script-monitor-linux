import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-export-template-dialog',
  templateUrl: './export-template-dialog.component.html',
  styleUrls: ['./export-template-dialog.component.scss']
})
export class ExportTemplateDialogComponent implements OnInit {

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    console.log(this.data);
  }
  clickExport() {
    const dataAtual = new Date();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.data));
    element.setAttribute('download', 'template' + dataAtual);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
