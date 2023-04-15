import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgeCategory, Author, Genre, Season } from 'src/app/types';

export enum Mode {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  form: FormGroup;
  mode: Mode;

  ageCategories: string[] = Object.values(AgeCategory);
  genres: string[] = Object.values(Genre);
  seasons: string[] = Object.values(Season);

  // Starting date for release datepicker (Jan 1st 2024).
  startDate: Date = new Date(2024, 0, 1);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { author?: Author; mode: Mode },
    private dialogRef: MatDialogRef<ProfileFormComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: fb.control('', [Validators.required]),
      title: fb.control('', [Validators.required]),
      publisher: fb.control('', [Validators.required]),
      ageCategory: fb.control(
        [],
        [Validators.minLength(1), Validators.required]
      ),
      genre: fb.control([], [Validators.minLength(1), Validators.required]),
      season: fb.control(''),
      releaseDate: fb.control(''),
    });

    if (!!this.data.author) {
      this.form.patchValue(this.data.author);
    }

    this.mode = this.data.mode;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;

    this.dialogRef.close(this.form.value);
  }
}
