import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from 'app/stores/store.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public store: Store,
    public dialogRef: MatDialogRef<EditStoreComponent>
  ) { }

  ngOnInit() {
  }


  downTime(d, t) {
    // take in date and time from inputs
    const date_time = (d.toString() + ' ' + t.toString()); // Combine incoming date and time strings
    const start_milli = Date.parse(date_time); // parse date_time string to milliseconds
    const current_milli = new Date().getTime(); // get current time in milliseconds

    const  down_hours = (current_milli - start_milli) / 1000 / 60 / 60; // divide milliseconds into hours
    const setHours = Math.floor(down_hours); // Cut off decimal after hour

    const down_minutes = (down_hours - setHours) * 60; // Calculate Minutes
    const setMinutes = Math.floor(down_minutes); // Cut off decimal after minute
    const m = setMinutes > 9 ? setMinutes : '0' + setMinutes; // Add a leading 0 if minutes are less than 10

    return (setHours + 'hrs ' + m + 'min');
  }

  finalDownTime(d1, t1, d2, t2) {
    const date_time1 = (d1.toString() + ' ' + t1.toString());
    const date_time2 = (d2.toString() + ' ' + t2.toString());

    const start_milli = Date.parse(date_time1);
    const end_milli = Date.parse(date_time2);

    const down_hours = (end_milli - start_milli) / 1000 / 60 / 60;
    const setHours = Math.floor(down_hours);

    const down_minutes = (down_hours - setHours) * 60;
    const setMinutes = Math.floor(down_minutes);
    const m = setMinutes > 9 ? setMinutes : '0' + setMinutes;

    return (setHours + 'hrs ' + m + 'min');
  }

  
  checkResolved(status) {
    if (status === true) {
      return 'CLOSED';
    } else {
      return 'OPEN';
    }
  }

}
