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

**ulocation** supports the `origin` field on locations, shimming it in browsers that still lack support.

## Install
```sh
npm install --save ulocation
```

## require
```js
var ulocation = require('ulocation')
```

## import
```js
import ulocation from 'ulocation'
```

## use
```js
import ulocation from 'ulocation'
var loc = ulocation('https://joe:secret@example.com:80/home/faq?q=hello#footer')
// or, shorthand
var loc = require('ulocation')('https://joe:secret@example.com:80/home/faq?q=hello#footer')

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
// ...

// optional:
var QS = require('uqs')
var params = QS.parse(loc.search)
console.info(params)         // > Object {q:'hello'}
```

## Microscopically small
The browser version of ulocation is just ~0.5kB minified and zipped. 
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
