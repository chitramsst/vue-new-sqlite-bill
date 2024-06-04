const db = require("../db").getDB();
const Product = db.Product;
const Category = db.Category;
const Unit = db.Unit;
const Brand = db.Brand;
const Supplier = db.Supplier
const { Op } = require("sequelize");
const moment = require('moment')

// /* fetch item */
// exports.get_items = async (data) => {
//   let products = await Product.findAll({ order: [["createdAt", "DESC"]] });
//   return {
//     items: products,
//     success: true,
//   };
// };

/* get needed items for product creation */
exports.get_pos_create_initial_items = async (data) => {
  let product_data = await generateOrderCode();
  let categories = await Category.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      is_active: 1,
    },
  });
  let brands = await Brand.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      is_active: 1,
    },
  });
  let units = await Unit.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      is_active: 1,
    },
  });
  let suppliers = await Supplier.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      is_active: 1,
    },
  });
  let products = await Product.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      is_active: 1,
    },
  });
  return {
    categories: categories,
    brands: brands,
    units: units,
    suppliers: suppliers,
    success: true,
    product_code: product_data.product_code,
    products: products
  };
};

async function generateOrderCode() {
    let prefix = "";
    let lastProduct = await Product.findOne({
      order: [["createdAt", "DESC"]],
    });
  
    if (lastProduct) {
      if (prefix) {
        return {
          prefix,
          product_code: parseInt(lastProduct.product_code) + 1,
        };
      } else {
        return {
          prefix: null,
          product_code: parseInt(lastProduct.product_code) + 1,
        };
      }
    }
    return {
      prefix,
      product_code: 1,
    };
  }
  