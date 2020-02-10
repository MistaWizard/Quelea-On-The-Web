const path = require("path");

module.exports = function(app) {
    app.get("/lower", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/lowerthirds.html"));
    });
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
}