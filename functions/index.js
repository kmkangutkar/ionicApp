const functions = require('firebase-functions');
const admin = require('firebase-admin');
const querystring = require('querystring');
const http = require('http');
admin.initializeApp(functions.config().firebase);


// exports.onionDetails = functions.database
// 	.ref('/menuItems/{pushId}')
// 	.onWrite(event => {
// 		const original = event.data.val();
// 		console.log('Change to Onions', event.params.pushId, original);
// 		original.details = changeToOnion();
// 		return event.data.ref.set(original);
// 	});

// function changeToOnion(){ 
// 	return "onions";
// }


exports.sendEmail = functions.database
	.ref('/menuItems/{pushId}')
	.onWrite(event => {
		const postData = querystring.stringify({
			"from" : "Food Menu <menu@food.com>",
			"to" : "komalkangutkar96@gmail.com",
			"subject" : "Hello",
			"text" : "Testing some Mailgun awesomness!"   
		});
		const mailgunUrl = "sandboxfd5e5a2f00054b8f89b88804c78bf4bf";
		const mailgunApiKey = "api:key-09babe70822baa973b382b2c70c03c2e";
		const options = {
		  hostname: "https://api.mailgun.net/v3/" + mailgunUrl,
		  port: 80,
		  path: '/messages',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': Buffer.byteLength(postData)
		  }
		};
		const req = http.request(options, (res) => {
		  console.log(`STATUS: ${res.statusCode}`);
		  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		    console.log(`BODY: ${chunk}`);
		  });
		  res.on('end', () => {
		    console.log('No more data in response.');
		  });
		});

		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});

		// write data to request body
		req.write(postData);
		req.end();


		// var api_key = 'api:key-09babe70822baa973b382b2c70c03c2e';
		// var domain = 'sandboxfd5e5a2f00054b8f89b88804c78bf4bf.mailgun.org';
		// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
		 
		// var data = {
		//   from: 'Excited User <me@samples.mailgun.org>',
		//   to: 'komalkangutkar96@gmail.com',
		//   subject: 'Hello',
		//   text: 'Testing some Mailgun awesomness!'
		// };
		 
		// mailgun.messages().send(data, function (error, body) {
		//   if (error){
		//   	console.log(error);
		//   }else{
		//   	console.log(body);
		//   }
		// });
	});