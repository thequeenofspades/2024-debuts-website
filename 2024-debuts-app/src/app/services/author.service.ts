import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import authors from '../authors.json';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor() {}

  getAuthorsForDisplay(): Observable<any[]> {
    // TODO (thequeenofspades): replace with DB call
    return of(authors);
  }
}
