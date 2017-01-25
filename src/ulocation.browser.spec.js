var expect = require('chai').expect

var Location = require('./ulocation.node')

global.document = require('./document-shim')

describe('Location(url, [base])  /* node tests */', function(){
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

	it('protocol', function(){
		expect(l).to.have.a.property('protocol')
		expect(l.protocol).to.eq('https:')
	})

	it('username', function(){
		expect(l).to.have.a.property('username')
		expect(l.username).to.eq('joe')
	})

	it('password', function(){
		expect(l).to.have.a.property('password')
		expect(l.password).to.eq('secret')
	})

	it('hostname', function(){
		expect(l).to.have.a.property('hostname')
		expect(l.hostname).to.eq('example.com')
	})

	it('host (alias for hostname)', function(){
		expect(l).to.have.a.property('host')
		expect(l.host).to.eq(l.hostname)
	})

	it('port', function(){
		expect(l).to.have.a.property('port')
		expect(l.port).to.eq('80')
	})

	it('pathname', function(){
		expect(l).to.have.a.property('pathname')
		expect(l.pathname).to.eq('/faq')
	})

	it('search', function(){
		expect(l).to.have.a.property('search')
		expect(l.search).to.eq('?q=Hello')
	})

	it('hash', function(){
		expect(l).to.have.a.property('hash')
		expect(l.hash).to.eq('#footer')
	})

	it('origin', function(){
		expect(l).to.have.a.property('origin')
		expect(l.origin).to.eq('https://example.com:80')
	})

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
		expect(l.host).to.eq(l.hostname)
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
		expect(l.host).to.eq(l.hostname)
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
		expect(l.host).to.eq(l.hostname)
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
})
