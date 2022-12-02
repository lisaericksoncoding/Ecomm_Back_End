const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Product.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Catgeory not found!' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,}
      {
        where: {
          id: req.params.id,}
        },
      }
    );

  
  catch (err) {
    res.status(400).json(err);
  }

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
