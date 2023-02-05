const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const rawTagData = await Tag.findAll({
      include: {
        model: Product, through: ProductTag
      },
    });
    const tagData = rawTagData.map((tag) => tag.get({ plain: true })
    );
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rawTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!rawTagData) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }
    const tagData = rawTagData.map((tag) => tag.get({ plain: true }));
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createTag = req.body;
    await Tag.create({ tag_name: createTag });
    res.status(200).json({ message: 'Tag successfully created!'});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = req.body;
    await Tag.update({ tag_name: updateTag },
      {
        where: {
          id: req.params.id,
        }
      },);
      if (!updateTag) {
        res.status(404).json({ message: 'Cannot find tag to update!' });
        return;
      }
      res.status(200).json({ message: "Tag successfully updated!" });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try { 
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id,
      }
    },);
    if (!deleteTag) {
      res.status(404).json({ message: 'Cannot find tag to destroy!' });
      return;
    }
    res.status(200).json({ message: "Tag successfully destroyed!" });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
