import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-success-dialog',
  templateUrl: './delete-success-dialog.component.html',
  styleUrls: ['./delete-success-dialog.component.css']
})
export class DeleteSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

