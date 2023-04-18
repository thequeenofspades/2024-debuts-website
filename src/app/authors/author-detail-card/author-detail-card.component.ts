import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AltTextDialogComponent } from 'src/app/shared/alt-text-dialog/alt-text-dialog.component';
import { Author } from 'src/app/types';

@Component({
  selector: 'app-author-detail-card',
  templateUrl: './author-detail-card.component.html',
  styleUrls: ['./author-detail-card.component.scss'],
})
export class AuthorDetailCardComponent {
  @Input() author?: Author;

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  getAgeCategories(): string {
    if (!this.author) return '';

    if (Array.isArray(this.author.ageCategory)) {
      return this.author.ageCategory.join(', ');
    } else {
      return this.author.ageCategory ?? '';
    }
  }

  getGenres(): string {
    if (!this.author) return '';

    if (Array.isArray(this.author.genre)) {
      return this.author.genre.join(', ');
    } else {
      return this.author.genre ?? '';
    }
  }

  releaseDateAvailable(): boolean {
    return (
      !!this.author &&
      (!!this.author.season || !!this.author.releaseDate?.toString())
    );
  }

  formatReleaseDate(): string {
    if (!this.author || (!this.author.season && !this.author.releaseDate))
      return '';

    if (this.author.releaseDate?.toString().length) {
      return this.author.releaseDate.toString();
    } else {
      return this.author.season!.concat(' 2024');
    }
  }

  // Appends 'http://' to the link if it isn't already there.
  fixLink(link: string): string {
    if (link.startsWith('http://') || link.startsWith('https://')) return link;
    return 'http://'.concat(link);
  }

  openAltTextDialog(altText?: string): void {
    this.dialog.open(AltTextDialogComponent, { data: altText, width: '400px' });
  }
}
