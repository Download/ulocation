
function Location(x, base) {
	// allow new-less invocation
	if (! (this instanceof Location)) return new Location(x, base)
	// store the mapped and resolved backing object
	var _ = resolve(x, base)

	// create properties for each part
	Object.keys(_).forEach(function(p){
		Object.defineProperty(this, p, {
			get: function(){return _[p]},
			set: function(v){_[p] = v; this.emit && this.emit('change')}
		})
	}.bind(this))

	Object.defineProperties(this, {
		// Calculated properties
		href: {get: stringify, set: assign},
		host: {get: function(){return this.hostname + (this.port ? ':' + this.port : '')}},
		origin: {get: function(){return this.protocol ? this.protocol + '//' + this.host : ''}},
		baseURI: {get: function(){return base || this.href}},
		// methods
		toString: {value: stringify},
		assign: assign,
	})

	return this

	function assign(v, c){
		v = resolve(parse(v), this.baseURI)
		Object.keys(v).forEach(function(p){
			c |= _[p] !== (_[p] = v[p])
		})
		c && this.emit && this.emit('change')
	}	
}

module.exports = Location
Location.parse = function(x, base){return Location(x, base)}
Location.stringify = stringify

// IMPLEMENTATION

function parse(x) {
	// just return the argument unchanged if it's not a string
	if (! (typeof x == 'string' || x instanceof String)) return x
	// parse with regular expressions. 
	// The first step comes straight from the rfc: https://tools.ietf.org/html/rfc3986#appendix-B
	var m = [].slice.call(x.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/))
	// m is now an array with a whole bunch of parts, but we need to further parse field #4 in case it contains credentials
	m = m.concat((m[ 4] || '').match(/^(([^@]+)?@)?([^:]+)(:(.*))?/))
	// m now contains the combined results from the previous matches. Finally parse field #12 for username password
	m = m.concat((m[12] || '').match(/^([^:]+)?(:(.*))?/))
	// define an index to get at the fields we actually care about
	var IDX = {protocol:1, username:17, password:19, hostname:13, port:15, pathname:5, search:6, hash:8}
	// loop through all keys and accumulate them in the result object
	return Object.keys(IDX).reduce(function(r, p){r[p] = m[IDX[p]] || ''; return r}, {})
}

function stringify(x) {
	x = x || this || {}
	return (x.protocol ? x.protocol + '//' : '') + (x.username ? x.username + (x.password ? ':' + x.password : '') + '@' : '') +
				 x.hostname + (x.port ? ':' + x.port : '') + x.pathname + x.search + x.hash
}

function resolve(x, base) {
	x = parse(x)
	// if we have a base and url is relative, resolve against the given base
	if (base && !x.protocol) {
		var b = parse(base)
		if (x.hostname) x.protocol = b.protocol // url of the form '//example.com/...', inherit protocol from base
		else {
			// copy protocol, username, password, hostname and port
			Object.keys(b).slice(0, 5).forEach(function(k){x[k] = b[k]})
			if (x.pathname) {
				// relative? (not starting with slash)
				if (x.pathname.indexOf('/')) {
					var paths = b.pathname.split('/')
					// if multiple segments, remove last segment (either file ref or blank)
					if (paths.length > 1) paths.pop()
					// process path parts (e.g. '.' and '..')
					x.pathname.split('/').forEach(function(p){
						if (p == '..') paths.length > 1 && paths.pop()
						else if (p != '.') paths.push(p)
					})
					x.pathname = paths.join('/')
				} 
				// else { /* absolute, use as-is */ }
			} else {
				// no path, assign from base
				x.pathname = b.pathname
				if (! x.search) {
					// no search, assign from base
					x.search = b.search
					if (! x.hash) x.hash = b.hash // no hash, assign from base
				}
			}
		}
	}
	return x
}

