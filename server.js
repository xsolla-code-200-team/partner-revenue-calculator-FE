var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "dist");
var PORT = process.env.PORT || 3002;
var app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// Listen on port in PORT var
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
