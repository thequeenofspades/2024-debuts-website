import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable, concatMap, filter, from, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  getPlaceholderAuthorPhotoUrl(): string {
    return 'assets/jpg/placeholder_author_photo.jpg';
  }

  getPlaceholderBookCoverUrl(): string {
    return 'assets/jpg/placeholder_book_cover.jpg';
  }

  /** Uploads an author photo and returns the URL pointing to the resource. */
  uploadAuthorPhoto(file: File, uid: string): Observable<string> {
    const storageRef = ref(this.storage, 'author_photos/'.concat(uid));
    return from(uploadBytes(storageRef, file)).pipe(
      concatMap((uploadResult) => {
        return from(getDownloadURL(uploadResult.ref));
      })
    );
  }

  /** Uploads a book cover and returns the URL pointing to the resource. */
  uploadBookCover(file: File, uid: string): Observable<string> {
    const storageRef = ref(this.storage, 'book_covers/'.concat(uid));
    return from(uploadBytes(storageRef, file)).pipe(
      concatMap((uploadResult) => {
        return from(getDownloadURL(uploadResult.ref));
      })
    );
  }
}
