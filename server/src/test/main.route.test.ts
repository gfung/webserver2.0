import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../server/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
	//type of response
	it('should be html', (done) => {
		chai.request(app).get('/').then((res) => {
			expect(res.type).to.eql('text/html');
			done();
		})
	});
	//response message
	it('should have no body prop', (done) => {
		chai.request(app).get('/').then((res) => {
			expect(res.body).to.eql({});
			done();
		});
	});
});
