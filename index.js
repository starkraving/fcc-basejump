var express = require('express');
var app = express();
app.get('/', function(req, resp){
	resp.contentType('text/html');
	resp.sendFile(__dirname+'/view/home.html');
});
app.get('/date', function(req, resp){
	if ( req.query.ts ) {
		resp.redirect('/date/'+req.query.ts);
	} else {
		resp.redirect('/');
	}
});
app.get('/date/:ts', function(req, resp){
	var ts = ( !Date.parse(req.params.ts) )
				? new Date(parseInt(req.params.ts, 10))
				: new Date(Date.parse(req.params.ts));
	resp.contentType('text/JSON');
	resp.end(JSON.stringify({
		unix: Math.round(ts.getTime()/1000),
		natural: ( !ts.getTime() ) ? null : ts.toDateString()
	}));
});
app.listen(8080);