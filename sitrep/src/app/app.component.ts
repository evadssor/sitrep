import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Update } from './updates/update.model';
import { Subscription } from 'rxjs';
import { UpdateService } from './updates/update.service';
import { StoreService } from './stores/store.service';
import { Store } from './stores/store.model';
import { ResolveStoreComponent } from './resolve-store/resolve-store.component';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from './stores/categories.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updates: Update[] = [];
  stores: Store[] = [];
  categories: Categories;
  private updateSub: Subscription;
  private storeSub: Subscription;
  showAddUpdate = '';
  showUpdateBtn = '';
  showStore = false;
  showRestore = false;
  hoverOver = '';
  editing = '';
  updateEditable = '';


  constructor(
    public updateService: UpdateService,
    public storeService: StoreService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {

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

 async callPrintRep() {
    await this.catergorize();
    window.print();
  };


  resolveStore(store: Store) {
    const dialogRef = this.dialog.open(ResolveStoreComponent, {
      data: store
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.resolved) {
        console.log("Result: ", result);
        const resolvedStore: Store = {
          storeId: store.storeId,
          storeNumber: store.storeNumber,
          issue: store.issue,
          bmcTicket: store.bmcTicket,
          serviceTicket: store.serviceTicket,
          serverType: store.serverType,
          serverModel: store.serverModel,
          commType: store.commType,
          provider: store.provider,
          hardware: store.hardware,
          startDate: store.startDate,
          startTime: store.startTime,
          downTime: this.downTime(store.startDate, store.startTime),
          endDate: result.endDate,
          endTime: result.endTime,
          resolved: true,
          show: store.show
        }
        this.saveStoreEdit(resolvedStore)
      }
    });
    return;
  }

  reopenStore(store: Store) {
    store.resolved = false;
    this.storeService.editStore(store);
  }

  removeStoreFromList(store: Store) {
    store.show = false;
    this.storeService.editStore(store);
  }

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
    form.resetForm();
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

  triggerEdit(updateId: string) {
    this.updateEditable = updateId;
  }

  saveUpdate(update: Update) {
    this.editing = '';
    this.updateService.editUpdate(update);
  }

  callDeleteUpdate(updateId: string) {
    let deleteUpdate = confirm('Are you sure you want to delete this update?');
    if (deleteUpdate) {
      this.updateService.deleteUpdate(updateId)
    }
  }

  newStore() {
    const dialogRef = this.dialog.open(NewStoreComponent, {
      
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('result: ', result);
      this.saveStore(result);
    })
  }

  saveStore(newStore: Store) {
    // const newStore = {
    //   storeNumber: form.value.new_storeNum,
    //   issue: form.value.issue_type,
    //   bmcTicket: form.value.bmc_Num,
    //   serviceTicket: form.value.vend_Num,
    //   serverType: form.value.server,
    //   serverModel: form.value.model_num,
    //   commType: form.value.type_num,
    //   provider: form.value.provider,
    //   hardware: form.value.hardware,
    //   startDate: form.value.new_date,
    //   startTime: form.value.new_time,
    //   downTime: this.downTime(form.value.new_date, form.value.new_time),
    //   resolved: false,
    //   show: true,
    //   updates: [{
    //     storeNumber: form.value.new_storeNum,
    //     date: form.value.new_date,
    //     time: form.value.new_time,
    //     message: form.value.new_text
    //   }],
    // }
    this.storeService.addStore(newStore);
    this.showStore = false;
   // form.reset(); //<-- added to reset form on submit - evad
  }

  callCancelStore() {
    let cancel = confirm('Are you sure you want to cancel?');
    if (cancel) {
      this.showStore = false;
    }
  };

  saveStoreEdit(store: Store) {
    this.editing = '';
    console.log('store in app.comonpent.ts: ', store);
    this.storeService.editStore(store);
  }

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

  finalDownTime(d1, t1, d2, t2) {
    var date_time1 = (d1.toString() + " " + t1.toString());
    var date_time2 = (d2.toString() + " " + t2.toString());

    var start_milli = Date.parse(date_time1);
    var end_milli = Date.parse(date_time2);

    var down_hours = (end_milli - start_milli) / 1000 / 60 / 60;
    var setHours = Math.floor(down_hours);

    var down_minutes = (down_hours - setHours) * 60;
    var setMinutes = Math.floor(down_minutes);
    var m = setMinutes > 9 ? setMinutes : '0' + setMinutes;

    return (setHours + "hrs " + m + "min");
  }

  convertDate(date) {
    var d = date;
    var newDate = '';
    if (d) {
      d = d.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function (match, y, m, d) {
        newDate = m + '/' + d + '/' + y;
      });
      return newDate;
    }
  }

  checkResolved(status) {
    if (status === true) {
      return 'CLOSED';
    } else {
      return 'OPEN';
    }
  }

  catergorize() {
    this.categories = {
      iSeries: [],
      Linux: [],
      LAN: [],
      WAN: [],
      Phones: []
    }
    for(let store of this.stores) {
      switch(store.issue) {
        case "iSeries":
          console.log('iSeries');
          this.categories.iSeries.push(store);
          break;
        case "Linux":
          console.log('Linux');
          this.categories.Linux.push(store);
          break;
        case "WAN":
          console.log('WAN', store);
          this.categories.WAN.push(store);
          break;
        case "LAN":
          console.log('LAN', store);
          this.categories.LAN.push(store);
          break;
        case "Phones":
          console.log('Phones');
          this.categories.Phones.push(store);
          break;
        default:
          console.log('Nothing');
          break;
      }
    }
  }

  insertStoreNum(stores: Store[]) {
    for (let i = 0; i < stores.length; i++) {
      var date_time = (stores[i].startDate.toString() + " " + stores[i].startTime.toString());
      var start_milli = Date.parse(date_time);
      var current_milli = new Date().getTime();
      var down_hours = (current_milli - start_milli) / 1000 / 60 / 60;
      if (stores[i].issue === 'WAN') {
        if (down_hours >= 24) {
          return stores[i].storeNumber;
        }
      } else if (stores[i].issue === 'LAN') {
        if (down_hours >= 24) {
          return stores[i].storeNumber;
        }
      } else if (stores[i].issue === 'SERVER') {
        if (down_hours >= 24) {
          return stores[i].storeNumber;
        }
      } else if (stores[i].issue === 'PHONES') {
        if (down_hours >= 24) {
          return stores[i].storeNumber;
        }
      }
    }
  }

  currentDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var today = mm + '/' + dd + '/' + yyyy;
    return(today);
  }

  currentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var setMinutes = '';

    if(minutes < 10){
      setMinutes = "0" + String(minutes);
    }else{
      setMinutes = String(minutes);
    }

    var time = hours + ":" + setMinutes;
    return(time);
  }
}
