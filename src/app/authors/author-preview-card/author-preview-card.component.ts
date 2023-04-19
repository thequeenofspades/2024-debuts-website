import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Author } from 'src/app/types';

import { AuthorDetailComponent } from '../author-detail/author-detail.component';

@Component({
  selector: 'app-author-preview-card',
  templateUrl: './author-preview-card.component.html',
  styleUrls: ['./author-preview-card.component.scss'],
})
export class AuthorPreviewCardComponent {
  @Input() author!: Author;
  @Input() showCovers: boolean = false;

  constructor(private dialog: MatDialog) {}

  openAuthorDetailDialog(author: Author): void {
    this.dialog.open(AuthorDetailComponent, {
      data: author,
    });
  }
}
