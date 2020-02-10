const express = require("express");
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const rcApi = 'http://192.168.1.83:1112',
      lyricsApi = 'http://192.168.1.83:1111';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(methodOverride("_method"));

app.use(express.static("app/public"));

app.all("/rcApi/*", function(req, res) {
    console.log("redirecting to Remote Control API");
    apiProxy.web(req, res, {target: rcApi});
});

app.all("/lyricsApi/*", function(req, res) {
    console.log("redirecting to Lyrics API");
    apiProxy.web(req, res, {target: lyricsApi});
});

require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});