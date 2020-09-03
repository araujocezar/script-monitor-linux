import { Computer } from './../../interfaces/computer.interface';
import { Network } from './../../interfaces/network.interface';
import { Process } from './../../interfaces/process.interface';
import { Cpu } from './../../interfaces/cpu.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Hd } from './../../interfaces/hd.interface';

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
  idNode: number;
  cpu: Cpu;
  hd: Hd;
  process: Process;
  network: Network;
  computer: Computer;
  diagrama: any[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfigDialogComponent>
  ) {
    this.diagrama = data.diagrama;
    console.log(this.diagrama);
    this.idNode = data.node.key;
    this.hdForm = this.fb.group({
      blocks: [false],
      comment: [''],
      free_kb: [false],
      free_percent: [false],
      name: [''],
      total: [false],
      used_kb: [false],
      used_percent: [false]
    });
    this.networkForm = this.fb.group({
      comment: [''],
      download_kb: [false],
      download_packet: [false],
      name: [''],
      upload_kb: [false],
      upload_packet: [false]
    });
    this.cpuForm = this.fb.group({
      comment: [''],
      core: ['ALL'],
      gnice: [false],
      guest: [false],
      idle: [false],
      iowait: [false],
      irq: [false],
      name: [''],
      nice: [false],
      soft: [false],
      steal: [false],
      sys: [false],
      user: [false]
    });
    this.computerForm = this.fb.group({
      comment: [''],
      data: [false],
      hour: [false],
      ip: [''],
      memory_buffers: [false],
      memory_cache: [false],
      memory_free: [false],
      memory_shared: [false],
      memory_total: [false],
      memory_used: [false],
      monitoring_time_second: ['0'],
      name: [''],
      password: [''],
      rsa: [false],
      sampling_frequency_second: ['1'],
      swap_free: [false],
      swap_total: [false],
      swap_used: [false],
      user: [''],
      zombie_process_total: [false]
    });
    this.processForm = this.fb.group({
      comment: [''],
      cpu_core: [false],
      cpu_total_percente: [false],
      elapsed_time: [false],
      filter: [''],
      guest_percent: [false],
      max_faults_sec: [false],
      min_faults_sec: [false],
      name: [''],
      physical_memory_percent: [false],
      resident_memory_kb: [false],
      system_percent: [false],
      usr_percent: [false],
      virtual_memory_kb: [false],
    });
   }

  ngOnInit() {
    this.initValues();
  }
  save() {
    // dicionairo keys 1- computador, 2 - cpu, 3 -rede, 4-processos, 5-hd
    if (this.data.node.type === 1) {
      this.computer = {
        id: this.idNode,
        comment: this.computerForm.controls.comment.value,
        data: this.computerForm.controls.data.value,
        hour: this.computerForm.controls.hour.value,
        ip: this.computerForm.controls.ip.value,
        memory_buffers: this.computerForm.controls.memory_buffers.value,
        memory_cache: this.computerForm.controls.memory_cache.value,
        memory_free: this.computerForm.controls.memory_free.value,
        memory_shared: this.computerForm.controls.memory_shared.value,
        memory_total: this.computerForm.controls.memory_total.value,
        memory_used: this.computerForm.controls.memory_used.value,
        monitoring_time_second: this.computerForm.controls.monitoring_time_second.value,
        name: this.computerForm.controls.name.value,
        password: this.computerForm.controls.password.value,
        rsa: this.computerForm.controls.rsa.value,
        sampling_frequency_second: this.computerForm.controls.sampling_frequency_second.value,
        swap_free: this.computerForm.controls.swap_free.value,
        swap_total: this.computerForm.controls.swap_total.value,
        swap_used: this.computerForm.controls.swap_used.value,
        user: this.computerForm.controls.user.value,
        zombie_process_total: this.computerForm.controls.zombie_process_total.value,
      };
      this.dialogRef.close(this.computer);
    }
    if (this.data.node.type === 2) {
      this.cpu = {
        id: this.idNode,
        comment: this.cpuForm.controls.comment.value,
        core: this.cpuForm.controls.core.value,
        gnice: this.cpuForm.controls.gnice.value,
        guest: this.cpuForm.controls.guest.value,
        idle: this.cpuForm.controls.idle.value,
        iowait: this.cpuForm.controls.iowait.value,
        irq: this.cpuForm.controls.irq.value,
        name: this.cpuForm.controls.name.value,
        nice: this.cpuForm.controls.nice.value,
        soft: this.cpuForm.controls.soft.value,
        steal: this.cpuForm.controls.steal.value,
        sys: this.cpuForm.controls.sys.value,
        user: this.cpuForm.controls.user.value,
      };
      this.dialogRef.close(this.cpu);
    }
    if (this.data.node.type === 3) {
      this.network = {
        id: this.idNode,
        comment: this.networkForm.controls.comment.value,
        download_kb: this.networkForm.controls.download_kb.value,
        download_packet: this.networkForm.controls.download_packet.value,
        name: this.networkForm.controls.name.value,
        upload_kb: this.networkForm.controls.upload_kb.value,
        upload_packet: this.networkForm.controls.upload_packet.value,
      };
      this.dialogRef.close(this.network);
    }
    if (this.data.node.type === 4) {
      this.process = {
        id: this.idNode,
        comment: this.processForm.controls.comment.value,
        cpu_core: this.processForm.controls.cpu_core.value,
        cpu_total_percente: this.processForm.controls.cpu_total_percente.value,
        elapsed_time: this.processForm.controls.elapsed_time.value,
        filter: this.processForm.controls.filter.value,
        guest_percent: this.processForm.controls.guest_percent.value,
        max_faults_sec: this.processForm.controls.max_faults_sec.value,
        min_faults_sec: this.processForm.controls.min_faults_sec.value,
        name: this.processForm.controls.name.value,
        physical_memory_percent: this.processForm.controls.physical_memory_percent.value,
        resident_memory_kb: this.processForm.controls.resident_memory_kb.value,
        system_percent: this.processForm.controls.system_percent.value,
        usr_percent: this.processForm.controls.usr_percent.value,
        virtual_memory_kb: this.processForm.controls.virtual_memory_kb.value,
      };
      this.dialogRef.close(this.process);
    }
    if (this.data.node.type === 5) {
      this.hd = {
        id: this.idNode,
        blocks: this.hdForm.controls.blocks.value,
        comment: this.hdForm.controls.comment.value,
        free_kb: this.hdForm.controls.free_kb.value,
        free_percent: this.hdForm.controls.free_percent.value,
        name: this.hdForm.controls.name.value,
        total: this.hdForm.controls.total.value,
        used_kb: this.hdForm.controls.used_kb.value,
        used_percent: this.hdForm.controls.used_percent.value,
      };
      this.dialogRef.close(this.hd);
    }
  }

  initValues() {
    this.diagrama.forEach((value) => {
        if (value.id === this.idNode) {
          if (this.data.node.type === 1) {
            this.computerForm.patchValue({
              comment: value.comment,
              data: value.data,
              hour: value.hour,
              ip: value.ip,
              memory_buffers: value.memory_buffers,
              memory_cache: value.memory_cache,
              memory_free: value.memory_free,
              memory_shared: value.memory_shared,
              memory_total: value.memory_total,
              memory_used: value.memory_used,
              monitoring_time_second: value.monitoring_time_second,
              name: value.name,
              password: value.password,
              rsa: value.rsa,
              sampling_frequency_second: value.sampling_frequency_second,
              swap_free: value.swap_free,
              swap_total: value.swap_total,
              swap_used: value.swap_used,
              user: value.user,
              zombie_process_total: value.zombie_process_total
            });
          }
          if (this.data.node.type === 2) {
            this.cpuForm.patchValue({
              comment: value.comment,
              core: value.core,
              gnice: value.gnice,
              guest: value.guest,
              idle: value.idle,
              iowait: value.iowait,
              irq: value.irq,
              name: value.name,
              nice: value.nice,
              soft: value.soft,
              steal: value.steal,
              sys: value.sys,
              user: value.user
            });
          }
          if (this.data.node.type === 3) {
            this.networkForm.patchValue({
              comment: value.comment,
              download_kb: value.download_kb,
              download_packet: value.download_packet,
              name: value.name,
              upload_kb: value.upload_kb,
              upload_packet: value.upload_packet
            });
          }
          if (this.data.node.type === 4) {
            this.processForm.patchValue({
              comment: value.comment,
              cpu_core: value.cpu_core,
              cpu_total_percente: value.cpu_total_percente,
              elapsed_time: value.elapsed_time,
              filter: value.filter,
              guest_percent: value.guest_percent,
              max_faults_sec: value.max_faults_sec,
              min_faults_sec: value.min_faults_sec,
              name: value.name,
              physical_memory_percent: value.physical_memory_percent,
              resident_memory_kb: value.resident_memory_kb,
              system_percent: value.system_percent,
              usr_percent: value.usr_percent,
              virtual_memory_kb: value.virtual_memory_kb,
            });
          }
          if (this.data.node.type === 5) {
            this.hdForm.patchValue({
              blocks: value.blocks,
              comment: value.comment,
              free_kb: value.free_kb,
              free_percent: value.free_percent,
              name: value.name,
              total: value.total,
              used_kb: value.used_kb,
              used_percent: value.used_percent
            });
          }
        }
    });
  }

}
