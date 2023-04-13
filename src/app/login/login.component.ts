import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  error?: string;
  form: FormGroup;
  submitting: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('', [Validators.email, Validators.required]),
      password: fb.control('', Validators.required),
    });
  }

  login(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    this.authService.login(
      this.form.get('email')!.value,
      this.form.get('password')!.value
    ).subscribe(userCred => {
      console.log(userCred);
      this.submitting = false;
    }, error => {
      if (error.code === 'auth/wrong-password') {
        this.error = 'Hmm, that password seems wrong.';
      } else if (error.code === 'auth/user-not-found') {
        this.error = 'Hmm, that user does not exist.';
      } else {
        this.error = error;
      }
      this.submitting = false;
    });
  }
}
