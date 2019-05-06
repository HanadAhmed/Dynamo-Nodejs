var AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com",
    accessKeyId  : "ASIARV4AYRH3HPQQL4VI",
    secretAccessKey : "JkIsnRDGNHUqPhVOmn77g/Cb5Hc74X3oirmIBBLe",
    sessionToken : "FQoGZXIvYXdzEDkaDBUK0iD8scHZpjhbhSKFA05AT1nhZxSSudPs9iMEACgZH+hbn2dVzUi2UMHETKebkZaeM7XtIt7WFiaZFFc74W7TDdM3LmOAFGYagcD8fsZSEzYvXIFZoy8U8ZUeuLKEDShyjRcK/yDTaoCBNwKpHEg8zLssE4RHT7NYkdCSZCy8deCUeTCO4+ZpwY5S6fdbzW4pFtqVW7+TM9rtj/IMjYkSJBRD38q4QEUuCLvq44QPz7MrLgogenSVTLULs56K9YodMuRuFezodtodT5JZhNKD/ZIWhgYt7d3nS6UK39qE7sEPEZkofnVHHyCGbiCTyBltu2J1lIm7pnIT8rSfz7RFvOrzaICYZaWzZItzScoWAQzpz6OuIa01S2R6jhOQf9zxl+viNU2mAXgLoSolA1MxBfQblYzCrwFVB7uXjZor/3Z6/JocpoSrk48UdNWW6H5oqrFjoJUQfLwOwGbjcV8zt8EIamhPx+bWEEwqNzbsSZqYPN1wdEJPAlAeMrC1DtS5DOvkp7L6bgYRQrBQ63KYQ4JmKJ2Mw+YF"
});

console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_SESSION_TOKEN);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "signups";

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
