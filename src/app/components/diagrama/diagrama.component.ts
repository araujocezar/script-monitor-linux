import { Cabecalho } from './../../interfaces/cabecalho.interface';
import { CPU, DISK, NETWORK, COMPUTER, PROCESS } from './../../interfaces/scripts-local.interface';
import { RunDialogComponent } from './../run-dialog/run-dialog.component';
import { ExportTemplateDialogComponent } from './../export-template-dialog/export-template-dialog.component';
import { ImportTemplateDialogComponent } from './../import-template-dialog/import-template-dialog.component';
import { ConfigDialogComponent } from './../config-dialog/config-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import { MatDialog } from '@angular/material';
import { stringify } from 'querystring';
import { cpuUsage } from 'process';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html',
  styleUrls: ['./diagrama.component.scss']
})
export class DiagramaComponent implements OnInit, AfterViewInit {

  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;

  clearJson = {
    // tslint:disable-next-line:object-literal-key-quotes
    'class': 'GraphLinksModel',
    // tslint:disable-next-line:object-literal-key-quotes
    'nodeDataArray': '[]',
    // tslint:disable-next-line:object-literal-key-quotes
    'linkDataArray': '[]'
  };
  public script: string;
  public diagrama: go.Diagram = null;
  public paleta: go.Palette = null;
  JSONExport: string;

