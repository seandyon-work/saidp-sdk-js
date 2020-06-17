var express = require('express');
var router = express.Router();

const { SecureAuth } = require('../SecureAuth');
const api = new SecureAuth();


router.get('/dfp', function(req,res) {
    api.dfp.getDfpScript().then(result => res.json(result));
});

router.get('/user/:user/profile', function(req, res) {
    api.profile.getUserProfile(req.params.user).then(result => res.json(result));
});

router.get('/user/:user/mfamethods', function(req, res) {
    api.profile.getUserMFAFactors(req.params.user).then(result => res.json(result));
});

router.get('/user/:user', function(req, res) {    
    api.auth.validateUser(req.params.user).then(result => res.json(result));
});

router.get('/user/:user/pwd/:pwd', function(req, res) {    
    api.auth.validatePassword(req.params.user, req.params.pwd).then(result => res.json(result)); 
});

router.get('/user/:user/pwd/:pwd/reset', function(req, res) {    
    api.profile.idm.resetPassword(req.params.user, req.params.pwd).then(result => res.json(result)); 
});

router.get('/user/:user/phone/:phone', function(req, res) {
    api.auth.sendSMSOTP(req.params.user, req.params.phone).then(result => res.json(result));
});

router.get('/user/:user/adhocemail/:email', function(req, res) {
    api.auth.sendAdHocEmailOTP(req.params.user, req.params.email).then(result => res.json(result));
});

router.get('/ipeval/:user', function(req,res) {
    // check ip from request header if behind proxy, then remoteAddress
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    // check if local ip address, then use an ip for testing
    if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') { ip = '162.247.72.201' }
    api.adaptive.evaluateIP(req.params.user, ip).then(request => res.json(request));
});

router.get('/createuser', function(req, res) {
    let m = api.models;
    m.profileProperties.userId = 'test_user3';
    m.profileProperties.password = 'test';
    m.profileProperties.properties.firstName = "Test";
    m.profileProperties.properties.lastName = "User";
    m.profileProperties.properties.phone1 = '123-456-7890';
    m.profileProperties.properties.email1 = 'test@test.com';
    api.profile.idm.createUser(m.profileProperties).then(request => res.json(request));
});

module.exports = router