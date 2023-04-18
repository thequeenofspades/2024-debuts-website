import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { AgeCategory, Author, AuthorLink, Genre, Season } from 'src/app/types';

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
      // Author details
      name: fb.control('', [Validators.required]),
      bio: '',
      rep: '',
      links: fb.array([]),
      // Book details
      title: fb.control('', [Validators.required]),
      publisher: fb.control('', [Validators.required]),
      ageCategory: fb.control(
        [],
        [Validators.minLength(1), Validators.required]
      ),
      genre: fb.control([], [Validators.minLength(1), Validators.required]),
      season: '',
      releaseDate: '',
      goodreadsUrl: '',
      preorderUrl: '',
    });

    if (!!this.data.author) {
      this.form.patchValue(this.data.author);
      this.data.author.links?.forEach((_) => this.addAuthorLink());
      this.links().patchValue(this.data.author.links ?? []);
    }

    this.mode = this.data.mode;
  }

  addAuthorLink(): void {
    this.links().push(this.fb.group({ name: '', url: '' }));
  }

  deleteAuthorLink(index: number): void {
    this.links().removeAt(index);
  }

  links(): FormArray {
    return this.form.get('links') as FormArray;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;

    let releaseDate: DateTime | string | null =
      this.form.get('releaseDate')?.value;
    if (releaseDate instanceof DateTime) {
      releaseDate = releaseDate.toISODate();
    }

    const formData = {
      ...this.form.value,
      releaseDate: releaseDate,
    };

    this.dialogRef.close(formData);
  }
}
