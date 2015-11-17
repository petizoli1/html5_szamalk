/*
    HTML5 tanfolyam 2. nap javascript alapok
*/

/*
//Változók létrehozása
var egy = 1,
    ketto = 2,
    szoveg = "Hello JS.",
    igaz = true,
    tomb = [1, "ketto", false],
    obj = {"egyes": 1, "kettes": 2, "hamis": false};

//For ciklus
for ( var i = 0; i < tomb.length; i++ ){
    console.log("elem: ", tomb[i]);
}

//For ciklus objektumon
console.log( Object.keys(obj) );
var oKeys = Object.keys(obj);
for ( var i = 0; i < oKeys.length; i++ ){
    console.log("elem: ", obj[oKeys[i]]);
}

//For in ciklus
for ( var k in obj ){
    console.log(k+": ", obj[k] );
}

// SQL dátum formátum
Date.prototype.toSQL = function() {
    var y = this.getFullYear(),
        m = this.getMonth()+1,
        d = this.getDate();
    m = m > 9 ? m : "0"+m;
    d = d > 9 ? d : "0"+d;
    return y+"-"+m+"-"+d;
    
};

//Függvény definiálás
function  testFunction() {
    console.log("valami üzlet");   
}
var testFunction2 = function() {
    console.log("másik függvény");
}

//Objectum
var person = function( data ) {
    
    this.setName = function ( name ) {
        this.data.name = name;
    };
    this.getName = function() {
        return this.data.name;
    };
    this.greeting = function() {
        return "Hello " + this.data.name;
    };
    
    this.construct = function() {
        this.data = data || {};
    };
    
    this.construct();
};

var jack = new person( {"name": "Jack", "job": "programmer"} );
console.log(jack.greeting());

var monica = new person( {"name": "monica", "job": "secretary"} );
console.log(monica.greeting());
*/

// figyeljük az oldal betöltődését.
window.onload = function() {

    //Email
    var email = document.querySelector("#inputEmail3");        
    
    //Módosítások figyelése
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var checkEmail = function() {
        var style = !re.test(email.value) ? "block" : "none";
        email.parentNode.querySelector(".error-message").style.display = style;
        return re.test(email.value);
    };
    
    email.onblur = checkEmail;
    
    //Űrlap küldése
    var form = document.querySelector(".form-horizontal");
    form.onsubmit = function() {
        if (!checkEmail()){
            return false;
        }
    };
    
    //Késleltetett működés.
    /*
    var intv = setInterval( function() {
        var d = new Date();
        console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() );
    }, 1000);
    
    var to = setTimeout( function(){
        clearTimeout(to);
        console.log("clearintervall...");
        clearInterval(intv);
    }, 10000 );
    */
    
    var _rto;
    window.onresize = function() {
        clearTimeout(_rto);
        _rto = setTimeout( function() {
            clearTimeout(_rto);
            console.log( this.innerWidth );
        }, 150);
    };
    
    getRemoteContent();
    
};

//Távoli tartalom betöltése.
function getRemoteContent() {
    
    //Új request.
    var req = new XMLHttpRequest();
    
    //Beállítás
    req.open( "get", "json/products.json" );
    
    //Ha kész.
    req.onload = function() {
        var data = JSON.parse(this.response);
        console.log( data );  
    };
    
    //Indítjuk
    req.send();
    
}








