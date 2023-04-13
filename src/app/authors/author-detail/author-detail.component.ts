import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/types';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public author: Author,
    private dialogRef: MatDialogRef<AuthorDetailComponent>
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAgeCategories(): string {
    if (Array.isArray(this.author.ageCategory)) {
      return this.author.ageCategory.join(', ');
    } else {
      return this.author.ageCategory ?? '';
    }
  }

  getGenres(): string {
    if (Array.isArray(this.author.genre)) {
      return this.author.genre.join(', ');
    } else {
      return this.author.genre ?? '';
    }
  }
}
