import { CPU, DISK, NETWORK } from './../../interfaces/scripts-local.interface';
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
          { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }
          ),
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
      { head: 'Computer', key: '1', img: '../../assets/computer.png', type: 1 },
      { head: 'CPU', key: '2', img: '../../assets/cpu.png', type: 2 },
      { head: 'Network', key: '3', img: '../../assets/rede.png', type: 3 },
      { head: 'Process', key: '4', img: '../../assets/processo.png', type: 4 },
      { head: 'HD', key: '5', img: '../../assets/hdd.png', type: 5 }
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
    this.objetosDiagrama = null;
    this.script = null;
  }
  run() {
    console.log(this.objetosDiagrama);
    const dialogRef = this.dialog.open(RunDialogComponent, { width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.script = this.montagemScript();
        // this.script = `
        // #!/bin/bash <br>
        // # Monitoramento local.<br>
        // # Tempo, CPU, Memória, Disco, Rede LAN, Rede Wi-Fi, Processos Zumbis. <br>

        // # Pré-requisitos básicos: date, mpstat, free, df, cat, ps aux.<br>
        // # Pré-requisitos auxiliares: echo, awk, cut, gawk, grep, head, sleep, wc.<br>

        // # Pré-requisito de execução: chmod +x monitoramento-local.sh (torna o arquivo executável)<br>
        // # Execução: ./monitoramento-local.sh
        // <br>
        // <br>
        // echo Data Hour CpuUser CpuNice CpuSys CpuIOwait CpuIrq CpuSoft
        // CpuSteal CpuGuest CpuGnice CpuIdle MemTotal MemUsed MemFree MemShared MemBuffers
        // MemCached SwapTotal SwapUsed SwapFree DiskBlocks DiskUsedkb DiskAvail DiskUsedPercent
        // Eth0Download Eth0Upload Eth0DownPacket Eth0UpPacket LocalDownload LocalUpload LocalDownPacket
        // LocalUpPacket WifiDownload WifiUpload WifiDownPacket WifiUpPacket NumZumbis > log.txt
        // <br>
        // <br>
        // echo Monitoring...
        // <br>
        // ${result.timer ? 'cont = 1; <br>' : ''}
        // while [${result.timer ? '$cont -le ' + result.seconds : ' True '}]
        // <br>
        // do
        // <br>
        // <br>
        // echo $data $hora $cpuuser $cpunice $cpusys $cpuiowait $cpuirq $cpusoft $cpusteal $cpuguest $cpugnice $cpuidle $memtotal $memused
        // $memfree $memshared $membuffers $memcached $swaptotal $swapused $swapfree $diskblocks $diskusedkb $diskavail $diskusedpercent
        // $eth0download $eth0upload $eth0downpacket $eth0uppacket $localdownload $localupload $localdownpacket $localuppacket
        // $wifidownload
        // $wifiupload $wifidownpacket $wifiuppacket $numzumbis >> log.txt
        // <br>
        // <br>
        // ${result.timer ? 'cont =`expr $cont + 1`<br>' : ''}
        // sleep ${result.frequency ? result.frequency : '1'}
        // <br>
        // done
        // `;
      }
    });
  }
  montagemScript() {
    let script = '';
    this.objetosDiagrama.forEach(objeto => {
      if (objeto.type === 1) {

      }
      if (objeto.type === 2) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 2) {
            script = script += '<br>';
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

      }
      if (objeto.type === 4) {

      }
      if (objeto.type === 5) {
        Object.keys(objeto).forEach(key => {
          if (key === 'type' && objeto[key] === 5) {
            script = script += '<br>';
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
}
