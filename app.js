var AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');

AWS.config.update({
    "region": "us-east-1",
    "endpoint" : "https://dynamodb.us-east-1.amazonaws.com",
    "aws_access_key_id"  : "ASIARV4AYRH3HPQQL4VI",
    "aws_secret_access_key" : "JkIsnRDGNHUqPhVOmn77g/Cb5Hc74X3oirmIBBLe"
});

//console.log(process.env.AWS_SECRET_ACCESS_KEY);
//console.log(process.env.AWS_SESSION_TOKEN);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "signups";

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use( express.static(__dirname + "/views" ) );

app.set('view engine', 'ejs');

app.get('/signup', function (req, res) {
    res.render('index');
});

app.post('/signup', urlencodedParser, function (req, res) {
    console.log(req.body)
    var params = {
        TableName: table,
        Item: {
            "name": req.body.name,
            "email": req.body.email
        }
    };
    res.send('welcome, ' + req.body.name)
    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Item Added");
        }
    });
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/signup');
});
