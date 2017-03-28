// server.js

// BASE SETUP
// =============================================================================
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var request = require('request');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router


router.route('/assets')

// create a bear (accessed at POST http://localhost:8080/api/assets)
.post(function(req, res) {
    var AssetID = req.body.AssetID || "";
    var AssetType = req.body.AssetType || "";
    var SerialNumber = req.body.SerialNumber || "";
    var IP = req.body.IP || "";
    var Model = req.body.Model || "";
    var Location1 = req.body.Location || "";
    var TechnologyOwner = req.body.TechnologyOwner || "";
    var BuisnessOwner = req.body.BuisnessOwner || "";
    var InstallDate = req.body.InstallDate || "";


    var options = {
        uri: '',
        method: 'POST',
        headers: {
            'User-Agent': 'request'
        },
        auth: {
            'user': '',
            'pass': ''
        },
        json: {
            "AssetID": AssetID,
            "AssetType": AssetType,
            "SerialNumber": SerialNumber,
            "IP": IP,
            "Model": Model,
            "Location": Location1,
            "TechnologyOwner": TechnologyOwner,
            "BuisnessOwner": BuisnessOwner,
            "InstallDate": InstallDate
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 201) {
            res.send({ "Message": "Asset added", "Key": response.body._key });
        } else {
            console.log(error);
            res.send({ "Message": error });
        }
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API running on port ' + port);