const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');

const db = require('../models');
const { Product } = db;

router.get('/', asyncHandler(async (req, res) => {

    const products = await Product.findAll({
        where: {is_active: true},
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'description', 'base_price', 'is_active', 'createdAt', 'updatedAt']
    });

    res.json(products);

}));

module.exports = router;