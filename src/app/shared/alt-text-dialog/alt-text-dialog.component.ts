import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alt-text-dialog',
  templateUrl: './alt-text-dialog.component.html',
  styleUrls: ['./alt-text-dialog.component.scss'],
})
export class AltTextDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public altText: string) {}
}
