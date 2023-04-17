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
  showCovers: boolean = false;

  readonly ageCategories: string[] = Object.values(AgeCategory);
  readonly genres: string[] = Object.values(Genre);

  readonly placeholderAuthorImageUrl: string =
    'https://helios-i.mashable.com/imagery/articles/01Fzl1MROydyq66J8rXDNzr/hero-image.fill.size_1200x1200.v1614267976.png';
  readonly placeholderBookCoverUrl: string =
    'https://m.media-amazon.com/images/I/51d9LaVcPWL._AC_UF1000,1000_QL80_.jpg';

  constructor(private authorService: AuthorService, private dialog: MatDialog) {
    this.authors$ = this.authorService.getAuthorsForDisplay();
  }

  openAuthorDetailDialog(author: Author): void {
    this.dialog.open(AuthorDetailComponent, {
      data: author,
    });
  }
}
