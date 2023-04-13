import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  authors$: Observable<any[]>;
  authorName?: string;
  bookTitle?: string;
  searchConfig?: any = {
    authorName: '',
    bookTitle: '',
  };

  constructor(private authorService: AuthorService) {
    this.authors$ = authorService.getAuthorsForDisplay();
  }
}
