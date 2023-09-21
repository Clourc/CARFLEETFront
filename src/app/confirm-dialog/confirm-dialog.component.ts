import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {

constructor(
  public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {message : string}
){}

onNoClick():void{
  this.dialogRef.close(false);//Ferme la boite de dialogue avec la réponse "Non"
}
yesClick():void{
  this.dialogRef.close(true);//Ferme la boite de dialogue avec la réponse "oui"
}
}
