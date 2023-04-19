import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './shared/filter.pipe';
import { MaterialModule } from './shared/material.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile/profile-form/profile-form.component';
import { AuthorDetailCardComponent } from './authors/author-detail-card/author-detail-card.component';
import { DeleteProfileDialogComponent } from './profile/delete-profile-dialog/delete-profile-dialog.component';
import { UploadPhotoDialogComponent } from './profile/upload-photo-dialog/upload-photo-dialog.component';
import { AccountRecoveryDialogComponent } from './login/account-recovery-dialog/account-recovery-dialog.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { AuthorPreviewCardComponent } from './authors/author-preview-card/author-preview-card.component';
import { SortAuthorsPipe } from './shared/sort-authors.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    AuthorsComponent,
    FilterPipe,
    SortAuthorsPipe,
    AuthorDetailComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProfileFormComponent,
    AuthorDetailCardComponent,
    DeleteProfileDialogComponent,
    UploadPhotoDialogComponent,
    AccountRecoveryDialogComponent,
    BottomBarComponent,
    AuthorPreviewCardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
