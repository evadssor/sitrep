import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['../app.component.css']
})
export class NewStoreComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewStoreComponent>
  ) { }

  ngOnInit() {
  }

}
