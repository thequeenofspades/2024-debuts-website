import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';
import { AgeCategory, Author, Genre, Season } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  authors$: Observable<Author[]>;

  searchConfig?: any = {};
  showCovers: boolean = false;

  readonly ageCategories: string[] = Object.values(AgeCategory);
  readonly genres: string[] = Object.values(Genre);
  readonly seasons: string[] = Object.values(Season);

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {
    this.authors$ = this.authorService.getAuthorsForDisplay();
  }

  openAuthorDetailDialog(author: Author): void {
    this.dialog.open(AuthorDetailComponent, {
      data: author,
    });
  }
}
