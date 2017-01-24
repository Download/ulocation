var ulocation = require('./ulocation')

module.exports = {
	createElement: function(){ 
		return	Object.defineProperties({_: ulocation()}, {
			protocol: {get:function(){return this._.protocol}},
			username: {get:function(){return this._.username}},
			password: {get:function(){return this._.password}},
			hostname: {get:function(){return this._.hostname}},
			host: {get:function(){return this._.host}},
			port: {get:function(){return this._.port}},
			pathname: {get:function(){return this._.pathname}},
			search: {get:function(){return this._.search}},
			hash: {get:function(){return this._.hash}},
			username: {get:function(){return this._.username}},
			href: {
				get: function(){return this._.href},
				set:function(href){this._ = ulocation(href);}
			}
		})
	}
}
