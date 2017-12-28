function hello(){
    window.confirm('Submitted!')
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('submitted');
    });
});
