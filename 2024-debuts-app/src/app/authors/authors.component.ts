import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';
import { Author } from '../types';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  authors$: Observable<Author[]>;
  authorName?: string;
  bookTitle?: string;
  searchConfig?: any = {
    authorName: '',
    bookTitle: '',
  };

  constructor(private authorService: AuthorService) {
    this.authors$ = authorService.getAuthorsForDisplay();
    this.authors$.subscribe(result => console.log(result));
  }
}
