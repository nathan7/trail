var fs = require('fs');
var path = require('path');

module.exports = trail;

function trail(paths, fname, cb) {
    var pathlist = paths.map(function(dirname) {
        return path.join(dirname, fname);
    });

    (function checkPath(pathname) {
        (fs.exists || path.exists)(pathname, function(exists) {
            if (exists) return cb(null, pathname);
            if (!pathlist.length) return cb(null, null);
            checkPath(pathlist.shift());
        });
    })(pathlist.shift());
}

trail.bail = bail;

function bail(paths, fname, cb) {
    trail(paths, fname, function(err, fpath) {
        if (!fpath) return cb('not found');
        cb(null, fpath);
    });
}
