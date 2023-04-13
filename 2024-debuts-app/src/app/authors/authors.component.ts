import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';
import { AgeCategory, Author, Genre } from '../types';

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

  constructor(private authorService: AuthorService) {
    this.authors$ = authorService.getAuthorsForDisplay();
    this.authors$.subscribe(result => console.log(result));
  }
}
