const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {storeReturnTo} = require('../middleware.js');
const userController = require('../controllers/user');

router.route('/register')
    .get(userController.renderRegister)
    .post(catchAsync(userController.addUser))

router.route('/login')
    .get(userController.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login)

router.route('/logout')
    .get(userController.logout)

module.exports = router;