import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-recovery-dialog',
  templateUrl: './account-recovery-dialog.component.html',
  styleUrls: ['./account-recovery-dialog.component.scss'],
})
export class AccountRecoveryDialogComponent {
  email: FormControl;
  error: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AccountRecoveryDialogComponent>,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.email = fb.control('', [Validators.email, Validators.required]);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.email.invalid) return;
    this.authService
      .resetPassword(this.email.value)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.error = '';
          this.snackbar.open(
            'OK, sent you an email with a link to reset your password!',
            undefined,
            {
              duration: 5000,
            }
          );
          this.dialogRef.close();
        },
        (error) => {
          if (error.code === 'auth/user-not-found') {
            this.error = 'Hmm, that user does not exist.';
          } else {
            this.error = error;
          }
        }
      );
  }
}
