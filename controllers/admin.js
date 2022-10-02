const mongoose = require('mongoose');

const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  console.log("1Entro");
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const bedroom = req.body.bedroom;
  const bathroom = req.body.bathroom;
  const area = req.body.area;
  const plot = req.body.plot;
  const year = req.body.year;
  const typeAd = req.body.typeAd;
  const type = req.body.type;
  const balcony = req.body.balcony;
  const garage = req.body.garage;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const contactName = req.body.contactName;
  const contactEmail = req.body.contactEmail;
  const contactPhone = req.body.contactPhone;
  console.log("Entro");
  console.log(image);

  if (!image) {
    console.log("Entro2");
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
        bedroom: bedroom,
        bathroom: bathroom,
        area: area,
        plot: 1,
        year: year,
        typeAd: typeAd,
        type: type,
        balcony: balcony,
        garage: garage,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
      },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    console.log("Entro3");
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
        bedroom: bedroom,
        bathroom: bathroom,
        area: area,
        plot: 1,
        year: year,
        typeAd: typeAd,
        type: type,
        balcony: balcony,
        garage: garage,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;
/*   const imageUrl2 = image[1].path;
  const imageUrl3 = image[2].path; */
  console.log("Entro5");
  const product = new Product({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
/*     imageUrl2: imageUrl2,
    imageUrl3: imageUrl3, */
    bedroom: bedroom,
    bathroom: bathroom,
    area: area,
    plot: plot,
    year: year,
    userId: req.user,
    typeAd: typeAd,
    type: type,
    balcony: balcony,
    garage: garage,
    address: address,
    city: city,
    state: state,
    zipcode: zipcode,
    contactName: contactName,
    contactEmail: contactEmail,
    contactPhone: contactPhone,
    created: Date.now()
  });
  console.log(product);
  product
    .save()
    .then(result => {
       console.log(result);
      console.log('Created Product');
      res.redirect('/');
    })
    .catch(err => {
      // return res.status(500).render('admin/edit-product', {
      //   pageTitle: 'Add Product',
      //   path: '/add-product',
      //   editing: false,
      //   hasError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     price: price,
      //     description: description
      //   },
      //   errorMessage: 'Database operation failed, please try again.',
      //   validationErrors: []
      // });
      // res.redirect('/500');
      
      const error = new Error(err);
      console.log(error);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedBedroom = req.body.bedroom;
  const updatedBathroom = req.body.bathroom;
  const updatedArea = req.body.area;
  const updatedPlot = req.body.plot;
  const updatedYear = req.body.year;
  const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc,
        bedroom: updatedBedroom,
        bathroom: updatedBathroom,
        area: updatedArea,
        plot: updatedPlot,
        year: updatedYear,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.bedroom= updatedBedroom;
      product.bathroom= updatedBathroom;
      product.area= updatedArea;
      product.plot= updatedPlot;
      product.year= updatedYear;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
