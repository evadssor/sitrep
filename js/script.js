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

function downTime(start){
    var time = new Date().getTime();
    var e = Date.parse(start); 
    var diff = time - e;
    return diff;
}

console.log(downTime("Sept 02, 2002"));