import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-import-template-dialog',
  templateUrl: './import-template-dialog.component.html',
  styleUrls: ['./import-template-dialog.component.scss']
})
export class ImportTemplateDialogComponent implements OnInit {

  templateForm: FormGroup;
  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<ImportTemplateDialogComponent>,


  ) {
    this.templateForm = fb.group({
      template: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }
  clickImport() {
    this.dialogRef.close(this.templateForm.controls.template.value);
  }

}
