import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';
import { AgeCategory, Author, Genre, Season } from '../types';

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

  constructor(private authorService: AuthorService) {
    this.authors$ = this.authorService.getAuthorsForDisplay();
  }
}
