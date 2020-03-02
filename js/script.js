let addStore = document.querySelector('.addStore');
let printRep = document.querySelector('.printRep');
let post_up = document.querySelector('.post_up');
let delete_up = document.querySelector('.delete_up');
let update_btn = document.querySelector('.update_btn');
let resolve = document.querySelector('.resolve');
let add_update = document.querySelector('.add');

addStore.addEventListener('click', function(){
    alert('New Store Added');
})

printRep.addEventListener('click', function(){
    alert("Printing Today's Report...");
});

post_up.addEventListener('click', function(){
    alert('Update Added Successfully!');
});

delete_up.addEventListener('click', function(){
    confirm('Are you sure you want to cancel this update?');
});
