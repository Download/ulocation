var Location = require('./location')
Location.resolve = require('./resolver')
Location.parse = require('./parser.node')

module.exports = {
	createElement: function(){ 
		return Object.defineProperties({_: new Location()}, {
			protocol: {get:function(){return this._.protocol}},
			username: {get:function(){return this._.username}},
			password: {get:function(){return this._.password}},
			hostname: {get:function(){return this._.hostname}},
			host: {get:function(){return this._.host}},
			port: {get:function(){return this._.port}},
			pathname: {get:function(){return this._.pathname}},
			search: {get:function(){return this._.search}},
			hash: {get:function(){return this._.hash}},
			origin: {get:function(){return this._.origin}},
			href: {
				get: function(){return this._.href},
				set:function(href){this._.href = href;}
			}
		})
	}
}
