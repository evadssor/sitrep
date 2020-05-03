import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resolve-store',
  templateUrl: './resolve-store.component.html',
  styleUrls: ['./resolve-store.component.css']
})
export class ResolveStoreComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ResolveStoreComponent>) { }

  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
