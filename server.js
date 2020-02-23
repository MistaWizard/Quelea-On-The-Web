const express = require("express");
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require("body-parser");
// const path = require("path");
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

// Reverse Proxy redirect to Remote Control API
app.all("/rcApi/*", (req, res) => {
    console.log("redirecting to Remote Control API");
    apiProxy.web(req, res, {target: config.rcApi});
});

// Reverse Proxy redirect to Lyrics API
app.all("/lyricsApi/*", (req, res) => {
    console.log("redirecting to Lyrics API");
    apiProxy.web(req, res, {target: config.lyricsApi});
});

// Keep server running if connection to an API fails
process.on('uncaughtException', (err) => {
    console.log(err);
});

// Routing for HTML files
require("./app/routing/htmlRoutes.js")(app);

// Run the server
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});