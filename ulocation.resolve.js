module.exports = function resolve(url, base) {
	var u = this(url), b = this(base), idx = url.indexOf('/')
	url = (idx !== 0) && (b.path.charAt(b.path.length - 1) === '/') ? b.path + url : url 
	if (! u.protocol) {
		return this(
			(b.protocol ? b.protocol + '//' : '') + 
			(b.username ? b.username + (b.password ? ':' + b.password : '') + '@' : '') +
			b.hostname +
			(b.port ? ':' + b.port : '') +
			url
		)
	}
	return u
}

