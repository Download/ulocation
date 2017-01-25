var a

function parse(url) {
	a = a || document.createElement('a')
  a.href = url
  var r = {
  	protocol: a.protocol,
  	username: a.username,
  	password: a.password,
  	hostname: a.hostname,
  	port: a.port,
  	pathname: a.pathname,
  	search: a.search,
  	hash: a.hash,
  	host: a.host,
	}
	r.origin = a.origin || (r.protocol ? (r.protocol + '//' + a.hostname + (p.port ? ':' + p.port : '')) : '')
	return r
}

module.exports = parse
