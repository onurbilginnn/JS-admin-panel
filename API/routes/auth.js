const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', isAuth,
[
    body('username')
    .custom((value, { req }) => {
        return User.findOne({
            where:{
                username: value
            }
        }).then(userDoc => {
            if(userDoc) {
                return Promise.reject('main.errors.backEnd.usernameExists');
            }
        })
    })
    .withMessage('main.errors.backEnd.usernameExists')
    .isLength(5)
    .withMessage('main.errors.backEnd.usernameValid')
    .isAlphanumeric()
    .withMessage('main.errors.backEnd.usernameValid'),
    body('email')
    .custom((value, { req }) => {
        return User.findOne({
            where:{
                email: value
            }
        }).then(userDoc => {
            if(userDoc) {
                return Promise.reject('main.errors.backEnd.emailExists');
            }
        })
    })
    .withMessage('main.errors.backEnd.emailExists')  
    .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'i')
    .withMessage('main.errors.backEnd.emailValid')  
    .normalizeEmail(),
    body('password')
    .custom((value, {req, location, path}) => {
        if(value !== req.body.repPass) {
            return Promise.reject('Passwords do not match!')
        } else {
            return value;
        }
    }).withMessage('Passwords do not match!')
    .trim()   
    .matches( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i' )
    .withMessage('Password must contain one uppercase , one lower case, one special char and one digit!')
    .isLength({
        max:20,
        min:8
    })
    .withMessage('Password must contain min: 8, max: 20 characters!'),  
    body('role')
    .custom((value, { req }) => {
        if(value == 'null') {
            return Promise.reject('Please an enter role!');
        }
        return value;
    })
    .withMessage('Please an enter role!')
    .trim(),
    body('company').notEmpty().withMessage('Please enter a company name!')
],
 authController.signup);

router.post('/login', [
    body('username').notEmpty().withMessage('main.errors.frontEnd.required'),
    body('password').notEmpty().withMessage('main.errors.frontEnd.required')
], authController.login);

module.exports = router;