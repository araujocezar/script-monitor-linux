import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTemplateDialogComponent } from './export-template-dialog.component';

describe('ExportTemplateDialogComponent', () => {
  let component: ExportTemplateDialogComponent;
  let fixture: ComponentFixture<ExportTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportTemplateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
