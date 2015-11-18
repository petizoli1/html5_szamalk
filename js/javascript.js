/*
    HTML5 tanfolyam, második nap, javascript alapok.
*/

/*
// Változók létrehozása.
var egy = 1,
    ketto = 2,
    szoveg = "Hello JS.",
    igaz = true,
    tomb = [1, "ketto", false],
    obj = {"egyes": 1, "kettes": 2, "hamis": false};

// For ciklus egy tömbön.
for ( var i = 0; i < tomb.length; i++ ) {
    console.log( "elem: ", tomb[i] );
}

// For ciklus egy objektumon.
var oKeys = Object.keys(obj);
for ( var i = 0; i < oKeys.length; i++ ) {
    console.log( "elem: ", obj[oKeys[i]] );
}

// For in ciklus.
for ( var k in obj ) {
    console.log( k+":", obj[k] );
}

// Sql dátum formátum.
Date.prototype.toSQL = function() {
    var y = this.getFullYear(),
        m = this.getMonth()+1,
        d = this.getDate();
    m = m > 9 ? m : "0"+m;
    d = d > 9 ? d : "0"+d;
    return y+"-"+m+"-"+d;
};

// Függvény definiálás.
function testFunction() {
    console.log( "valami üzlet" );
}
var testFunction2 = function() {
    console.log( "másik függvény" );  
};

// Objectum.
var person = function( data ) {    
    
    this.setName = function( name ) {
        this.data.name = name;  
    };
    this.getName = function() {
        return this.data.name;
    };
    
    this.greeting = function() {
        return "Hello "+this.data.name;
    };
    
    this.construct = function() {
        this.data = data;  
    };
    
    this.construct();
    
};
var jack = new person( {"name": "Jack"} );
console.log( jack.greeting() );

var monica = new person( {"name": "Mónika"});
console.log( monica.greeting() );
*/

// Figyeljük az oldal betöltődését.
window.onload = function() {
    
    // Email mező.
    var email = document.querySelector( "#inputEmail3" );
    
    // Módosítások figyelése.
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    window.checkEmail = function() {
        
        var style = !re.test(email.value) ? "block" : "none";
        email.parentNode.querySelector( ".error-message" ).style.display = style;
        return re.test(email.value);
        
    };
    email.onchange = checkEmail;
    
    // Űrlap küldése.
    var form = document.querySelector( ".form-horizontal" );
    form.onsubmit = function() {
        if ( !checkEmail() ) {
            return false;            
        }
    };
    
    // Késleltetett működés.
    /*
    var to = setTimeout( function() {
        clearTimeout(to);
        console.log( "késeleltetett függvény..." );
    }, 4000 );
    
    var intv = setInterval( function() {
        var d = new Date();
        console.log( d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() );
    }, 1000 );
    */
    
    window.onresize = function() {
        // console.log( this.innerWidth );
    };
    
    getRemoteContent();
    
    
};

// Távoli tartalom betöltése.
function getRemoteContent() {
    
    // Új request.
    var req = new XMLHttpRequest();
    
    // Beállítás.
    req.open( "get", "json/products.json" );
    
    // Ha kész.
    req.onload = function() {  
        var data = JSON.parse( this.response );
        window.productList = new products( data );
        console.log( data );        
    };
    
    // Indítjuk.
    req.send();
    
}

// Termékek kezelése.
var products = function( products ) {
    
    // Konstruktor.
    this.construct = function() {
        
        // Elemek keresése.
        this.searchInput = document.querySelector( "#search-input" );
        this.searchButton = document.querySelector( "#search-button" );
        this.saveButton = document.querySelector( "#save-button" );
        this.tbody = document.querySelector( "#product-table tbody" );
        
        this.products = products;
        this.fillTable();
        this.setEvents();
        
    };
    
    // Eseménykezelők.
    this.setEvents = function() {
        
        // Keresés indítása.
        var self = this;
        this.searchButton.addEventListener( "click", function() {
            self.filterTable();
        }, false );
        
        // Mentés.
        this.saveButton.addEventListener( "click", function() {
            self.postDataToTheServer();
        }, false );
        
    };
    
    // Input mezők módosításának figyelése.
    this.watchInputs = function() {
        
        // Input mezők kiválasztása.
        var self = this;        
        var inputs = this.tbody.querySelectorAll( "input" );
        
        Array.prototype.forEach.call( inputs, function( input ) {
            input.addEventListener( "change", function() {
                self.changeProducts( this ); 
            });
        });
        
    };
    
    // Adatok visszaírása a products tömbbe.
    this.changeProducts = function( input ) {
        console.log( input.value );
        var id = input.getAttribute( "data-id" ),
            key = input.getAttribute( "data-key" );
        this.find( "id", id )[key] = input.value;
    };
    
    // Adatok küldése a szerverre.
    this.postDataToTheServer = function() {
        console.log( this );
        
        /*
        var req = new XMLHttpRequest();
        req.open( "post", "http://127.0.0.1:3333" );
        req.onload = function() {
            console.log( req.response );
        }
        req.onerror = function() {
            console.error( req.response );
        }
        req.send( JSON.stringify(this.products) );
        */
        
        $.post( "http://127.0.0.1:3333", JSON.stringify(this.products), function(data) {
            console.log( data ); 
        });
        
        
    };
    
    // Táblázat szűrése.
    this.filterTable = function() {
        
        console.log( this );
        
        var phrase = this.searchInput.value,
            records = [];
        
        // Ellenőrzés.
        if ( phrase.length < 1 ) {
            records = this.products;
        } else {
            records = this.findAll( phrase );
        }
        
        // Újrageneráljuk a táblázatot.
        this.fillTable( records );
        
    };
    
    // Keresés.
    this.find = function( key, value ) {
        for ( var k in this.products ) {
            if ( this.products[k][key] == value ) {
                return this.products[k];            
            }
        }
        return -1;
    };
    
    // Keresés.
    this.findAll = function( value ) {
        var results = [];
        for ( var k in this.products ) {
            if ( this.joinRecord( this.products[k] ).indexOf( value ) !== -1 ) {
                results.push( this.products[k] );                
            }
        }
        return results;
    };
    
    // Rekord egyesítése.
    this.joinRecord = function( record ) {
        var joined = "";
        for ( var k in record ) {
            joined += "|"+record[k];
        }
        return joined;
    };
    
    // Táblázat generálása.
    this.fillTable = function( records ) {
        
        records = records || this.products;
        
        // Adatsorok beszúrása.
        this.tbody.innerHTML = "";
        for ( var k in records ) {
            var tr = document.createElement( "tr" );
            this.tbody.appendChild( tr );
            this.createCells( tr, records[k] );
        }
        
        this.watchInputs();
        
    };
    
    // Cellák generálása.
    this.createCells = function( tr, row ) {
        for ( var k in row ) {
            var td = document.createElement( "td" );
            td.innerHTML = '<input data-id="'+row.id+'" data-key="'+k
                            +'" class="form-control" type="text" value="'+row[k]
                            +'">';
            tr.appendChild( td );
        }
    };
    
    this.construct();
    
    
};


























