# ulocation
Microscopically small universal URL to Location parser

[![npm](https://img.shields.io/npm/v/ulocation.svg)](https://npmjs.com/package/ulocation)
[![license](https://img.shields.io/npm/l/ulocation.svg)](https://github.com/Download/ulocation/blob/master/LICENSE.md)
[![travis](https://img.shields.io/travis/Download/ulocation.svg)](https://travis-ci.org/Download/ulocation)
[![greenkeeper](https://img.shields.io/david/Download/ulocation.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

**ulocation** is a microscopically small universal (works in node and the browser)
url parser that returns location objects that closely mimic those used in browsers. 

If you need to parse the querystring in the `search` field, use [uqs](https://npmjs.com/package/uqs).

ulocation supports the `origin` field on locations, shimming it in browsers that still lack support.

This library depends on [uevents](https://npmjs.com/package/uevents).

## Install
```sh
npm install --save ulocation
```

## require
```js
var Location = require('ulocation')
```

## import
```js
import Location from 'ulocation'
```

## use
```js
import Location from 'ulocation'
var loc = new Location('https://joe:secret@example.com:80/home/faq?q=hello#footer')

// the url is parsed into it's constitutent parts 
// (using native parsing in browsers and some logic in Node):
//
//   https://joe:secret@example.com:80/home/faq?q=hello#footer
//   \____/  \_/ \____/ \_________/ \/\_______/\______/\_____/
//	    |     |     |        |       |    |        |      |
//  protocol  |  password    |     port   |      search   |
//        username       hostname      pathname          hash

console.info(loc.href)       // > 'https://joe:secret@example.com:80/home/faq?q=hello#footer'
console.info(loc.protocol)   // > 'https:'
console.info(loc.username)   // > 'joe'
console.info(loc.hostname)   // > 'example.com'
console.info(loc.search)     // > '?q=hello'
console.info(loc.hash)       // > 'footer'
// ...
```

### The `href` field
The `href` field is backed by getter and setter functions and works like in browsers: set the field 
and all others will update to match it. 

```js
console.info(loc.search)     // > '?q=hello'
loc.href = 'https://joe:secret@example.com:80/home/faq?q=goodbye'
console.info(loc.search)     // > '?q=goodbye'
```

> **Note**: Updating other fields is not recommended as there are no checks on it and your location 
object will become internally inconsistent. Except for the `href` field, you should treat the location
object as if it was immutable.

#### The `change` event
Locations are [EventEmitter](https://npmjs.com/package/uevents)s. Whenever the `href` field is updated, 
the location object emits a `'change'` event. To listen for it, attach a listener using `on()`:

```js
// loc is the location object from the previous example
loc.on('change', function(){
	console.info(this.href)
})

loc.href = 'https://joe:secret@example.com:80/home/faq?q=hello#footer'

// >  'https://joe:secret@example.com:80/home/faq?q=hello#footer'
```

### Parsing the querystring
Given a location `loc`, you can parse the querystring in it's `search` field 
using [uqs](https://github.com/download/uqs).

```js
// loc is the location object from the previous example
var QS = require('uqs')
var params = QS.parse(loc.search)
console.info(params)         // > Object {q:'hello'}
```

### Relative URLs and the `base` parameter
Relative URLs will be interpreted relative to the current location automatically on 
browsers, but there is no such thing on Node and in browsers we may want different behavior. 
So we can pass a `base` parameter to `Location` and it will use that URL as the base URL 
when constructing the location or updating it when the `href` field is set.

```js
// loc is the location object from the previous example
var rel = new Location('/test?x=y#header', loc.href) // <-- use as base
console.info(rel.href)       // > 'https://joe:secret@example.com:80/home/test?x=y#header'
console.info(rel.protocol)   // > 'https:'
console.info(rel.username)   // > 'joe'
console.info(rel.hostname)   // > 'example.com'
console.info(rel.search)     // > '?x=y'
console.info(rel.hash)       // > 'header'
```

## Microscopically small
The browser version of ulocation is just ~1kB minified and zipped. 
Due to it's tiny size it does not come as a separate download. Instead you should use 
[Browserify](http://browserify.org/) or [Webpack](https://webpack.js.org/) to include 
it in your bundle.

## Issues
Add an issue in this project's [issue tracker](https://github.com/download/ulocation/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2017 by [Stijn de Witt](https://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [MIT](https://github.com/download/ulocation/blob/master/LICENSE.md) Open Source license.
