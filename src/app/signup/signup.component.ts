import { Component, inject, OnDestroy } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  authState$: Observable<User | null> = authState(this.auth);
  error?: string;
  form: FormGroup;
  submitting: boolean = false;

  readonly destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group(
      {
        email: fb.control('', [Validators.email, Validators.required]),
        password1: fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        password2: fb.control('', Validators.required),
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private passwordMatchValidator(form: AbstractControl) {
    if (form.get('password1')!.value !== form.get('password2')!.value) {
      form.get('password2')?.setErrors({ mismatch: true });
    }
  }

  signup(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    this.authService
      .register(
        this.form.get('email')!.value,
        this.form.get('password1')!.value
      )
      .subscribe(
        (userCred) => {
          console.log(userCred);
          this.submitting = false;
        },
        (error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.error = 'That email address is already in use.';
          } else {
            this.error = error;
          }
          this.submitting = false;
        }
      );
  }
}
