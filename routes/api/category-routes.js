const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const rawCategoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    const categoryData = rawCategoryData.map((category) =>
      category.get({ plain: true })
    );
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
    const rawCategoryData = await Product.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!rawCategoryData) {
      res.status(404).json({ message: 'Category not found!' });
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
    const createCategory = req.body;
    await Category.create({ category_name: createCategory });
    res.status(200).json(createCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = req.body;
    await Category.update({ category_name: updateCategory },
      {
        where: {
          id: req.params.id,
        }
      },
    );
    if (!updateCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }
  }

  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try { 
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    },);
    if (!deleteCategory) {
      res.status(404).json({ message: 'Cannot find category to destroy!' });
      return;
    }
    res.status(200).json({ message: "Category successfully destroyed!" });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
