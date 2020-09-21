// const uniqid = require('uniqid');
const { validationResult } = require('express-validator')

const Prod = require('../models/product');

exports.getProdDatas = (req, res, next) => {
    Prod.findAll()
    .then(prodDatas => {
        if(!prodDatas) {
            const error = new Error('Could not get production datas!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Production datas fetched.', data: prodDatas});
    })
    .catch(err => {
        if(!err.statusCode) {
             err.statusCode = 500;
        }
        next(err);
     });
};

exports.postProdData = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect!');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const prod = new Prod({
        title: title,
        content: content,
        imageUrl: 'images/test.png',
        TUserId: req.user.id
    });
    prod.save()
    .then(result => {
        res.status(201).json({
            message: 'Production data created successfully.',
            data: result
        });
    })
    .catch(err => {
       if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    });    
}

exports.getProdData = (req, res, next) => {
    const prodDataId = req.params.prodDataId;
    Prod.findByPk(prodDataId)
    .then(prodData => {
        if(!prodData) {
            const error = new Error('Could not find production data!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Production data fetched.', data: prodData});
    })
    .catch(err => {
        if(!err.statusCode) {
             err.statusCode = 500;
        }
        next(err);
     });
}