  public objetosDiagrama: any[];
  constructor(public dialog: MatDialog) {
    this.objetosDiagrama = [];
    this.script = '<p> hello, the script will appear here! </p>';
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.diagrama = $(go.Diagram, 'divDiagrama',
      {
        LinkDrawn: maybeChangeLinkCategory,     // these two DiagramEvents call a
        LinkRelinked: maybeChangeLinkCategory,  // function that is defined below
        // SelectionDeleted(e) {
        //   e.subject.each( (key) => {
        //     this.objetosDiagrama.forEach((value, index) => {
        //       if (value.id === key.part.data.key) {
        //         this.objetosDiagrama.splice(index, 1);
        //       }
        //     });
        //   });
        // }
      });

    // this.diagrama.nodeTemplate =
    //   $(go.Node, 'Auto',
    //     $(go.Shape,
    //       { fill: 'white' },
    //       new go.Binding('fill', 'color'),
    //       { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }),
    //     $(go.TextBlock, { margin: 5 },
    //       new go.Binding('text', 'key'))
    //   );



    this.diagrama.nodeTemplate =
      $(go.Node, 'Vertical',
        $(go.TextBlock,
          {
            margin: new go.Margin(3, 0, 0, 0),
            maxSize: new go.Size(100, 30),
            isMultiline: false,
            font: 'bold 10pt sans-serif'
          },
          new go.Binding('text', 'head')),
        $(go.Picture,
          { maxSize: new go.Size(50, 50) },
          new go.Binding('source', 'img'),
          { portId: '', cursor: 'pointer' },
          new go.Binding('fromLinkable', 'from'),
          new go.Binding('toLinkable', 'to')
          )
          ,
        $(go.TextBlock,
          {
            margin: new go.Margin(3, 0, 0, 0),
            maxSize: new go.Size(100, 30),
            isMultiline: true
          },
          new go.Binding('text', 'text')));

    this.diagrama.undoManager.isEnabled = true;
    // create the Palette
    const myPalette =
      $(go.Palette, 'divPallet');

    // the Palette's node template is different from the main Diagram's
    myPalette.nodeTemplate =
      $(go.Node, 'Vertical',
        { locationSpot: go.Spot.Center},
        $(go.TextBlock,
          {
            margin: new go.Margin(3, 0, 0, 0),
            maxSize: new go.Size(100, 30),
            isMultiline: false,
            font: 'bold 10pt sans-serif'
          },
          new go.Binding('text', 'head')),
        $(go.Picture,
          { maxSize: new go.Size(50, 50) },
          new go.Binding('source', 'img')),
        $(go.TextBlock,
          {
            margin: new go.Margin(3, 0, 0, 0),
            maxSize: new go.Size(100, 30),
            isMultiline: false
          },
          new go.Binding('text', 'text'))
      );

    // the list of data to show in the Palette
    myPalette.model.nodeDataArray = [
      { head: 'Computer', key: '1', img: '../../assets/computer.png', type: 1 , from: true, to: true},
      { head: 'CPU', key: '2', img: '../../assets/cpu.png', type: 2 , to: true},
      { head: 'Network', key: '3', img: '../../assets/rede.png', type: 3, to: true },
      { head: 'Process', key: '4', img: '../../assets/processo.png', type: 4, to: true },
      { head: 'HD', key: '5', img: '../../assets/hdd.png', type: 5, to: true }
    ];
    // dicionairo keys 1- computador, 2 - cpu, 3 -rede, 4-processos, 5-hd

  //   const myPalette: go.Palette =
  //     $(go.Palette, 'divPallet',  // must name or refer to the DIV HTML element
  //       {
  //         'animationManager.duration': 800, // slightly longer than default (600ms) animation
  //         nodeTemplateMap: this.diagrama.nodeTemplateMap,  // share the templates used by myDiagram
  //         model: new go.GraphLinksModel([  // specify the contents of the Palette
  //           { category: 'Start', text: 'Start' },
  //           { text: 'Step' },
  //           { text: '???', figure: 'Computer' },
  //           { category: 'End', text: 'End' },
  //           { category: 'Comment', text: 'Comment' }
  //         ])
  //       });
  //   this.diagrama.nodeTemplate =
  //     $(go.Node, 'Auto',
  //       $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
  //         new go.Binding('fill', 'color')),
  //       $(go.TextBlock,
  //         { margin: 25 },
  //         new go.Binding('text', 'key'))
  //     );

  // }
    function maybeChangeLinkCategory(e) {
      const link = e.subject;
      const linktolink = (link.fromNode.isLinkLabel || link.toNode.isLinkLabel);
      e.diagram.model.setCategoryForLinkData(link.data, (linktolink ? 'linkToLink' : ''));
    }


    // when a node is double-clicked, add a child to it
    this.diagrama.addDiagramListener('ObjectDoubleClicked', (e: any) => {
      const node = e.subject.part.data;
      const dialog = this.dialog.open(ConfigDialogComponent, {
        width: '500px', maxHeight: '750px', data: {
          node,
          diagrama: this.objetosDiagrama
        }});
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.objetosDiagrama.forEach((value, index) => {
            if (value.id === result.id) {
              this.objetosDiagrama.splice(index, 1);
            }
          });
          console.log(result);
          this.objetosDiagrama.push(result);
        }
      });
    });
    this.diagrama.addDiagramListener('SelectionDeleting', (e: any) => {
      e.subject.each((key) => {
        this.objetosDiagrama.forEach((value, index) => {
          if (value.id === key.part.data.key) {
            this.objetosDiagrama.splice(index, 1);
          }
        });
      });
    });
  }
  openImportDialog() {
    const dialogRef = this.dialog.open(ImportTemplateDialogComponent, { width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagrama.model = go.Model.fromJson(result);
      }
    });
  }
  openExportDialog() {
    this.JSONExport = this.diagrama.model.toJson();
    this.dialog.open(ExportTemplateDialogComponent, { width: '600px', data: this.JSONExport });
  }
  clear() {
    this.diagrama.model = go.Model.fromJson(this.clearJson);
    this.objetosDiagrama = [];
    this.script = 'hello, the script will appear here!';
  }
  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent);
  }

  getInstancias() {
    const objetos = this.diagrama.model.linkDataArray;
    const objMostrar = [[]];
    let index = 0;
    let from = 0;
    objetos.forEach(element => {
      if (objMostrar[index].length === 0) {
        objMostrar[index].push(element.from);
        objMostrar[index].push(element.to);
        from = element.from;
      } else if (element.from === from) {
        objMostrar[index].push(element.to);
      } else {
        index += 1;
        objMostrar.push([]);
        objMostrar[index].push(element.from);
        objMostrar[index].push(element.to);
        from = element.from;
      }
    });
    return objMostrar;
  }

  subScript(objMostrar) {
    this.objetosDiagrama.forEach(element => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < objMostrar.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0; k < objMostrar[i].length; k++) {
          if (objMostrar[i][k] === element.id) {
            objMostrar[i][k] = element;
            break;
          }
        }
      }
    });
    return objMostrar;
  }
  run() {
    let objMostrar = this.getInstancias();
    let estruturaCompleta = false;
    if (objMostrar[0].length > 0) {
      estruturaCompleta = true;
    }
    objMostrar = this.subScript(objMostrar);
    const dialogRef = this.dialog.open(RunDialogComponent, { width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.script = '#!/bin/bash <br>';
        if (estruturaCompleta) {
          objMostrar.forEach(objeto => {
            this.script += `
            echo ${this.mostrarVariaveis(objeto)} > ${objeto[0].name}.txt
            <br>
            <br>
            echo Monitoring...
            <br>
            ${result.timer ? 'cont = 1; <br>' : ''}
            while [${result.timer ? '$cont -le ' + result.seconds : ' True '}]
            <br>
            do
            <br>
            <br>
            ${this.montagemScript(objeto, result.ip, result.user, result.password)}
            <br>
            echo ${this.mostrarVariaveisWhile(objeto)} >> ${objeto[0].name}.txt
            <br>
            <br>
            ${result.timer ? 'cont =`expr $cont + 1`<br>' : ''}
            sleep ${result.frequency ? result.frequency : '1'}
            <br>
            done
            <br>
            <br>
            `;
          });
        }
      }
      if (estruturaCompleta === false) {
        this.objetosDiagrama.forEach(element => {
          this.script += `
            <br>
            <br>
            echo Monitoring...
            <br>
            ${result.timer ? 'cont = 1; <br>' : ''}
            while [${result.timer ? '$cont -le ' + result.seconds : ' True '}]
            <br>
            do
            <br>
            <br>
            ${this.montagemScriptPcs()}
            <br>
            <br>
            <br>
            ${result.timer ? 'cont =`expr $cont + 1`<br>' : ''}
            sleep ${result.frequency ? result.frequency : '1'}
            <br>
            done
            <br>
            <br>
            `;
        });
      }
    });
  }

  montagemScriptPcs() {
    let script = '';
    this.objetosDiagrama.forEach(objeto => {
      if (objeto.type === 1) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 1) {
            script = script += '<br>';
            script = script + ' ' + COMPUTER.mem + '<br>';
            script = script + ' ' + COMPUTER.tempo + '<br>';
            script = script + ' ' + COMPUTER.swap + '<br>';
          }
          if (key === 'data' && objeto[key] === true) {
            script = script += '<br>';
            script = script + ' ' + COMPUTER.data + '<br>';
          }
          if (key === 'hour' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.hora + '<br>';
          }
          if (key === 'memory_buffers' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.membuffers + '<br>';
          }
          if (key === 'memory_cache' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memcached + '<br>';
          }
          if (key === 'memory_free' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memfree + '<br>';
          }
          if (key === 'memory_shared' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memshared + '<br>';
          }
          if (key === 'memory_total' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memtotal + '<br>';
          }
          if (key === 'memory_used' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memused + '<br>';
          }
          if (key === 'swap_free' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swapfree + '<br>';
          }
          if (key === 'swap_total' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swaptotal + '<br>';
          }
          if (key === 'swap_used' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swapused + '<br>';
          }
          if (key === 'zombie_process_total' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.numzumbis + '<br>';
          }
        });
      }
    });
    return script;
  }

  montagemScript(objetoD, ip?, user?, password?) {
    let remoto = false;
    let cabecalhoRemoto = '';
    if (ip || user || password) {
      remoto = true;
      cabecalhoRemoto = `sshpass -p '${password}' ssh ${user}@${ip}`;
    }
    console.log(cabecalhoRemoto);
    let script = '';
    objetoD.forEach(objeto => {
      if (objeto.type === 1) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 1) {
            script = script += '<br>';
            script = script += 'mem =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + COMPUTER.mem + '<br>';
            script = script + ' ' + COMPUTER.tempo + '<br>';
            script = script += 'swap =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + COMPUTER.swap + '<br>';
          }
          // if (key === 'data' && objeto[key] === true || key === 'hour' && objeto[key] === true ) {
          //   script = script += '<br>';
          //   script = script + ' ' + COMPUTER.tempo + '<br>';
          // }
          if (key === 'data' && objeto[key] === true) {
            script = script += '<br>';
            script = script + ' ' + COMPUTER.data + '<br>';
          }
          if (key === 'hour' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.hora + '<br>';
          }
          // if (key === 'memory_buffers' && objeto[key] === true || key === 'memory_cache' && objeto[key] === true ||
          //   key === 'memory_cache' && objeto[key] === true || key === 'memory_free' && objeto[key] === true ||
          //   key === 'memory_shared' && objeto[key] === true || key === 'memory_total' && objeto[key] === true ||
          //   key === 'memory_used' && objeto[key] === true) {
          //     script = script += '<br>';
          //     script = script + ' ' + COMPUTER.mem + '<br>';
          // }
          if (key === 'memory_buffers' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.membuffers + '<br>';
          }
          if (key === 'memory_cache' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memcached + '<br>';
          }
          if (key === 'memory_free' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memfree + '<br>';
          }
          if (key === 'memory_shared' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memshared + '<br>';
          }
          if (key === 'memory_total' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memtotal + '<br>';
          }
          if (key === 'memory_used' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.memused + '<br>';
          }
          // if (key === 'swap_free' && objeto[key] === true || key === 'swap_total' && objeto[key] === true ||
          //   key === 'swap_used' && objeto[key] === true || key === 'swap_used' && objeto[key] === true ) {
          //   script = script + ' ' + COMPUTER.swap + '<br>';
          // }
          if (key === 'swap_free' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swapfree + '<br>';
          }
          if (key === 'swap_total' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swaptotal + '<br>';
          }
          if (key === 'swap_used' && objeto[key] === true) {
            script = script + ' ' + COMPUTER.swapused + '<br>';
          }
          if (key === 'zombie_process_total' && objeto[key] === true) {
            script = script += 'numzumbis =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + COMPUTER.numzumbis + '<br>';
          }
        });
      }
      if (objeto.type === 2) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 2) {
            script = script += '<br>';
            script = script += 'cpu =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + CPU.cpu + objeto.core + ' ' + CPU.cpu2 + '<br>';
          }
          if (key === 'gnice' && objeto[key] === true) {
            script = script + ' ' + CPU.cpugnice + '<br>';
          }
          if (key === 'guest' && objeto[key] === true) {
            script = script + ' ' + CPU.cpuguest + '<br>';
          }
          if (key === 'idle' && objeto[key] === true) {
            script = script + ' ' + CPU.cpuidle + '<br>';
          }
          if (key === 'iowait' && objeto[key] === true) {
            script = script + ' ' + CPU.cpuiowait + '<br>';
          }
          if (key === 'irq' && objeto[key] === true) {
            script = script + ' ' + CPU.cpuirq + '<br>';
          }
          if (key === 'soft' && objeto[key] === true) {
            script = script + ' ' + CPU.cpusoft + '<br>';
          }
          if (key === 'steal' && objeto[key] === true) {
            script = script + ' ' + CPU.cpusteal + '<br>';
          }
          if (key === 'sys' && objeto[key] === true) {
            script = script + ' ' + CPU.cpusys + '<br>';
          }
          if (key === 'user' && objeto[key] === true) {
            script = script + ' ' + CPU.cpuuser + '<br>';
          }
        });

      }
      if (objeto.type === 3) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 3) {
            script = script += 'eth01 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.eth01 + '<br>';
            script = script += 'local1 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.local1 + '<br>';
            script = script += 'wifi1 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.wifi1 + '<br>';
            script = script + ' ' + NETWORK.sleep + '<br>';
            script = script += 'eth02 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.eth02 + '<br>';
            script = script += 'local2 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.local2 + '<br>';
            script = script += 'wifi2 =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + NETWORK.wifi2 + '<br>';
            script = script += '<br>';
          }
          if (key === 'download_kb' && objeto[key] === true) {
            script = script + ' ' + NETWORK.eth0download + '<br>';
            script = script + ' ' + NETWORK.eth0download2 + '<br>';
            script = script + ' ' + NETWORK.eth0downpacket + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.wifidownload1 + '<br>';
            script = script + ' ' + NETWORK.wifidownload2 + '<br>';
            script = script + ' ' + NETWORK.wifidownload + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.localdownload1 + '<br>';
            script = script + ' ' + NETWORK.localdownload2 + '<br>';
            script = script + ' ' + NETWORK.localdownload + '<br>';
            script = script += '<br>';
          }
          if (key === 'download_packet' && objeto[key] === true) {
            script = script + ' ' + NETWORK.eth0downpacket1 + '<br>';
            script = script + ' ' + NETWORK.eth0downpacket2 + '<br>';
            script = script + ' ' + NETWORK.eth0downpacket + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.wifidownpacket1 + '<br>';
            script = script + ' ' + NETWORK.wifidownpacket2 + '<br>';
            script = script + ' ' + NETWORK.wifidownpacket + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.localdownpacket1 + '<br>';
            script = script + ' ' + NETWORK.localdownpacket2 + '<br>';
            script = script + ' ' + NETWORK.localdownpacket + '<br>';
            script = script += '<br>';
          }
          if (key === 'upload_kb' && objeto[key] === true) {
            script = script + ' ' + NETWORK.eth0upload1 + '<br>';
            script = script + ' ' + NETWORK.eth0upload2 + '<br>';
            script = script + ' ' + NETWORK.eth0upload + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.wifiupload1 + '<br>';
            script = script + ' ' + NETWORK.wifiupload2 + '<br>';
            script = script + ' ' + NETWORK.wifiupload + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.localupload1 + '<br>';
            script = script + ' ' + NETWORK.localupload2 + '<br>';
            script = script + ' ' + NETWORK.localupload + '<br>';
            script = script += '<br>';
          }
          if (key === 'upload_packet' && objeto[key] === true) {
            script = script + ' ' + NETWORK.eth0uppacket1 + '<br>';
            script = script + ' ' + NETWORK.eth0uppacket2 + '<br>';
            script = script + ' ' + NETWORK.eth0uppacket + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.wifiuppacket1 + '<br>';
            script = script + ' ' + NETWORK.wifiuppacket2 + '<br>';
            script = script + ' ' + NETWORK.wifiuppacket + '<br>';
            script = script += '<br>';
            script = script + ' ' + NETWORK.localuppacket1 + '<br>';
            script = script + ' ' + NETWORK.localuppacket2 + '<br>';
            script = script + ' ' + NETWORK.localuppacket + '<br>';
            script = script += '<br>';
          }
        });
      }
      if (objeto.type === 4) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 4) {
            script = script += '<br>';
            script = script += 'pid = ';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + PROCESS.pid + 'grep ' + objeto.filter1 + ' ' +
              (objeto.filter2 ? '| grep ' + objeto.filter2 + ' ' : '') + (objeto.filter3 ? '| grep ' + objeto.filter3 + ' ' : '') +
              PROCESS.pid_2 + '<br>';
            script = script + PROCESS.process;
          }
          if (key === 'mem' && objeto[key] === true) {
            script = script + ' ' + PROCESS.mem + '<br>';
          }
          if (key === 'cpu' && objeto[key] === true) {
            script = script + ' ' + PROCESS.cpu + '<br>';
          }
          if (key === 'virtmem' && objeto[key] === true) {
            script = script + ' ' + PROCESS.virtmem + '<br>';
          }
          if (key === 'resmem' && objeto[key] === true) {
            script = script + ' ' + PROCESS.resmem + '<br>';
          }
        });
      }
      if (objeto.type === 5) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 5) {
            script = script += '<br>';
            script = script += 'disk =';
            script = script + cabecalhoRemoto + ' ';
            script = script + ' ' + DISK.disk + ' ' + objeto.name + '<br>';
          }
          if (key === 'blocks' && objeto[key] === true) {
            script = script + ' ' + DISK.diskblocks + '<br>';
          }
          if (key === 'free_kb' && objeto[key] === true) {
            script = script + ' ' + DISK.diskfreekb + '<br>';
          }
          if (key === 'free_percent' && objeto[key] === true) {
            script = script + ' ' + DISK.diskfreepercent + '<br>';
          }
          if (key === 'total' && objeto[key] === true) {
            script = script + ' ' + DISK.diskavail + '<br>';
          }
          if (key === 'used_kb' && objeto[key] === true) {
            script = script + ' ' + DISK.diskusedkb + '<br>';
          }
          if (key === 'used_percent' && objeto[key] === true) {
            script = script + ' ' + DISK.diskusedpercent + '<br>';
          }
        });
      }
    });
    return script;
  }

  mostrarVariaveis(objetoD) {
      let script = '';
      objetoD.forEach(objeto => {
        if (objeto.type === 1) {
          Object.keys(objeto).forEach(key => {
            if (key === 'data' && objeto[key] === true) {
              script = script + 'Data' + ' ';
            }
            if (key === 'hour' && objeto[key] === true) {
              script = script + 'Hour' + ' ';
            }
            if (key === 'memory_buffers' && objeto[key] === true) {
              script = script + 'MemBuffers' + ' ';
            }
            if (key === 'memory_cache' && objeto[key] === true) {
              script = script + 'MemCached' + ' ';
            }
            if (key === 'memory_free' && objeto[key] === true) {
              script = script + 'MemFree' + ' ';
            }
            if (key === 'memory_shared' && objeto[key] === true) {
              script = script + 'MemShared' + ' ';
            }
            if (key === 'memory_total' && objeto[key] === true) {
              script = script + 'MemTotal' + ' ';
            }
            if (key === 'memory_used' && objeto[key] === true) {
              script = script + 'MemUsed' + ' ';
            }
            if (key === 'swap_free' && objeto[key] === true) {
              script = script + 'SwapFree' + ' ';
            }
            if (key === 'swap_total' && objeto[key] === true) {
              script = script + 'SwapTotal' + ' ';
            }
            if (key === 'swap_used' && objeto[key] === true) {
              script = script + 'SwapUsed' + ' ';
            }
            if (key === 'zombie_process_total' && objeto[key] === true) {
              script = script + 'NumZumbis' + ' ';
            }
          });
        }
        if (objeto.type === 2) {
          Object.keys(objeto).forEach(key => {
            if (key === 'gnice' && objeto[key] === true) {
              script = script + 'CpuGnice' + ' ';
            }
            if (key === 'guest' && objeto[key] === true) {
              script = script + 'CpuGuest' + ' ';
            }
            if (key === 'idle' && objeto[key] === true) {
              script = script + 'CpuIdle' + ' ';
            }
            if (key === 'iowait' && objeto[key] === true) {
              script = script + 'CpuIOwait' + ' ';
            }
            if (key === 'irq' && objeto[key] === true) {
              script = script + 'CpuIrq' + ' ';
            }
            if (key === 'soft' && objeto[key] === true) {
              script = script + 'CpuSoft' + ' ';
            }
            if (key === 'steal' && objeto[key] === true) {
              script = script + 'CpuSteal' + ' ';
            }
            if (key === 'sys' && objeto[key] === true) {
              script = script + 'CpuSys' + ' ';
            }
            if (key === 'user' && objeto[key] === true) {
              script = script + 'CpuUser' + ' ';
            }
          });

        }
        if (objeto.type === 3) {
          Object.keys(objeto).forEach(key => {
            if (key === 'download_kb' && objeto[key] === true) {
              script = script + 'Eth0Download' + ' ';
              script = script + 'LocalDownload' + ' ';
              script = script + 'WifiDownload' + ' ';
            }
            if (key === 'download_packet' && objeto[key] === true) {
              script = script + 'Eth0DownPacket' + ' ';
              script = script + 'LocalDownPacket' + ' ';
              script = script + 'WifiDownPacket' + ' ';
            }
            if (key === 'upload_kb' && objeto[key] === true) {
              script = script + 'Eth0Upload' + ' ';
              script = script + 'LocalUpload' + ' ';
              script = script + 'WifiUpload' + ' ';

            }
            if (key === 'upload_packet' && objeto[key] === true) {
              script = script + 'Eth0UpPacket' + ' ';
              script = script + 'LocalUpPacket' + ' ';
              script = script + 'WifiUpPacket' + ' ';
            }
          });
        }
        if (objeto.type === 4) {
          Object.keys(objeto).forEach(key => {
            if (key === 'mem' && objeto[key] === true) {
              script = script + 'cpuProcess' + ' ';
            }
            if (key === 'cpu' && objeto[key] === true) {
              script = script + 'memProcess' + ' ';
            }
            if (key === 'virtmem' && objeto[key] === true) {
              script = script + 'virtmem' + ' ';
            }
            if (key === 'resmem' && objeto[key] === true) {
              script = script + 'resmem' + ' ';
            }
          });

        }
        if (objeto.type === 5) {
          Object.keys(objeto).forEach(key => {
            if (key === 'blocks' && objeto[key] === true) {
              script = script + 'DiskBlocks' + ' ';
            }
            if (key === 'free_kb' && objeto[key] === true) {
              script = script + 'DiskFreeKb' + ' ';
            }
            if (key === 'free_percent' && objeto[key] === true) {
              script = script + 'DiskFreePercent' + ' ';
            }
            if (key === 'total' && objeto[key] === true) {
              script = script + 'DiskAvail' + ' ';
            }
            if (key === 'used_kb' && objeto[key] === true) {
              script = script + 'DiskUsedkb' + ' ';
            }
            if (key === 'used_percent' && objeto[key] === true) {
              script = script + 'DiskUsedPercent' + ' ';
            }
          });
        }
      });
      return script;
    }
  mostrarVariaveisWhile(objetoD) {
    let script = '';
    objetoD.forEach(objeto => {
      if (objeto.type === 1) {
        Object.keys(objeto).forEach(key => {
          if (key === 'data' && objeto[key] === true) {
            script = script + '$data' + ' ';
          }
          if (key === 'hour' && objeto[key] === true) {
            script = script + '$hour' + ' ';
          }
          if (key === 'memory_buffers' && objeto[key] === true) {
            script = script + '$memBuffers' + ' ';
          }
          if (key === 'memory_cache' && objeto[key] === true) {
            script = script + '$memCached' + ' ';
          }
          if (key === 'memory_free' && objeto[key] === true) {
            script = script + '$memFree' + ' ';
          }
          if (key === 'memory_shared' && objeto[key] === true) {
            script = script + '$memShared' + ' ';
          }
          if (key === 'memory_total' && objeto[key] === true) {
            script = script + '$memTotal' + ' ';
          }
          if (key === 'memory_used' && objeto[key] === true) {
            script = script + '$memUsed' + ' ';
          }
          if (key === 'swap_free' && objeto[key] === true) {
            script = script + '$swapFree' + ' ';
          }
          if (key === 'swap_total' && objeto[key] === true) {
            script = script + '$swapTotal' + ' ';
          }
          if (key === 'swap_used' && objeto[key] === true) {
            script = script + '$swapUsed' + ' ';
          }
          if (key === 'zombie_process_total' && objeto[key] === true) {
            script = script + '$numZumbis' + ' ';
          }
        });
      }
      if (objeto.type === 2) {
        Object.keys(objeto).forEach(key => {
          if (key === 'gnice' && objeto[key] === true) {
            script = script + '$CpuGnice' + ' ';
          }
          if (key === 'guest' && objeto[key] === true) {
            script = script + '$CpuGuest' + ' ';
          }
          if (key === 'idle' && objeto[key] === true) {
            script = script + '$CpuIdle' + ' ';
          }
          if (key === 'iowait' && objeto[key] === true) {
            script = script + '$CpuIOwait' + ' ';
          }
          if (key === 'irq' && objeto[key] === true) {
            script = script + '$CpuIrq' + ' ';
          }
          if (key === 'soft' && objeto[key] === true) {
            script = script + '$CpuSoft' + ' ';
          }
          if (key === 'steal' && objeto[key] === true) {
            script = script + '$CpuSteal' + ' ';
          }
          if (key === 'sys' && objeto[key] === true) {
            script = script + '$CpuSys' + ' ';
          }
          if (key === 'user' && objeto[key] === true) {
            script = script + '$CpuUser' + ' ';
          }
        });

      }
      if (objeto.type === 3) {
        Object.keys(objeto).forEach(key => {
          if (key === 'download_kb' && objeto[key] === true) {
            script = script + '$Eth0Download' + ' ';
            script = script + '$LocalDownload' + ' ';
            script = script + '$WifiDownload' + ' ';
          }
          if (key === 'download_packet' && objeto[key] === true) {
            script = script + '$Eth0DownPacket' + ' ';
            script = script + '$LocalDownPacket' + ' ';
            script = script + '$WifiDownPacket' + ' ';
          }
          if (key === 'upload_kb' && objeto[key] === true) {
            script = script + '$Eth0Upload' + ' ';
            script = script + '$LocalUpload' + ' ';
            script = script + '$WifiUpload' + ' ';

          }
          if (key === 'upload_packet' && objeto[key] === true) {
            script = script + '$Eth0UpPacket' + ' ';
            script = script + '$LocalUpPacket' + ' ';
            script = script + '$WifiUpPacket' + ' ';
          }
        });
      }
      if (objeto.type === 4) {
        Object.keys(objeto).forEach(key => {
          if (key === 'mem' && objeto[key] === true) {
            script = script + '$cpuProcess' + ' ';
          }
          if (key === 'cpu' && objeto[key] === true) {
            script = script + '$memProcess' + ' ';
          }
          if (key === 'virtmem' && objeto[key] === true) {
            script = script + '$virtmem' + ' ';
          }
          if (key === 'resmem' && objeto[key] === true) {
            script = script + '$resmem' + ' ';
          }
        });
      }
      if (objeto.type === 5) {
        Object.keys(objeto).forEach(key => {
          if (key === 'blocks' && objeto[key] === true) {
            script = script + '$DiskBlocks' + ' ';
          }
          if (key === 'free_kb' && objeto[key] === true) {
            script = script + '$DiskFreeKb' + ' ';
          }
          if (key === 'free_percent' && objeto[key] === true) {
            script = script + '$DiskFreePercent' + ' ';
          }
          if (key === 'total' && objeto[key] === true) {
            script = script + '$DiskAvail' + ' ';
          }
          if (key === 'used_kb' && objeto[key] === true) {
            script = script + '$DiskUsedkb' + ' ';
          }
          if (key === 'used_percent' && objeto[key] === true) {
            script = script + '$DiskUsedPercent' + ' ';
          }
        });
      }
    });
    return script;
  }
}
