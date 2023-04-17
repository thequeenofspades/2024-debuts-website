import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Observable, concatMap, filter, from, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  getAuthorPhotoUrl(uid: string): Observable<string> {
    return from(
      getDownloadURL(
        ref(this.storage, 'author_photos/'.concat(uid).concat('.jpg'))
      )
    );
  }

  getBookCoverUrl(uid: string): Observable<string> {
    return from(
      getDownloadURL(
        ref(this.storage, 'book_covers/'.concat(uid).concat('.jpg'))
      )
    );
  }

  getPlaceholderAuthorPhotoUrl(): string {
    return 'assets/jpg/placeholder_author_photo.jpg';
  }

  getPlaceholderBookCoverUrl(): string {
    return 'assets/jpg/placeholder_book_cover.jpg';
  }
}
