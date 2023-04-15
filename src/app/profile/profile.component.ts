import { Component, OnInit, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import {
  Mode,
  ProfileFormComponent,
} from './profile-form/profile-form.component';
import { take } from 'rxjs';
import { AuthorService } from '../services/author.service';
import { Author } from '../types';
import { DeleteProfileDialogComponent } from './delete-profile-dialog/delete-profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  author?: Author;
  authorLookupComplete: boolean = false;

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authorService
      .getAuthorDetailsForUser(this.user$)
      .pipe(take(1))
      .subscribe((author) => {
        this.authorLookupComplete = true;
        if (!!author) {
          this.author = author;
        }
      });
  }

  openNewProfileDialog(): void {
    this.dialog
      .open(ProfileFormComponent, { data: { mode: Mode.CREATE } })
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        if (!data) return;
        this.authorService.createAuthor(data, this.user$).subscribe((_) => {
          this.author = data;
          this.authorLookupComplete = true;
        });
      });
  }

  openUpdateProfileDialog(): void {
    this.dialog
      .open(ProfileFormComponent, {
        data: { author: this.author, mode: Mode.UPDATE },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        if (!data) return;
        this.authorService.updateAuthor(data, this.user$).subscribe((_) => {
          this.author = data;
        });
      });
  }

  openDeleteProfileDialog(): void {
    this.dialog
      .open(DeleteProfileDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.authorService.deleteAuthor(this.user$).subscribe((_) => {
            this.author = undefined;
          });
        }
      });
  }
}
