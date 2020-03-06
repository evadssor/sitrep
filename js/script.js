let addStore = document.querySelector('.addStore');
let printRep = document.querySelector('.printRep');
let post_up = document.querySelector('.post_up');
let add = document.querySelector('.add');
let update = document.querySelector('.update');
let delete_up = document.querySelector('.delete_up');
let update_btn = document.querySelector('.update_btn');
let resolve = document.querySelector('.resolve');
let add_update = document.querySelector('.add');
let issue_type = document.querySelector('.issue_type');
let down_time = document.querySelector('.down_time');
let issueNum = 00000;

addStore.addEventListener('click', function () {
    alert('New Store Added');
})

printRep.addEventListener('click', function () {
    alert("Printing Today's Report...");
});

update_btn.addEventListener('click', function () {
    add.style.display = "grid";
    update.style.display = "none";
})

post_up.addEventListener('click', function () {
    alert('Update Added Successfully!');
});

delete_up.addEventListener('click', function () {
    let cancel = confirm('Are you sure you want to cancel this update?');
    if (cancel) {
        add.style.display = "none";
        update.style.display = "inline-flex";
    }
});

function downTime(d, t){//take in date and time from inputs
    var date_time = (d.toString() + " " + t.toString());//Combine incoming date and time strings
    var start_milli = Date.parse(date_time); //parse date_time string to milliseconds
    var current_milli = new Date().getTime(); //get current time in milliseconds
    
    var down_hours = (current_milli - start_milli) / 1000 / 60 / 60;//divide milliseconds into hours 
    var setHours = Math.floor(down_hours);//Cut off decimal after hour

    var down_minutes = (down_hours - setHours) * 60;//Calculate Minutes
    var setMinutes = Math.floor(down_minutes);//Cut off decimal after minute
    var m = setMinutes > 9 ? setMinutes : '0' + setMinutes;//Add a leading 0 if minutes are less than 10

    return(setHours + "hrs " + m + "min");
}

down_time.innerHTML = (downTime("2020/03/03", "05:25 PM"));


// function StoreIssue(storeNum){
//     this.issueNum = issueNum + 1;
// }