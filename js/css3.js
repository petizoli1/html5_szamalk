/*
setTimeout( function() {
    document
        .querySelector(".anim-div")
        .classList
        .add("to-right");
}, 1500);
*/

document.querySelector("#loaded").addEventListener("change", function(){
   document.querySelector(".anim-div").style.width = this.value+"%"; 
});