import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';
import { AgeCategory, Author, Genre } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDetailComponent } from './author-detail/author-detail.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  authors$: Observable<Author[]>;

  searchConfig?: any = {};

  readonly ageCategories: string[] = Object.values(AgeCategory);
  readonly genres: string[] = Object.values(Genre);

  constructor(private authorService: AuthorService, private dialog: MatDialog) {
    this.authors$ = authorService.getAuthorsForDisplay();
  }

  openAuthorDetailDialog(author: Author): void {
    this.dialog.open(AuthorDetailComponent, {
      data: author
    });
  }
}