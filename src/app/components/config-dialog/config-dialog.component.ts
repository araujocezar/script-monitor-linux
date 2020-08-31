import { Computer } from './../../interfaces/computer.interface';
import { Network } from './../../interfaces/network.interface';
import { Process } from './../../interfaces/process.interface';
import { Cpu } from './../../interfaces/cpu.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.idNode = data.key;
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
  }
  save() {
    // dicionairo keys 1- computador, 2 - cpu, 3 -rede, 4-processos, 5-hd
    if (this.data.type === 1) {
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
    }
    if (this.data.type === 2) {
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
    }
    if (this.data.type === 3) {
      this.network = {
        id: this.idNode,
        comment: this.cpuForm.controls.comment.value,
        download_kb: this.cpuForm.controls.download_kb.value,
        download_packet: this.cpuForm.controls.download_packet.value,
        name: this.cpuForm.controls.name.value,
        upload_kb: this.cpuForm.controls.upload_kb.value,
        upload_packet: this.cpuForm.controls.upload_packet.value,
      };
    }
    if (this.data.type === 4) {
      this.process = {
        id: this.idNode,
        comment: this.cpuForm.controls.comment.value,
        cpu_core: this.cpuForm.controls.cpu_core.value,
        cpu_total_percente: this.cpuForm.controls.cpu_total_percente.value,
        elapsed_time: this.cpuForm.controls.elapsed_time.value,
        filter: this.cpuForm.controls.filter.value,
        guest_percent: this.cpuForm.controls.guest_percent.value,
        max_faults_sec: this.cpuForm.controls.max_faults_sec.value,
        min_faults_sec: this.cpuForm.controls.min_faults_sec.value,
        name: this.cpuForm.controls.name.value,
        physical_memory_percent: this.cpuForm.controls.physical_memory_percent.value,
        resident_memory_kb: this.cpuForm.controls.resident_memory_kb.value,
        system_percent: this.cpuForm.controls.system_percent.value,
        usr_percent: this.cpuForm.controls.usr_percent.value,
        virtual_memory_kb: this.cpuForm.controls.virtual_memory_kb.value,
      };
    }
    if (this.data.type === 5) {
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
    }
  }

}
