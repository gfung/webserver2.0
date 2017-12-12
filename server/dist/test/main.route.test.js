"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const app_1 = require("../server/app");
chai.use(chaiHttp);
const expect = chai.expect;
describe('baseRoute', () => {
    //type of response
    it('should be html', (done) => {
        chai.request(app_1.default).get('/').then((res) => {
            expect(res.type).to.eql('text/html');
            done();
        });
    });
    //response message
    it('should have no body prop', (done) => {
        chai.request(app_1.default).get('/').then((res) => {
            expect(res.body).to.eql({});
            done();
        });
    });
});
//# sourceMappingURL=main.route.test.js.map