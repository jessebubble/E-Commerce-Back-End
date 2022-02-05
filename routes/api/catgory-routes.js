const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// CRUD OPERATIONS:
// GET, POST, PUT, DELETE

router.get('/', (req, res) => { // GET
  // find all categories - 
  // be sure to include its associated Products
  Category.findAll({ // access our Category MODEL and run .findAll() method
    include: {
      model: Product,
      attributes: 
      [
        'id',
        'product_name',
        'price',
        'category_id'
      ]
    }
  })
  .then(dbCategoryData => res.json(dbCategoryData)) // all category data sent back as JSON
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => { // GET
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id // where indicates finding category equal to request being made
    },
    include: {
      model: Product,
      attributes:
      [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return; // 404 status indicates user error, everything is okay with server
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => { //POST
  // create a new category
  Category.create({ // sequelize create method
    category_name: req.body.category_name //pass in key values defined in Category MODEL
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => { // PUT
  // update a category by its `id` value
  Category.update(req.body, { // provided new data we want to use in the update method.  UPDATE combines parameters for creating and looking up data
    where: { 
      id: req.params.id //where we want new data to be used
    },
  })
  .then(dbCategoryData => {
    if(!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => { // DELETE
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' })
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;