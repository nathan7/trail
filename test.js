var path = require('path')
  , fs = require('fs')
  , should = require('should')
  , trail = require('./index')

var testdir = __dirname + '/testdata'
  , testdirs = ['a', 'b', 'c'].map(function(subdir) { return path.join(testdir, subdir) })
  , testfile = 'file'


describe('trail', function() {
    it('should find files that exist', function(done) {
        trail(testdirs, testfile, function(err, found) {
            should.not.exist(err)
            found.should.equal(path.join(testdirs[1], testfile))
            ;(fs.existsSync || path.existsSync)(found).should.equal(true)
            done()
        })
    })
    it('should return null on files that don\'t exist', function(done) {
        trail(testdirs, 'does-not-exist', function(err, found) {
            should.not.exist(err)
            should.not.exist(found)
            done()
        })
    })
})

describe('bail', function() {
    it('should find files that exist', function(done) {
        trail.bail(testdirs, testfile, function(err, found) {
            should.not.exist(err)
            found.should.equal(path.join(testdirs[1], testfile))
            ;(fs.existsSync || path.existsSync)(found).should.equal(true)
            done()
        })
    })
    it('should pass an error on files that don\'t exist', function(done) {
        trail.bail(testdirs, 'does-not-exist', function(err, found) {
            err.should.equal('not found')
            should.not.exist(found)
            done()
        })
    })
})
