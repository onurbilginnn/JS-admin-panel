const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const company = req.body.company;  
    let imageUrl = 'images/avatars/default.jpg';
    if(req.file) {
        imageUrl = req.file.path;
    }
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            username: username,
            email: email, 
            password: hashedPassword,
            role: role,
            company: company,
            imageUrl: imageUrl
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message: 'User created.', userId: result.id});
    })
    .catch(err => {
        if(!err.statusCode) {
             err.statusCode = 500;
        }
        next(err);
     });
}

exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const username = req.body.username; 
    const password = req.body.password;
    let loadedUser;   
        User.findOne({ where: { username: username }})
        .then(user => {            
            if(!user) {
                const error = new Error('main.errors.backEnd.compareNamePassword');
                error.statusCode = 401;
                throw error;
            }    
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual) {
                const error = new Error('main.errors.backEnd.compareNamePassword');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                username: loadedUser.username,
                userId: loadedUser.id.toString()
            }, 'tokenicingerekliolancokonemlibircumle',
            {expiresIn: '1h'});
            res.status(200).json({token: token,
                 userId: loadedUser.id.toString(),
                 username: loadedUser.username,
                 userRole: loadedUser.role,
                 imageUrl: loadedUser.imageUrl,
                 expiresIn: 3600               
                })
        })
        .catch(err => {
            if(!err.statusCode) {
                 err.statusCode = 500;
            }
            next(err);
         });    
}