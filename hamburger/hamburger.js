/*
* Open the drawer when the menu ison is clicked.
*/
const menu = document.querySelector('#menu');
const main = document.querySelector('main');
const nav = document.querySelector('.nav');

menu.addEventListener('click', function(e) {
    nav.classList.toggle('open');
    e.stopPropagation();
});
main.addEventListener('click', function() {
    nav.classList.remove('open');
});