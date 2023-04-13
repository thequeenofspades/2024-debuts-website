import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import authors from '../authors.json';
import { Author } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor() {}

  getAuthorsForDisplay(): Observable<Author[]> {
    // TODO (thequeenofspades): replace with DB call
    return of(JSON.parse(JSON.stringify(authors)));
  }
}
