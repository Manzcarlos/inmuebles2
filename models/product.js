const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
 /*  imageUrl2: {
    type: String,
    required: false
  },
  imageUrl3: {
    type: String,
    required: false
  }, */
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  bedroom: {
    type: Number,
    required: false
  },
  bathroom: {
    type: Number,
    required: false
  },
  area: {
    type: Number,
    required: false
  },
  plot: {
    type: Number,
    required: false
  },
  year: {
    type: Number,
    required: false
  },
  typeAd: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  balcony: {
    type: Number,
    required: false
  },
  garage: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state : {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: false
  },
  contactName : {
    type: String,
    required: false
  },
  contactEmail: {
    type: String,
    required: false
  },
  contactPhone: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
