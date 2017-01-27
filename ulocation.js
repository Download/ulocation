module.exports = Location
module.exports.parse = parse
module.exports.stringify = str

function Location(x, base) {
	// allow new-less invocation
	if (! this instanceof Location) return new Location(x, base)
	// store the mapped and resolved parts
	var parts = resolve(map(Array.isArray(x) ? x : split(x)), base)
	filter(parts, PROP).forEach((function(x){
		// Accessor properties
		Object.defineProperty(this, x.p, {
			get: function(){return x.v},
			set: function(v){x.v = v; this.emit && this.emit('change')}
		})
	}).bind(this))
	Object.defineProperties(this, {
		// Calculated properties
		href: {
			get: function(){return str(this)},
			set: function(val){
				var h = new Location(val, base).href
				if (this.href != h) {
					split(h).forEach(function(v,i){parts[i].v = v})
					this.emit && this.emit('change')
				}
			}
		},
		host: {get: function(){return this.hostname + (this.port ? ':' + this.port : '')}},
		origin: {get: function(){return this.protocol ? this.protocol + '//' + this.host : ''}},
		baseURI: {get: function(){return base || this.href}},
		// custom toString
		toString: {value: str.bind(this, this)}
	})
	return this
}

function split(x) {
		// https://tools.ietf.org/html/rfc3986#appendix-B
		var r = [].slice.call(x.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)) 
		r = r.concat((r[ 4] || '').match(/^(([^@]+)?@)?([^:]+)(:(.*))?/))
		r = r.concat((r[12] || '').match(/^([^:]+)?(:(.*))?/))
		return r
}

function str(x) {
	return (x.protocol ? x.protocol + '//' : '') + (x.username ? x.username + (x.password ? ':' + x.password : '') + '@' : '') +
				 x.hostname + (x.port ? ':' + x.port : '') + x.pathname + x.search + x.hash
}

function parse(x, base){
	return Location(x, base)
}

function resolve(x, base) {
	// if we have a base and url is relative, resolve against the given base
	if (base && !x[3].v) {
		var b = base && map(split(base))
		filter(x, BASE).forEach(function(p){p.v = b[p.i].v})
		if (x[5].v) {
			var paths = b[5].v.split('/')
			if (x[5].v.indexOf('/')) {
				// relative path
				x[5].v.split('/').forEach(function(p){
					if (p == '..' && paths.length) paths.pop()
					else if (p != '.') paths.push(p)
				})
				x[5].v = paths.join('/')
			}
		}	
		else {
			x[5].v = b[5].v
			if (! x[6].v) {
				x[6].v = b[6].v
				if (! x[8].v) x[8].v = b[8].v
			}
		}
	}
	return x
}

function map(x) {return PROPS.map(function(p,i){return {p:p, v:x[i] || '', i:i, is:function(flag){return PARTS[p] & flag}}})}
function filter(x, flag) {return x.filter(function(x){return x.is(flag)})}

var 
PROP=1, BASE=2, PARTS = {
	href:0, protocol:3, scheme:0, authority:0, h:0, pathname:1, search:1, querystring:0, hash:1, fragment:0, 
	host:0, id:0, credentials:0, hostname:3, suffix:0, port:3, c:0, username:3, pass:0, password:3
}, PROPS = Object.keys(PARTS)
