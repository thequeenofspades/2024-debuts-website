import { Component, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { take } from 'rxjs';
import { AuthorService } from '../services/author.service';
import { Author } from '../types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  author?: Author;

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
  ) {}

  openNewProfileDialog(): void {
    this.dialog
      .open(ProfileFormComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        this.authorService
          .createAuthor(data)
          .subscribe((author) => (this.author = author));
      });
  }
}
