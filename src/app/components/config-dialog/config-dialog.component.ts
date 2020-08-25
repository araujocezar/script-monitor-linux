import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {

  processForm: FormGroup;
  cpuForm: FormGroup;
  networkForm: FormGroup;
  computerForm: FormGroup;
  hdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.hdForm = this.fb.group({
      blocks: ['false'],
      comment: [''],
      free_kb: ['false'],
      free_percent: ['false'],
      name: [''],
      total: ['false'],
      used_kb: ['false'],
      used_percent: ['false']
    });
    this.networkForm = this.fb.group({
      comment: [''],
      download_kb: ['false'],
      download_packet: ['false'],
      name: [''],
      upload_kb: ['false'],
      upload_packet: ['false']
    });
    this.cpuForm = this.fb.group({
      comment: [''],
      core: ['ALL'],
      gnice: ['false'],
      guest: ['false'],
      idle: ['false'],
      iowait: ['false'],
      irq: ['false'],
      name: [''],
      nice: ['false'],
      soft: ['false'],
      steal: ['false'],
      sys: ['false'],
      user: ['false']
    });
   }

  ngOnInit() {
  }
  save() {
    console.log(this.cpuForm.controls);
  }

}
