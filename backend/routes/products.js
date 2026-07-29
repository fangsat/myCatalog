const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const { Op } = require('sequelize');

const db = require('../models');
const { Product, ProductImage, Category } = db;

router.get('/', asyncHandler(async (req, res) => {
    const where = { is_active: true };
    if(req.query.q){
        where.name = { [Op.iLike]: `%${req.query.q}%`}
    }
    if(req.query.category){
        where.category_id = req.query.category;
    }

    const products = await Product.findAll({
        where,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'description', 'base_price', 'is_active', 'createdAt', 'updatedAt'],
        include: [{ model: ProductImage, as: 'images', where: {is_primary: true}, required: false},
            {model : Category}
        ]
    });

    res.json(products);

}));

module.exports = router;