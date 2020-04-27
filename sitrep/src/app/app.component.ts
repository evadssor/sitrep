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
  showAddUpdate = '';
  showUpdateBtn = '';
  showStore = false;
  showRestore = false;
  down_time: string;
  hoverOver = '';

  constructor(
    public updateService: UpdateService,
    public storeService: StoreService
  ) { }

  async ngOnInit() {
    this.down_time = this.downTime("2020/04/16", "10:59 PM");

    this.storeService.getStores();
    this.storeSub = await this.storeService.getStoreListener()
      .subscribe((stores: Store[]) => {
        this.stores = stores;
      });
  }

  ngOnDestroy() {
    this.updateSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  callPrintRep() {
    alert("Printing Today's Report...");
  };

  addUpdateToList(form: NgForm, store) {
    const newUpdate: Update = {
      storeId: store.storeId,
      storeNumber: store.storeNumber,
      date: form.value.new_date,
      time: form.value.new_time,
      message: form.value.new_text
    }
    this.updateService.addUpdate(newUpdate);
    this.showAddUpdate = '';
    this.showUpdateBtn = '';
  }

  callUpdateBtn(storeId: string) {
    this.showAddUpdate = storeId;
    this.showUpdateBtn = storeId;
  };

  callCancelUpdate() {
    let cancel = confirm('Are you sure you want to cancel this update?');
    if (cancel) {
      this.showAddUpdate = '';
      this.showUpdateBtn = '';
    }
  };

  callEditUpdate(update: Update) {
    this.updateService.editUpdate(update);
  }

  callDeleteUpdate(updateId: string) {
    let deleteUpdate = confirm('Are you sure you want to delete this update?');
    if (deleteUpdate) {
      this.updateService.deleteUpdate(updateId)
    }
  }

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
        storeNumber: form.value.new_storeNum,
        date: form.value.new_date,
        time: form.value.new_time,
        message: form.value.new_text
      }]
    }
    this.storeService.addStore(newStore);
    this.showStore = false;
  }

  callCancelStore() {
    let cancel = confirm('Are you sure you want to cancel?');
    if (cancel) {
      this.showStore = false;
    }
  };

  // callEditStore() {
  //   this.storeService.editStore();
  // }

  callDeleteStore(storeId: string) {
    let cancel = confirm('Are you sure you want to DELETE this Store?');
    if (cancel) {
      this.storeService.deleteStore(storeId);
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

  convertDate(date){
    var d = date;
    var newDate = '';
    if (d) { 
      d = d.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
          newDate = m + '/' + d + '/' + y;  
      });
      return newDate;
  }
  }
}
