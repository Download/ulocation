function parse(url) {
	url = url || ''
	var r = {
		href: url,
		protocol: '',
		username: '',
		password: '',
		hostname: '',
		host: '',
		port: '',
		pathname: '',
		search: '',
		hash: '',
	}

	var sep = url.indexOf('?')
	if (sep != -1) {
		var qs = url.substring(sep)
		var idx = qs.indexOf('#')
		if (idx != -1) {
			r.hash = qs.substring(idx)
			qs = qs.substring(0, idx)
		}
		r.search = qs
		url = url.substring(0, sep)
	}
			
	sep = url.indexOf("://");
	if (sep != -1) {
		r.protocol = url.substring(0, sep + 1)
		url = url.substring(sep + 3)
	}

	sep = url.indexOf("/");
	if (sep != -1) {
		r.hostname = url.substring(0, sep)
		url = url.substring(sep)
		// get user, password and port
		sep = r.hostname.indexOf("@")
		if (sep != -1) {
			r.username = r.hostname.substring(0, sep);
			r.hostname = r.hostname.substring(sep + 1);
			sep = r.username.indexOf(':')
			if (sep != -1) {
				r.password = r.username.substring(sep + 1)
				r.username = r.username.substring(0, sep)
			}
		}
		sep = r.hostname.indexOf(":");
		if (sep != -1) {
			r.port = r.hostname.substring(sep + 1);
			r.hostname = r.hostname.substring(0, sep);
		}
		r.host = r.hostname
	}

	r.pathname = url
	r.origin = r.protocol ? r.protocol + '//' + r.hostname + (r.port ? ':' + r.port : '') : ''
	return r
}

module.exports = parse