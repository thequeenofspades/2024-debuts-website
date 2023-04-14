import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth);

  constructor() { }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.currentUser) {
    return true;
  }
  return router.parseUrl('/login');
}
