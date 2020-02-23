const path = require("path");

module.exports = (app) => {
    // Routing to Lower Thirds page
    app.get("/lower", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/lowerthirds.html"));
    });
    // Routing to main page
    app.use((req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
}