[![Build Status](https://secure.travis-ci.org/nathan7/trail.png?branch=master)](https://travis-ci.org/nathan7/trail)

trail
=====
trail checks for a file or directory on a bunch of search paths.
for example, given the paths ```['a', 'b', 'c']``` and the basename ```'file'``` it'll return the first of ```['a/file', 'b/file', 'c/file']``` that exists.

trail(paths, basename, cb)
==========================
paths should be an array, basename should be a string.
cb should be a callback that takes error and pathname arguments.
No error is ever passed. If the file is not found, null is passed as pathname.

trail.bail(paths, basename, cb)
===============================
Like trail, but passes ```'not found'``` as error when it can't find the file.
Very useful with [async's](https://github.com/caolan/async) [waterfall](https://github.com/caolan/async#waterfall).
