import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number, doctorId: number }) { }

  onSend(): void {
    console.log( "patienttid ::" +this.data.patientId)
    console.log( "doctorid :::" + this.data.doctorId)

    this.dialogRef.close({ patientId: this.data.patientId, doctorId: this.data.doctorId, message: this.message });
    console.log("----:" + this.message)
  }
}

