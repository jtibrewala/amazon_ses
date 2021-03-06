'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Require the dev-dependencies
var supertest = require('supertest'),
    should = require('should'), // eslint-disable-line
    express = require('../app'),
    app = {},
    server = {};
describe('Backlist manage API -- ', function() {

    before(function(next) {
        app = express.listen(function() {
            if (app.address().port) {
                next();
            }
        });
        server = supertest(app)
    });

    it('/GET Ideally status for Amazon SES application', function(done) { //API test to determine the app version
        server
            .get('/status')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.equal(200);
                done();
            });
    });

    it('/GET List of all the email blacklist', function(done) { //API test list all the blacklisted emails
        server
            .get('/blacklist')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.equal(200);
                done();
            });
    });

    it('/Delete Remove the email address from the blacklist', function(done) { //API test delete a email from the blacklist
        server
            .delete('/blacklist/bounce@simulator.amazonses.com')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.equal(200);
                done();
            });
    });


    after(function() {
        // stop listening that port
        app.close();
    });

});