function ulocation(url) {
	if (url === undefined || url === null) return url
	return new Location(url)
}

function Location(url) {
	this.href = url
	this.protocol = ''
	this.username = ''
	this.hostname = ''
	this.port = ''
	this.pathname = ''
	this.search = ''
	this.hash = ''

	var sep = url.indexOf('?')
	if (sep != -1) {
		var qs = url.substring(sep)
		var idx = qs.indexOf('#')
		if (idx != -1) {
			this.hash = qs.substring(idx)
			qs = qs.substring(0, idx)
		}
		this.search = qs
		url = url.substring(0, sep)
	}
			
	sep = url.indexOf("://");
	if (sep != -1) {
		this.protocol = url.substring(0, sep + 1)
		url = url.substring(sep + 3)
	}

	sep = url.indexOf("/");
	if (sep != -1) {
		this.hostname = url.substring(0, sep)
		url = url.substring(sep)
	}
	else {
		this.hostname = url
		url = ''
	}

	// get user, password and port
	sep = this.hostname.indexOf("@")
	if (sep != -1) {
		this.username = this.hostname.substring(0, sep);
		this.hostname = this.hostname.substring(sep + 1);
		sep = this.username.indexOf(':')
		if (sep != -1) {
			this.password = this.username.substring(sep + 1)
			this.username = this.username.substring(0, sep)
		}
	}
	sep = this.hostname.indexOf(":");
	if (sep != -1) {
		this.port = this.hostname.substring(sep + 1);
		this.hostname = this.hostname.substring(0, sep);
	}

	this.host = this.hostname
	this.pathname = url
  this.origin = this.protocol + '//' + this.hostname + (this.port ? ':' + this.port : '')
}

Location.prototype.toString = function(){return this.href}

module.exports = ulocation
