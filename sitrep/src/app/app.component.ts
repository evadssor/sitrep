import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sitrep';

  addStore = document.querySelector('.addStore');
  printRep = document.querySelector('.printRep');
  status = document.querySelector('.status_text');
  post_up = document.querySelector('.post_up');
  add = document.querySelector('.add');
  update = document.querySelector('.update');
  delete_up = document.querySelector('.delete_up');
  update_btn = document.querySelector('.update_btn');
  add_update = document.querySelector('#add');
  //add_new_store = document.querySelector('#add_new_store');
  showStore = false;
  delete_store = document.querySelector('#delete_store');
  issue_type = document.querySelector('.issue_type');
  down_time: string;

ngOnInit() {
  this.down_time = this.downTime("2020/03/08", "01:25 PM");
}

newStore(){
  console.log('New Store');
  this.showStore = true;
}

callPrintRep() {
  alert("Printing Today's Report...");
};

callUpdateBtn(){
 // add.style.display = "grid";
  //update.style.display = "none";
};

callPostUp(){
  alert('Update Added Successfully!');
};

callDeleteUp(){
  let cancel = confirm('Are you sure you want to cancel this update?');
  if (cancel) {
   // add.style.display = "none";
   // update.style.display = "inline-flex";
  }
};

callDeleteStore() {
  let cancel = confirm('Are you sure you want to cancel this update?');
  if (cancel) {
    //this.add_new_store.style.display = "none";
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



// function StoreIssue(storeNum){
//     this.issueNum = issueNum + 1;
// }

}
