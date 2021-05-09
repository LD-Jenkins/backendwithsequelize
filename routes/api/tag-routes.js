const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    // if no exception thrown respond with data
    res.status(200).json(tagData);
  } catch (err) {
    // if exception thrown in try block respond with 500 error
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    })

    res.status(200).json(tagData);
  } catch (err) {
    // if exception thrown in try block respond with 500 error
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tag => {
    if (req.body.productIds.length) {
      const tagProductIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id,
        };
      });
      return ProductTag.bulkCreate(tagProductIdArr);
    }
    // if no tag products, just respond
    res.status(200).json(tag);
  })
  .then((tagProductIds) => res.status(200).json(tagProductIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  })
  .then((tag) => {
    return ProductTag.findAll({ where: { tag_id: req.params.id } });
  })
  .then(productTags => {
    const productTagIds = productTags.map(({ product_id }) => product_id);

    const newProductTags = req.body.productIds
      .filter(product_id => !productTagIds.includes(product_id))
      .map(product_id => {
        return {
          product_id,
          tag_id: req.params.id,
        };
      });
    console.log(newProductTags);
    
    const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id);
    
    console.log(productTagsToRemove);

    return Promise.all([
      ProductTag.destroy({
        where: {
          id: productTagsToRemove,
        }
      }),
      ProductTag.bulkCreate(newProductTags)
    ]);
  })
  .then((updatedProductTags) => res.json(updatedProductTags))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
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
