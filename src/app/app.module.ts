import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DiagramaComponent } from './components/diagrama/diagrama.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, MatIconModule, MatToolbarModule, MatCardModule,
  MatDialogModule, MatButtonModule, MatButtonToggleModule, MatListModule,
   MatMenuModule, MatSidenavModule, MatTableModule, MatTabsModule, MatInputModule,
    MatRadioModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfigDialogComponent } from './components/config-dialog/config-dialog.component';
import { ImportTemplateDialogComponent } from './components/import-template-dialog/import-template-dialog.component';
import { ExportTemplateDialogComponent } from './components/export-template-dialog/export-template-dialog.component';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { RunDialogComponent } from './components/run-dialog/run-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DiagramaComponent,
    ConfigDialogComponent,
    ImportTemplateDialogComponent,
    ExportTemplateDialogComponent,
    RunDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    CKEditorModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfigDialogComponent, ImportTemplateDialogComponent, ExportTemplateDialogComponent, RunDialogComponent]
})
export class AppModule { }
