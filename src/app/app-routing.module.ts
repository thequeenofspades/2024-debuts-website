import { Injectable, NgModule, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  RouterModule,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';

import { AuthorsComponent } from './authors/authors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { Auth } from '@angular/fire/auth';
import { authGuard } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class DebutAppTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`2024 Debuts | ${title}`);
    }
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    title: 'Authors',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Create an Account',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'My Profile',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: DebutAppTitleStrategy }],
})
export class AppRoutingModule {}
