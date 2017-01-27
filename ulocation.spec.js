var expect = require('chai').expect
var EventEmitter = require('uevents')

var Location = require('./ulocation')

describe('Location(url, [base]) ', function(){
	var url, base, l

	beforeEach(function(){
		url = 'https://joe:secret@example.com:80/faq?q=Hello#footer'
		base = 'https://joe:secret@example.com:80/'
		l = new Location(url, base)
	})

	it('is a function', function(){
		expect(Location).to.be.a('function')
	})

	it('accepts a URL as parameter and returns a location object', function(){
		expect(l).to.be.an('object')
	})

	it('parses the url into it\'s constituent parts', function(){
		expect(l).to.have.a.property('href')
		expect(l.href).to.eq(url)
	})

	it('protocol  /* Protocol scheme of the URL, including the final \':\'. E.G: \'http:\' */', function(){
		expect(l).to.have.a.property('protocol')
		expect(l.protocol).to.eq('https:')
	})

	it('username  /* The username specified before the domain name */', function(){
		expect(l).to.have.a.property('username')
		expect(l.username).to.eq('joe')
	})

	it('password  /* The password specified before the domain name */', function(){
		expect(l).to.have.a.property('password')
		expect(l.password).to.eq('secret')
	})

	it('hostname  /* The domain of the URL */', function(){
		expect(l).to.have.a.property('hostname')
		expect(l.hostname).to.eq('example.com')
	})

	it('port  /* The port number of the URL, or \'\' */', function(){
		expect(l).to.have.a.property('port')
		expect(l.port).to.eq('80')
	})

	it('pathname  /* \'/\' followed by the path of the URL, or \'\' */', function(){
		expect(l).to.have.a.property('pathname')
		expect(l.pathname).to.eq('/faq')
	})

	it('search  /* \'?\' followed by the parameters of the URL, or \'\' */', function(){
		expect(l).to.have.a.property('search')
		expect(l.search).to.eq('?q=Hello')
	})

	it('hash  /* \'#\' followed by the fragment identifier of the URL, or \'\' */', function(){
		expect(l).to.have.a.property('hash')
		expect(l.hash).to.eq('#footer')
	})

	it('adds calculated properties `href`, `host`, `origin` and `baseURI`', function(){
		expect(l).to.have.a.property('href')
		expect(l).to.have.a.property('host')
		expect(l).to.have.a.property('origin')
		expect(l).to.have.a.property('baseURI')
	})

	it('href  /* The entire URL */', function(){
		expect(l).to.have.a.property('href')
		expect(l.href).to.eq(url)
	})

	it('host  /* (read-only) The hostname, a \':\', and the port of the URL */', function(){
		expect(l).to.have.a.property('host')
		expect(l.host).to.eq('example.com:80')
	})

	it('origin  /* (read-only) The canonical form of the origin of the specific location */', function(){
		expect(l).to.have.a.property('origin')
		expect(l.origin).to.eq('https://example.com:80')
	})

	it('baseURI  /* (read-only) The base URL that is used to resolve relative URLs */', function(){
		expect(l).to.have.a.property('baseURI')
		expect(l.baseURI).to.eq(base)
	})

	// Whenever any non-calculated property is set, the calculated properties update automatically
	it('updates all calculated properties automatically whenever any non-calculated property is set */', function(){
		l.port = 8080
		expect(l.href).to.eq('https://joe:secret@example.com:8080/faq?q=Hello#footer')
		expect(l.host).to.eq('example.com:8080')
		expect(l.origin).to.eq('https://example.com:8080')
	})

	
	// Whenever href is set, all properties update automatically

	it('resolves `url` relative to `base` if base is passed and url is relative', function(){
		var url = '/test?x=y#header'    // shadow global url
		var l = new Location(url, base) // shadow global l
		expect(l).to.have.a.property('href')
		expect(l.href).to.eq('https://joe:secret@example.com:80/test?x=y#header')
		expect(l).to.have.a.property('protocol')
		expect(l.protocol).to.eq('https:')
		expect(l).to.have.a.property('username')
		expect(l.username).to.eq('joe')
		expect(l).to.have.a.property('password')
		expect(l.password).to.eq('secret')
		expect(l).to.have.a.property('hostname')
		expect(l.hostname).to.eq('example.com')
		expect(l).to.have.a.property('host')
		expect(l).to.have.a.property('port')
		expect(l.port).to.eq('80')
		expect(l).to.have.a.property('pathname')
		expect(l.pathname).to.eq('/test')
		expect(l).to.have.a.property('search')
		expect(l.search).to.eq('?x=y')
		expect(l).to.have.a.property('hash')
		expect(l.hash).to.eq('#header')
		expect(l).to.have.a.property('origin')
		expect(l.origin).to.eq('https://example.com:80')
	})

	it('updates it\'s properties when `href` is set to a new url', function(){
		expect(l.href).to.eq(url)
		expect(l).to.have.a.property('protocol')
		expect(l.protocol).to.eq('https:')
		expect(l).to.have.a.property('username')
		expect(l.username).to.eq('joe')
		expect(l).to.have.a.property('password')
		expect(l.password).to.eq('secret')
		expect(l).to.have.a.property('hostname')
		expect(l.hostname).to.eq('example.com')
		expect(l).to.have.a.property('host')
		expect(l).to.have.a.property('port')
		expect(l.port).to.eq('80')
		expect(l).to.have.a.property('pathname')
		expect(l.pathname).to.eq('/faq')
		expect(l).to.have.a.property('search')
		expect(l.search).to.eq('?q=Hello')
		expect(l).to.have.a.property('hash')
		expect(l.hash).to.eq('#footer')
		expect(l).to.have.a.property('origin')
		expect(l.origin).to.eq('https://example.com:80')
		
		var newUrl = 'http://www.example.org:8080/tests?test=set-href#check'
		l.href = newUrl

		expect(l.href).to.eq(newUrl)
		expect(l).to.have.a.property('protocol')
		expect(l.protocol).to.eq('http:')
		expect(l).to.have.a.property('hostname')
		expect(l.hostname).to.eq('www.example.org')
		expect(l).to.have.a.property('host')
		expect(l).to.have.a.property('port')
		expect(l.port).to.eq('8080')
		expect(l).to.have.a.property('pathname')
		expect(l.pathname).to.eq('/tests')
		expect(l).to.have.a.property('search')
		expect(l.search).to.eq('?test=set-href')
		expect(l).to.have.a.property('hash')
		expect(l.hash).to.eq('#check')
		expect(l).to.have.a.property('origin')
		expect(l.origin).to.eq('http://www.example.org:8080')
	})

	it('fires a `change` event when turned into an event emitter and it\'s `href` is set', function(){
		expect(l.href).to.eq(url)
		var eventFired = false
		EventEmitter(l)
		l.on('change', function(){eventFired = true})
		l.href = 'https://github.com/download'
		expect(eventFired).to.eq(true)
	})
})
