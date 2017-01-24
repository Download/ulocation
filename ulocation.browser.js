function ulocation(url, base, doc){
	if (url === undefined || url === null) return url
	return new Location(url, base, doc || ((typeof document == 'object') && document))
}

ulocation.resolve = require('./ulocation.resolve')

function Location(url, base, doc){
	if (base) return ulocation.resolve(url, base, doc)

  var a = doc.createElement('a')
  a.href = url
  this.href = a.href
  this.protocol = a.protocol
  this.username = a.username
  this.password = a.password
  this.hostname = a.hostname
  this.port = a.port
  this.pathname = a.pathname
  this.search = a.search
  this.hash = a.hash
  this.host = a.host
  this.origin = a.origin || a.protocol + '//' + a.hostname + (a.port ? ':' + a.port : '')
}

Location.prototype.toString = function(){return this.href}

module.exports = ulocation
