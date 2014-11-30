var path = require('path')
  , fs = require('fs')

var through = require('through')

module.exports = jsonStream

function jsonStream(dir, _options, _extension) {
  var extension = _extension || '.json'
    , options = _options || {}
    , stream = through()
    , count = 0
    , read

  if(options.limit === 0) return stream.queue(null)

  if(options.limit < 0) options.limit = 0

  dir = path.normalize(dir)

  fs.readdir(dir, parseFiles)

  return stream

  function parseFiles(err, files) {
    files = files.sort()

    if(options.reverse) files = files.reverse()

    if(options.start && options.end && options.end < options.start) {
      options.end = [options.start, options.start = options.end][0]
    }

    if(options.start || options.end) files = files.filter(filterStartEnd)

    next()

    function streamFile(filename) {
      if(path.extname(filename) !== '.json') return next()

      if(options.limit && options.limit < ++count) return end()

      if(options.values === false) {
        return fs.stat(path.join(dir, filename), streamKey)
      }

      fs.readFile(path.join(dir, filename), streamKeyValue)

      function streamKey(err, stats) {
        if(err || !stats.isFile()) {
          --count

          return next()
        }

        stream.queue(justName(filename))

        next()
      }

      function streamKeyValue(err, data) {
        if(err) {
          --count

          return next()
        }

        var result
          , value

        try {
          value = JSON.parse('' + data)
        } catch(e) {
          next()
        }

        if(options.keys === false) {
          result = value
        } else {
          result = {
              key: justName(filename)
            , value: value
          }
        }

        stream.queue(result)

        next()
      }
    }

    function next() {
      if(!files.length) return end()

      streamFile(files.shift())
    }
  }

  function end() {
    stream.queue(null)
  }

  function filterStartEnd(el) {
    var compare = path.basename(el, extension)

    if(options.start && options.start > compare) return false
    if(options.end && options.end < compare) return false

    return true
  }
}

function justName(filename) {
  return path.basename(filename, path.extname(filename))
}
