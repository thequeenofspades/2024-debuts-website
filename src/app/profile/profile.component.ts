import { Component, OnInit, inject } from '@angular/core';
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
      .open(ProfileFormComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((data) => {
        this.authorService.createAuthor(data, this.user$).subscribe((_) => {
          this.author = data;
          this.authorLookupComplete = true;
        });
      });
  }
}
