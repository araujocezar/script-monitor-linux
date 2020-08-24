import { ExportTemplateDialogComponent } from './../export-template-dialog/export-template-dialog.component';
import { ImportTemplateDialogComponent } from './../import-template-dialog/import-template-dialog.component';
import { ConfigDialogComponent } from './../config-dialog/config-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import { MatDialog } from '@angular/material';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html',
  styleUrls: ['./diagrama.component.scss']
})
export class DiagramaComponent implements OnInit, AfterViewInit {

  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;

  public diagrama: go.Diagram = null;
  public paleta: go.Palette = null;
  JSONExport: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.diagrama = $(go.Diagram, 'divDiagrama',
      {
        LinkDrawn: maybeChangeLinkCategory,     // these two DiagramEvents call a
        LinkRelinked: maybeChangeLinkCategory,  // function that is defined below
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
      { head: 'Computer', key: 'Computador', img: '../../assets/computer.png', type: 1 },
      { head: 'CPU', key: 'Cpu', img: '../../assets/cpu.png', type: 2 },
      { head: 'Network', key: 'Rede', img: '../../assets/rede.png', type: 3 },
      { head: 'Process', key: 'Processos', img: '../../assets/processo.png', type: 4 },
      { head: 'HD', key: 'Disco rígido', img: '../../assets/hdd.png', type: 5 }
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
      this.dialog.open(ConfigDialogComponent, { width: '600px', data: node });
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
}
