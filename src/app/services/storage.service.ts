import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { concatMap, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

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
