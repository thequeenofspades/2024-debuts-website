import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryDialogComponent } from './account-recovery-dialog.component';

describe('AccountRecoveryDialogComponent', () => {
  let component: AccountRecoveryDialogComponent;
  let fixture: ComponentFixture<AccountRecoveryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRecoveryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRecoveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
