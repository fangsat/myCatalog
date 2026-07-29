const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');

const db = require('../models');
const { Category } = db;

router.get('/', asyncHandler(async (req, res) => {

    const categories = await Category.findAll({
        order: [['name', 'ASC']]
    });

    res.json(categories);

}));

module.exports = router;