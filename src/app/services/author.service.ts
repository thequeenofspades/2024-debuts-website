import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import authors from '../authors.json';
import { Author } from '../types';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

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
}
