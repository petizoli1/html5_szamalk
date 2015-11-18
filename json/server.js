// 
var http = require( "http" ),
    fs = require( "fs" );

// Válasz adása.
function writeResponse( req, res, content ) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end( content || "Hello, én vagyok a szerver" );
}

// Post kezelése.
function handlePost( req, res ) {
    
    var body = "";
    req.on( "data", function(data) {
       body += data; 
    });
    req.on( "end", function() {
        console.log( body );
        fs.writeFileSync('products.json', body);   
    });
    
    
    writeResponse( req, res );
    
}

function handleGet( req, res ) {
    writeResponse( req, res );
}

var app = http.createServer( function( req, res ) {
    
    // Kérések kezelése.
    switch( req.method.toLowerCase() ) {
        case "post": handlePost( req, res );
            break;
        case "get": handleGet( req, res );
            break;
        default: 
            writeResponse( req, res );
    }
    
    // Válasz.
    
} ).listen( "3333" );


console.log( "Server run in 3333 port." );