import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/types';

@Component({
  selector: 'app-author-detail-card',
  templateUrl: './author-detail-card.component.html',
  styleUrls: ['./author-detail-card.component.scss'],
})
export class AuthorDetailCardComponent {
  @Input() author?: Author;

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
}
