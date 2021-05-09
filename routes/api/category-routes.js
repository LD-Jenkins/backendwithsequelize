const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // include its associated Products
      include: [{ model: Product }]
    });
    // if no exception thrown respond with data
    res.status(200).json(categoryData);
  } catch (err) {
    // if exception thrown in try block respond with 500 error
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // include its associated Products
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    // if no exception thrown respond with data
    res.status(200).json(categoryData);
  } catch (err) {
    // if exception thrown in try block respond with 500 error
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.findOrCreate({where: {category_name: req.body.category_name}})
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, { 
    where: { 
      id: req.params.id 
    }
  })
  .then(arr => {
    const [rowsAffected, rows] = arr;
    (rowsAffected > 0)
      ? console.log(`${rowsAffected} rows updated.`)
      : console.log('No rows were updated.')
    res.status(200).json(arr);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(numRows => {
    console.log(`${numRows} rows removed.`);
    res.status(200).json(numRows);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
