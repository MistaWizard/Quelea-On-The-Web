const path = require("path");

module.exports = (app) => {
    // Routing to Lower Thirds page
    app.get("/lower", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/lowerthirds.html"));
    });
    // Routing to Stage Display page
    app.get("/stage", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/stagedisplay.html"));
    });

    app.get("/send", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/send.html"));
    });

    app.get("/receive", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/receive.html"));
    });
    
    // Routing to main page
    app.use((req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });

}