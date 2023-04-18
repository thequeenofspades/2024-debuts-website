import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltTextDialogComponent } from './alt-text-dialog.component';

describe('AltTextDialogComponent', () => {
  let component: AltTextDialogComponent;
  let fixture: ComponentFixture<AltTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltTextDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
