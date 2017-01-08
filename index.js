/**
 * Node Entry
 * More Info: https://github.com/hooph00p/hero-swap#readme
 */
var package = require('./package.json'),
    port = process.env.PORT || 8080,
    express = require('express');

// Create an App
var app = express();

// At this point, let's just serve the files in the bin.
app.use(express.static('bin'));

// Listen on the port environment variable or 8080
app.listen(port, function () {
    console.log("Running " + package.title + " on " + port);
}); 