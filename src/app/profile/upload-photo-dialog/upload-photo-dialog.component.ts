import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-photo-dialog',
  templateUrl: './upload-photo-dialog.component.html',
  styleUrls: ['./upload-photo-dialog.component.scss'],
})
export class UploadPhotoDialogComponent {
  altText: string = '';
  error?: string;
  file?: File;
  preview: any;
  success: boolean = false;

  readonly MAX_FILE_SIZE = 100000;

  constructor(private dialogRef: MatDialogRef<UploadPhotoDialogComponent>) {}

  selectFile(event: any): void {
    if (!event.target.files || !event.target.files.length) return;
    this.success = false;

    const file: File = event.target.files[0];
    console.log(file.size);

    if (file.size > this.MAX_FILE_SIZE) {
      this.error = 'File must be 100 KB or smaller in size.';
      this.preview = '';
      return;
    }

    const reader = new FileReader();

    reader.onerror = (event) => console.log(event);
    reader.onload = (event) => {
      this.error = '';
      this.file = file;
      this.preview = event.target?.result;
      this.success = true;
    };

    reader.readAsDataURL(file);
  }

  save(): void {
    this.dialogRef.close({ image: this.file, altText: this.altText });
  }
}
