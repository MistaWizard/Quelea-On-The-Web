const express = require("express");
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const methodOverride = require("method-override");
const config = require("./config.js");

let lowerLyrics = ""

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

// Quelea RC API GET using Axios
const rcUrl = "http://localhost:1112/lyrics";

axios.get(rcUrl).then(response => {
    console.log("Here be the RC Lyrics " + response.data);
})
.catch(error => {
    console.log(error);
});

const lyricUrl = "http://localhost:1111/lyrics";

// Quelea Lyrics API GET using Axios
axios.get(lyricUrl).then(res => {
    console.log("Here be the Lyrics " + res.data);
    // res = lowerLyrics;
})
.catch(error => {
    console.log(error);
});

// SSE Connection to the Lower Thirds Lyric Front End
app.get('/lowerthirdsserver', function (request, response) {
    response.status(200).set({
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "content-type": "text/event-stream",
    })
    const data = "Hello Earl!";
    setInterval(() => {
        response.write('data: Hello Steve!!' + data + '\n\n')
    }, 500)
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