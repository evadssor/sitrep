import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from './updates/update.model';
import { Subscription } from 'rxjs';
import { UpdateService } from './updates/update.service';
import { StoreService } from './stores/store.service';
import { Store } from './stores/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updates: Update[] = [];
  stores: Store[] = [];
  private updateSub: Subscription;
  private storeSub: Subscription;
  showAddUpdate = false;
  showUpdate = true;
  showUpdateBtn = true;
  showStore = false;
  down_time: string;

  constructor(
    public updateService: UpdateService,
    public storeService: StoreService
  ) { }

  ngOnInit() {
    this.down_time = this.downTime("2020/03/08", "01:25 PM");
    // this.updateService.getUpdates();
    // this.updateSub = this.updateService.getUpdateListener()
    //   .subscribe((updates: Update[]) => {
    //     this.updates = updates;
    //   });

    this.storeService.getStores();
    this.storeSub = this.storeService.getStoreListener()
      .subscribe((stores: Store[]) => {
        this.stores = stores;
        console.log('Store: ', this.stores);
      });
  }

  ngOnDestroy() {
    this.updateSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  addUpdateToList(form: NgForm) {
    const newUpdate: Update = {
      date: form.value.new_date,
      time: form.value.new_time,
      message: form.value.new_text
    }
    this.updates.push(newUpdate);
  }

  callPrintRep() {
    alert("Printing Today's Report...");
  };

  callUpdateBtn() {
    this.showAddUpdate = true;
    this.showUpdateBtn = false;
    this.showUpdate = false;
  };

  callDeleteUp() {
    let cancel = confirm('Are you sure you want to cancel this update?');
    if (cancel) {
      this.showAddUpdate = false;
      this.showUpdateBtn = true;
    }
  };

  callDeleteStore(storeId: string) {
      this.storeService.deleteStore(storeId);
  };


  newStore() {
    this.showStore = true;
  }

  saveStore(form: NgForm) {
    const newStore = {
      storeNumber: form.value.new_storeNum,
      issue: form.value.issue_type,
      bmcTicket: form.value.bmc_Num,
      serviceTicket: form.value.vend_Num,
      serverType: form.value.server,
      serverModel: form.value.model_num,
      commType: form.value.type_num,
      provider: form.value.provider,
      updates: [{
        storeId: form.value.new_storeNum,
        date: form.value.new_date,
        time: form.value.new_time,
        message: form.value.new_text
      }]
    }
    this.storeService.addStore(newStore);
    this.showStore = false;
  }

  callCancelStore() {
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
