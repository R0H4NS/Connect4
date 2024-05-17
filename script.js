function myFunction1() {
    this.style.background="#359723";
}

function myFunction(color) {
    document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground('red') });