const express = require("express");
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const config = require("./config.js");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(methodOverride("_method"));

app.use(express.static("./app/public"));

app.all("/rcApi/*", function(req, res, error) {
    console.log("redirecting to Remote Control API");
    apiProxy.web(req, res, {target: config.rcApi});
});

app.all("/lyricsApi/*", function(req, res, error) {
    console.log("redirecting to Lyrics API");
    apiProxy.web(req, res, {target: config.lyricsApi});
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});