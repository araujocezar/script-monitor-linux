import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

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
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.diagrama = $(go.Diagram, 'divDiagrama');

    this.diagrama.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape,
          { fill: 'white' },
          new go.Binding('fill', 'color'),
          { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }),
        $(go.TextBlock, { margin: 5 },
          new go.Binding('text', 'key'))
      );

    // this.diagrama.nodeTemplate =
    //   $(go.Node, 'Vertical',
    //     $(go.TextBlock,
    //       {
    //         margin: new go.Margin(3, 0, 0, 0),
    //         maxSize: new go.Size(100, 30),
    //         isMultiline: false,
    //         font: 'bold 10pt sans-serif'
    //       },
    //       new go.Binding('text', 'head')),
    //     $(go.Picture,
    //       { maxSize: new go.Size(50, 50) },
    //       new go.Binding('source', 'img')),
    //       { portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer' }),
    //     $(go.TextBlock,
    //       {
    //         margin: new go.Margin(3, 0, 0, 0),
    //         maxSize: new go.Size(100, 30),
    //         isMultiline: true
    //       },
    //       new go.Binding('text', 'text'));

    this.diagrama.undoManager.isEnabled = true;

    // create the Palette
    const myPalette =
      $(go.Palette, 'divPallet');

    // the Palette's node template is different from the main Diagram's
    myPalette.nodeTemplate =
      $(go.Node, 'Vertical',
        { locationSpot: go.Spot.Center },
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
      { head: 'Computador', key: 'Computador', img: '../../assets/computer.png' },
      { head: 'CPU', key: 'Cpu', img: '../../assets/cpu.png' },
      { head: 'Rede', key: 'Rede', img: '../../assets/rede.png' },
      { head: 'Processos', key: 'Processos', img: '../../assets/processo.png' },
      { head: 'HD', key: 'Disco rígido', img: '../../assets/hdd.png' }
    ];


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
  }

}
