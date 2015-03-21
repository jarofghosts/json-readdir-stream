var path = require('path')
  , fs = require('fs')

var through = require('through2')

module.exports = jsonStream

function jsonStream(dir, _options, _extension) {
  var extension = _extension || '.json'
    , options = _options || {}
    , stream = through.obj()
    , count = 0

  if(options.limit === 0) {
    return stream.push(null)
  }

  if(options.limit < 0) {
    options.limit = 0
  }

  dir = path.normalize(dir)

  fs.readdir(dir, parseFiles)

  return stream

  function parseFiles(err, files) {
    if(err) {
      return stream.emit('error', err)
    }

    files = files.sort()

    if(options.reverse) {
      files = files.reverse()
    }

    if(options.start && options.end && options.end < options.start) {
      // swap values without introducing a temp var, i hate myself
      options.end = [options.start, options.start = options.end][0]
    }

    if(options.start || options.end) {
      files = files.filter(filterStartEnd)
    }

    next()

    function streamFile(filename) {
      if(path.extname(filename) !== '.json') {
        return next()
      }

      if(options.limit && options.limit < ++count) {
        return end()
      }

      if(options.values === false) {
        return fs.stat(path.join(dir, filename), streamKey)
      }

      fs.readFile(path.join(dir, filename), streamKeyValue)

      function streamKey(statErr, stats) {
        if(statErr || !stats.isFile()) {
          --count

          return next()
        }

        stream.push(justName(filename))

        next()
      }

      function streamKeyValue(fileErr, data) {
        if(fileErr) {
          --count

          return next()
        }

        var result
          , value

        value = jsonParse(data)

        if(value === false) {
          return
        }

        if(options.keys === false) {
          result = value
        } else {
          result = {
              key: justName(filename)
            , value: value
          }
        }

        stream.push(result)

        next()
      }
    }

    function jsonParse(data) {
      var obj

      try {
        obj = JSON.parse(data.toString())
      } catch(e) {
        stream.emit('error', e)

        return false
      }

      return obj
    }

    function next() {
      if(!files.length) {
        return end()
      }

      streamFile(files.shift())
    }
  }

  function end() {
    stream.push(null)
  }

  function filterStartEnd(el) {
    var compare = path.basename(el, extension)

    if(options.start && options.start > compare) {
      return false
    }

    if(options.end && options.end < compare) {
      return false
    }

    return true
  }
}

function justName(filename) {
  return path.basename(filename, path.extname(filename))
}
