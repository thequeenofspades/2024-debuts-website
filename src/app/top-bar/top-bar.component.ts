import { Component, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  auth: Auth = inject(Auth);
  authState$: Observable<User | null> = authState(this.auth);

  constructor(private authService: AuthService, private router: Router) {}

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.authService.logout().pipe(take(1)).subscribe();
  }
}
