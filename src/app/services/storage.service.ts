import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  updateMetadata,
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
        // Create file metadata to update
        const newMetadata = {
          cacheControl: 'public,max-age=300',
        };
        return from(updateMetadata(uploadResult.ref, newMetadata));
      }),
      concatMap((fullMetadata) => {
        return from(getDownloadURL(fullMetadata.ref!));
      })
    );
  }

  /** Uploads a book cover and returns the URL pointing to the resource. */
  uploadBookCover(file: File, uid: string): Observable<string> {
    const storageRef = ref(this.storage, 'book_covers/'.concat(uid));
    return from(uploadBytes(storageRef, file)).pipe(
      concatMap((uploadResult) => {
        // Create file metadata to update
        const newMetadata = {
          cacheControl: 'public,max-age=300',
        };
        return from(updateMetadata(uploadResult.ref, newMetadata));
      }),
      concatMap((fullMetadata) => {
        return from(getDownloadURL(fullMetadata.ref!));
      })
    );
  }
}
