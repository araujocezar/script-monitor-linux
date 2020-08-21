import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTemplateDialogComponent } from './import-template-dialog.component';

describe('ImportTemplateDialogComponent', () => {
  let component: ImportTemplateDialogComponent;
  let fixture: ComponentFixture<ImportTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTemplateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
