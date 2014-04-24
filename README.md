json-readdir-stream
====

[![Build Status](https://travis-ci.org/jarofghosts/json-readdir-stream.svg)](https://travis-ci.org/jarofghosts/json-readdir-stream)

like [levelup's `createReadStream()`](https://github.com/rvagg/node-levelup#createReadStream)
for a directory of JSON files

## example

```js
var jrs = require('json-readdir-stream')

// takes a directory and an options object, options shown with defaults
var stream = jrs(__dirname + '/json-files', {
    start: '' // start at the beginning
  , end: '' // ..end at the end
  , reverse: false // stream in alphabetical order
  , keys: true // include keys in stream
  , values: true // include values in stream
  , limit: -1 // limit results to value, -1 is no limit
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
