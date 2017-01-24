var expect = require('chai').expect

var ulocation = require('./ulocation.browser')
// shim
global.document = require('./document-shim')

var url = 'https://joe:secret@example.com:80/faq?q=Hello#footer',
		l = ulocation(url)

describe('ulocation(url, [base])  // browser tests', function(){
	it('is a function', function(){
		expect(ulocation).to.be.a('function')
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
		var base = 'https://joe:secret@example.com:80/faq?q=Hello#footer'
		url = '/test?x=y#header'
		l = ulocation(url, base)
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
})
