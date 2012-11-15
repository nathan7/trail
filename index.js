var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = trail;

function trail(paths, fname, cb) {
    async.detect(paths.map(function(dirname) {
        return path.join(dirname, fname);
    }), fs.exists || path.exists, function(fpath) {
        cb(null, fpath);
    });
}

trail.bail = bail;

function bail(paths, fname, cb) {
    trail(paths, fname, function(err, fpath) {
        if (!fpath) return cb('not found');
        cb(null, fpath);
    });
}
