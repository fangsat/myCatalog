const router = require('express').Router();

const db = require('../models');
const { Product } = db;

router.get('/', async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {is_active: true},
            order: [['createdAt', 'DESC']]
        });
        res.json(products);
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to load products'});
    }
});

module.exports = router;