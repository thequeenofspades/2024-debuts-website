import { Component, inject, OnDestroy } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountRecoveryDialogComponent } from './account-recovery-dialog/account-recovery-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  authState$: Observable<User | null> = authState(this.auth);
  error?: string;
  form: FormGroup;
  submitting: boolean = false;

  readonly destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.authState$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.router.navigate(['/profile']);
      }
    });
    this.form = fb.group({
      email: fb.control('', [Validators.email, Validators.required]),
      password: fb.control('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    this.authService
      .login(this.form.get('email')!.value, this.form.get('password')!.value)
      .subscribe(
        (userCred) => {
          console.log(userCred);
          this.submitting = false;
        },
        (error) => {
          if (error.code === 'auth/wrong-password') {
            this.error = 'Hmm, that password seems wrong.';
          } else if (error.code === 'auth/user-not-found') {
            this.error = 'Hmm, that user does not exist.';
          } else {
            this.error = error;
          }
          this.submitting = false;
        }
      );
  }

  openAccountRecoveryDialog(): void {
    this.dialog.open(AccountRecoveryDialogComponent);
  }
}
