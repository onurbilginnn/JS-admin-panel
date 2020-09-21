const express = require('express');
const { body } = require('express-validator');

const prodController = require('../controllers/prod');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /prod/prod_data
router.get('/prod_datas', prodController.getProdDatas);

// POST /prod/post_prod_data
router.post('/post_prod_data', [
    body('title').trim().isLength(3).withMessage('Title length must be min 3'),
    body('content').trim().isLength(5).withMessage('Content length must be min 5')
], prodController.postProdData);

router.get('/prod_data/:prodDataId', prodController.getProdData);

module.exports = router;