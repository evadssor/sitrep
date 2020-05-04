import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material'
import { Store } from 'app/stores/store.model';

@Component({
  selector: 'app-resolve-store',
  templateUrl: './resolve-store.component.html',
  styleUrls: ['./resolve-store.component.css']
})
export class ResolveStoreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Store,
    public dialogRef: MatDialogRef<ResolveStoreComponent>) { }

  ngOnInit() {
  }

  onConfirmClick(endDate: string, endTime: string): void {
    const resolvedObject = {
      resolved: true,
      endDate: endDate,
      endTime: endTime
    }
    this.dialogRef.close(resolvedObject);
  }

  onCancelClick(): void {
    const resolvedObject = {
    resolved: false,
    endDate: '',
    endTime: ''
  }
    this.dialogRef.close(resolvedObject);
  }
}
