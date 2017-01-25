var EventEmitter = require('uevents')

function Location(url, base) {
	if (base) return Location.resolve(url, base)
	if (! this instanceof Location) return new Location(url, base)
	if (! this.emit) EventEmitter(this)
	if (! this.href) {
		Object.defineProperties(this, {
			href: {
				get: function(){
					return (this.protocol ? this.protocol + '//' : '') +
								(this.username ? this.username + (this.password ? ':' + this.password : '') + '@' : '') +
								this.hostname +
								(this.port ? ':' + this.port : '') +
								this.pathname +
								this.search +
								this.hash
				},
				set: function(url){
					Location.call(this, url, url.base)
					this.emit('change')
				},
			},
			origin: {
				get: function(){return this.protocol ? this.protocol + '//' +	this.hostname +	(this.port ? ':' + this.port : '') : ''},
			}
		})
	}

	var p = Location.parse(url)
	this.protocol = p.protocol
	this.username = p.username
	this.password = p.password
	this.hostname = p.hostname
	this.host = p.hostname
	this.port = p.port
	this.pathname = p.pathname
	this.search = p.search
	this.hash = p.hash
}

Location.prototype.toString = function(){return this.href}

module.exports = Location
