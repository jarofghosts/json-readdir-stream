# json-readdir-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/json-readdir-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/json-readdir-stream)
[![npm install](https://img.shields.io/npm/dm/json-readdir-stream.svg?style=flat-square)](https://www.npmjs.org/package/json-readdir-stream)
[![npm version](https://img.shields.io/npm/v/json-readdir-stream.svg?style=flat-square)](https://www.npmjs.org/package/json-readdir-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/json-readdir-stream.svg?style=flat-square)](https://github.com/jarofghosts/json-readdir-stream/blob/master/LICENSE)

like [levelup's `createReadStream()`][createReadStream] for a directory of JSON
files

## example

```js
var path = require('path')
var fs = require('fs')

var jrs = require('json-readdir-stream')

// takes a directory and an options object, options shown with defaults
var stream = jrs(path.join(__dirname, 'json-files'), {
  start: '', // start at the beginning
  end: '', // ..end at the end
  reverse: false, // stream in alphabetical order
  keys: true, // include keys in stream
  values: true, // include values in stream
  limit: -1 // limit results to value, -1 is no limit
})

stream.pipe(fs.createWriteStream('./db-backup.txt'))
```

## notes

if `keys` is false, **only** the values will be streamed (as strings). if
`values` is false, **only** the keys will be streamed (as strings)

further reading available at
[levelup's docs](https://github.com/rvagg/node-levelup#createReadStream)

## license

MIT

[createReadStream]: https://github.com/rvagg/node-levelup#createReadStream
