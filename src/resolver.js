/**
 * Resolves `url` against `base`, returning a new `Location`
 */
function resolve(url, base) {
	var r = new this(url)
	if (base) {
		var b = this.parse(base), idx = r.pathname.indexOf('/') || 0
		if (!r.origin || r.origin == b.origin) {
			r.protocol = b.protocol
			r.username = b.username
			r.password = b.password
			r.hostname = b.hostname
			r.host = b.host
			r.port = b.port
			if ((idx !== 0) && (b.pathname.charAt(b.pathname.length - 1) === '/')) {
				r.pathname = b.pathname + r.pathname
			}
		}
		if (! r.base) Object.defineProperties(r, {base: {value: base, writable:false}})
	}	
	return r
}

module.exports = resolve
