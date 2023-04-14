import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, from, map, of, take } from 'rxjs';

import authors from '../authors.json';
import { Author } from '../types';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  db: Firestore = inject(Firestore);

  constructor() {}

  getAuthorsForDisplay(): Observable<Author[]> {
    // TODO (thequeenofspades): replace with DB call
    const authorCollection = collection(this.db, 'authors');
    return collectionData(authorCollection) as Observable<Author[]>;
  }

  createAuthor(author: Author): Observable<Author> {
    return from(addDoc(collection(this.db, 'authors'), author)).pipe(
      take(1),
      concatMap((docRef) => {
        return getDoc(docRef);
      }),
      map((doc) => {
        return doc.data() as Author;
      })
    );
  }
}
