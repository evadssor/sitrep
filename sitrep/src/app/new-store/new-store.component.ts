import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material'
import { NgForm } from '@angular/forms';

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

  onConfirmClick(form: NgForm): void {
    const newStore = {
      storeNumber: form.value.new_storeNum,
      issue: form.value.issue_type,
      bmcTicket: form.value.bmc_Num,
      serviceTicket: form.value.vend_Num,
      serverType: form.value.server,
      serverModel: form.value.model_num,
      commType: form.value.type_num,
      provider: form.value.provider,
      hardware: form.value.hardware,
      startDate: form.value.new_date,
      startTime: form.value.new_time,
      downTime: this.downTime(form.value.new_date, form.value.new_time),
      resolved: false,
      show: true,
      updates: [{
        storeNumber: form.value.new_storeNum,
        date: form.value.new_date,
        time: form.value.new_time,
        message: form.value.new_text
      }],
    }
    this.dialogRef.close(newStore);
  }

  onCancelClick(): void {
    const resolvedObject = {
    resolved: false,
    endDate: '',
    endTime: ''
  }
    this.dialogRef.close(resolvedObject);
  }

  downTime(d, t) {//take in date and time from inputs
    var date_time = (d.toString() + " " + t.toString());//Combine incoming date and time strings
    var start_milli = Date.parse(date_time); //parse date_time string to milliseconds
    var current_milli = new Date().getTime(); //get current time in milliseconds

    var down_hours = (current_milli - start_milli) / 1000 / 60 / 60;//divide milliseconds into hours 
    var setHours = Math.floor(down_hours);//Cut off decimal after hour

    var down_minutes = (down_hours - setHours) * 60;//Calculate Minutes
    var setMinutes = Math.floor(down_minutes);//Cut off decimal after minute
    var m = setMinutes > 9 ? setMinutes : '0' + setMinutes;//Add a leading 0 if minutes are less than 10

    return (setHours + "hrs " + m + "min");
  }

}
