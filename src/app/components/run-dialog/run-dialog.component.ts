import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Cabecalho } from 'src/app/interfaces/cabecalho.interface';

@Component({
  selector: 'app-run-dialog',
  templateUrl: './run-dialog.component.html',
  styleUrls: ['./run-dialog.component.scss']
})
export class RunDialogComponent implements OnInit {

  runForm: FormGroup;
  remote: boolean;
  tempo: boolean;
  cabecalho: Cabecalho;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<RunDialogComponent>,
  ) {
    this.remote = false;
    this.tempo = false;
  }

  ngOnInit() {
    this.runForm = this.fb.group({
      type: [0, [Validators.required]], // local ou remoto
      timer: [false, [Validators.required]],
      user: [''], // caso remoto
      password: [''], // caso remoto
      seconds: [''], // caso temporizador
      ip: [''],
      frequency: ['']
    });
  }
  changeType() {
    const type = this.runForm.get('type').value;
    if (type === 1) {
      this.remote = false;
    } else {
      this.remote = true;
    }
   }

   changeTimer() {
     const timer = this.runForm.get('timer').value;
     if (timer === false) {
       this.tempo = true;
     } else {
       this.tempo = false;
     }
   }
  run() {
    this.cabecalho = {
      type: this.runForm.controls.type.value,
      timer: this.runForm.controls.timer.value,
      user: this.runForm.controls.user.value,
      password: this.runForm.controls.password.value,
      seconds: this.runForm.controls.seconds.value,
      ip: this.runForm.controls.ip.value,
      frequency: this.runForm.controls.frequency.value
    };
    this.dialogRef.close(this.cabecalho);
  }
}
