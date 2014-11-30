var test = require('tape')

var readStream = require('../')

test('streams keys and values of everything by default', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir')
    , results = []
    , expected

  expected = [
      {key: 'a', value: {lol: true}}
    , {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
    , {key: 'h', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('streams keys and values in reverse if specified', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {reverse: true})
    , results = []
    , expected

  expected = [
      {key: 'a', value: {lol: true}}
    , {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
    , {key: 'h', value: {lol: true}}
  ].reverse()

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('streams just keys if specified', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {values: false})
    , results = []
    , expected

  expected = ['a', 'b', 'bar', 'c', 'd', 'e', 'f', 'h']

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('streams just values if specified', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {keys: false})
    , results = []
    , expected

  expected = [
      {lol: true}
    , {lol: true}
    , {lol: true}
    , {lol: true}
    , {lol: true}
    , {lol: true}
    , {lol: true}
    , {lol: true}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('respects start value', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {start: 'bar'})
    , results = []
    , expected

  expected = [
      {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
    , {key: 'h', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('respects start value even if no key matches', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {start: 'ba'})
    , results = []
    , expected

  expected = [
      {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
    , {key: 'h', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('respects end value', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {end: 'd'})
    , results = []
    , expected

  expected = [
      {key: 'a', value: {lol: true}}
    , {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('respects end value even if no key matches', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {end: 'g'})
    , results = []
    , expected

  expected = [
      {key: 'a', value: {lol: true}}
    , {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('reverse and start+end play nice', function(t) {
  t.plan(1)

  var stream_options = {start: 'bar', end: 'g', reverse: true}

  var stream = readStream(__dirname + '/json-dir', stream_options)
    , results = []
    , expected

  expected = [
      {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
  ].reverse()

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('start+end works', function(t) {
  t.plan(1)

  var stream_options = {start: 'bar', end: 'g'}

  var stream = readStream(__dirname + '/json-dir', stream_options)
    , results = []
    , expected

  expected = [
      {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('start and end values are sorted logically', function(t) {
  t.plan(1)

  var stream_options = {start: 'g', end: 'bar'}

  var stream = readStream(__dirname + '/json-dir', stream_options)
    , results = []
    , expected

  expected = [
      {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})
test('limit works', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {limit: 3, start: 'b'})
    , results = []
    , expected

  expected = [
      {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})

test('-1 limit works', function(t) {
  t.plan(1)

  var stream = readStream(__dirname + '/json-dir', {limit: -1, start: 'b'})
    , results = []
    , expected

  expected = [
      {key: 'b', value: {lol: true}}
    , {key: 'bar', value: {lol: true}}
    , {key: 'c', value: {lol: true}}
    , {key: 'd', value: {lol: true}}
    , {key: 'e', value: {lol: true}}
    , {key: 'f', value: {lol: true}}
    , {key: 'h', value: {lol: true}}
  ]

  stream.on('data', function(data) {
    results.push(data)
  })

  stream.on('end', function() {
    t.deepEqual(results, expected)
  })
})
