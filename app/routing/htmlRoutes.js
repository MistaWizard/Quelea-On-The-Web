const path = require("path");

module.exports = (app) => {
    app.get("/lower", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/lowerthirds.html"));
    });
    app.use((req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
}