import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, filter, from, map, of, take } from 'rxjs';

import authors from '../authors.json';
import { Author } from '../types';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';

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

  createAuthor(
    author: Author,
    user$: Observable<User | null>
  ): Observable<void> {
    return user$.pipe(
      filter((user) => !!user),
      take(1),
      concatMap((user) =>
        from(
          setDoc(doc(this.db, 'authors', user!.uid), {
            ...author,
            created: serverTimestamp(),
          })
        )
      )
    );
  }

  getAuthorDetailsForUser(
    user$: Observable<User | null>
  ): Observable<Author | null> {
    return user$.pipe(
      filter((user) => !!user),
      take(1),
      concatMap((user) => {
        return from(getDoc(doc(this.db, 'authors', user!.uid)));
      }),
      map((doc) => {
        const data = doc.data();
        return data ? (data as Author) : null;
      })
    );
  }

  updateAuthor(
    author: Author,
    user$: Observable<User | null>
  ): Observable<void> {
    return user$.pipe(
      filter((user) => !!user),
      take(1),
      concatMap((user) =>
        from(
          updateDoc(doc(this.db, 'authors', user!.uid), {
            ...author,
            updated: serverTimestamp(),
          })
        )
      )
    );
  }
}
