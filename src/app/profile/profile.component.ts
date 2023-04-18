import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import {
  Mode,
  ProfileFormComponent,
} from './profile-form/profile-form.component';
import { Subject, concatMap, take, takeUntil } from 'rxjs';
import { AuthorService } from '../services/author.service';
import { Author } from '../types';
import { DeleteProfileDialogComponent } from './delete-profile-dialog/delete-profile-dialog.component';
import { Router } from '@angular/router';
import { UploadPhotoDialogComponent } from './upload-photo-dialog/upload-photo-dialog.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  author?: Author;
  authorLookupComplete: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getAuthor();
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAuthor(): void {
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
          this.getAuthor();
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

  openAuthorPhotoDialog(): void {
    this.dialog
      .open(UploadPhotoDialogComponent, { width: '400px' })
      .afterClosed()
      .pipe(take(1))
      .subscribe((data: { image: File; altText: string }) => {
        if (data) {
          this.user$.pipe(take(1)).subscribe((user) => {
            if (user && this.author) {
              this.storageService
                .uploadAuthorPhoto(data.image, user.uid)
                .pipe(
                  concatMap((imageUrl) =>
                    this.authorService.updateAuthor(
                      {
                        ...this.author!,
                        authorPhotoUrl: imageUrl,
                        authorPhotoAltText: data.altText,
                      },
                      this.user$
                    )
                  )
                )
                .subscribe((_) => {
                  this.getAuthor();
                });
            }
          });
        }
      });
  }

  openBookCoverDialog(): void {
    this.dialog
      .open(UploadPhotoDialogComponent, { width: '400px' })
      .afterClosed()
      .pipe(take(1))
      .subscribe((data: { image: File; altText: string }) => {
        if (data) {
          this.user$.pipe(take(1)).subscribe((user) => {
            if (user && this.author) {
              this.storageService
                .uploadBookCover(data.image, user.uid)
                .pipe(
                  concatMap((imageUrl) =>
                    this.authorService.updateAuthor(
                      {
                        ...this.author!,
                        bookCoverUrl: imageUrl,
                        bookCoverAltText: data.altText,
                      },
                      this.user$
                    )
                  )
                )
                .subscribe((_) => {
                  this.getAuthor();
                });
            }
          });
        }
      });
  }
}
