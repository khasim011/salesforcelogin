const express = require('express');
const router = express.Router();
const request = require('request');
var fs = require('file-system');
var Eloqua = require('eloqua-request');
var eloqua = new Eloqua('https://s1883512475.t.eloqua.com', 'user', 'pass');
var bodyParser = require('body-parser');


//Call Salesforce Login API
router.get('/Login', (req, res) => {
	var params = {
		"grant_type":"password",
		"client_id":"3MVG9CEn_O3jvv0z0MMOapxf1jElktCfDdG2woIK0x.90.Qk28wIHILVWQKcP5D6qskITumCbAdwOOWxyZkEZ",
		"client_secret":"744137974114971187",
		"username":"saurabhdubey46@resourceful-goat-234461.com",
		"password":"trailhead46!LuEQa808skWuLUcXSZrHWCJBC"
	};
	request.post({
		url:'https://resourceful-goat-234461-dev-ed.my.salesforce.com/services/oauth2/token',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		formData: params
	},
	function(error, response, body){
		console.log("---->"+JSON.stringify(response));
		if(!error && (response.statusCode == 200 || response.statusCode == 201)){
			res.send(JSON.parse(response.body));
		} else{
			res.send({"error":error});
		}
	});
});

router.post('/Eloqua/f2', (req, res) => {
	console.log(req.body);
	eloqua.post('https://s1883512475.t.eloqua.com/e/f2', req.body, function(err, response){
		console.log("err"+err+"="+response);
	});
	request.post({
		url:'https://s1883512475.t.eloqua.com/e/f2',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: JSON.stringify(req.body)
	},
	function(error, response, body){
		console.log(body+"---->"+error+"=="+JSON.stringify(response));
		if(!error && (response.statusCode == 200 || response.statusCode == 201)){
			res.send(response.body);
		} else{
			res.send({"error":error});
		}
		res.end();
	});
});

module.exports = router;