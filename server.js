const express = require("express");
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const methodOverride = require("method-override");
const config = require("./config.js");
const rcUrl = config.rcApi + "/lyrics";
const lyricUrl = config.lyricsApi + "/lyrics";

let lowerLyrics = "";
let newLyrics = "";

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
axios.get(rcUrl).then(response => {
    console.log("Here be the RC Lyrics " + response.data);
})
.catch(error => {
    console.log(error);
});


// Quelea Lyrics API GET using Axios
// axios.get(lyricUrl).then(res => {
//     console.log("Here be the Lyrics " + res.data);
//     console.log(lowerLyrics);
// })
// .catch(error => {
//     console.log(error);
// });

setInterval(() => {

    // Quelea Lyrics API GET using Axios
    axios.get(lyricUrl).then(res => {
        // console.log("Here be the Lyrics " + res.data);
        newLyrics = res.data;
        // console.log(newLyrics);
        if (newLyrics === lowerLyrics) {
            console.log("No change is good change");
        }
        else {
            lowerLyrics = newLyrics;
            console.log("Here it is");
            // response.write('data:' + lowerLyrics + '\n\n')
        }
    })
    .catch(error => {
        console.log(error);
    });
}, 300);

// SSE Connection to the Lower Thirds Lyric Front End
app.get('/lowerthirdsserver', function (request, response) {
    response.status(200).set({
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "content-type": "text/event-stream",
    });
    // const data = "Hello Earl!";

    setInterval(() => {
        response.write('data:' + lowerLyrics + '\n\n');
    }, 300);

    // request.on('close', () => {    
    //     response.end();    
    //     console.log('Stopped sending events.');  
    // });
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