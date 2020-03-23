import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from './updates/update.model';
import { Subscription } from 'rxjs';
import { UpdateService } from './updates/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updates: Update[] = [];
  private updateSub: Subscription;
  showAddUpdate = false;
  showUpdate = true;
  showUpdateBtn = true;
  showStore = false;
  down_time: string;

  constructor(public updateService: UpdateService) {}

ngOnInit() {
  this.down_time = this.downTime("2020/03/08", "01:25 PM");
  this.updateService.getUpdates();
  this.updateSub = this.updateService.getUpdateListener()
    .subscribe((updates: Update[]) => {
      this.updates = updates;
    });
}

ngOnDestroy() {
  this.updateSub.unsubscribe();
}

addUpdateToList(form: NgForm) {
  const newUpdate: Update = {
    date: form.value.new_date,
    time: form.value.new_time,
    message: form.value.new_text
  }
  this.updates.push(newUpdate);
}

newStore(){
  this.showStore = true;
}

callPrintRep() {
  alert("Printing Today's Report...");
};

callUpdateBtn(){
  this.showAddUpdate = true;
  this.showUpdateBtn = false;
  this.showUpdate = false;
};

callDeleteUp(){
  let cancel = confirm('Are you sure you want to cancel this update?');
  if (cancel) {
    this.showAddUpdate = false;
    this.showUpdateBtn = true;
  }
};

callDeleteStore() {
  let cancel = confirm('Are you sure you want to cancel this update?');
  if (cancel) {
    this.showStore = false;
  }
};

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
