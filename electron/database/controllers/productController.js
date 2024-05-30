const db = require("../db").getDB();
const Product = db.Product;
const Category = db.Category;
const Unit = db.Unit;
const Brand = db.Brand;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
  let products = await Product.findAll({ order: [["createdAt", "DESC"]] });
  return {
    items: products,
    success: true,
  };
};

/* get needed items for product creation */
exports.get_product_create_initial_items = async (data) => {
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
  return {
    categories: categories,
    brands: brands,
    units: units,
    success: true,
  };
};

/* create item */
exports.create_item = async (data) => {
  let product = await Product.create({
    name: data.name,
    is_active: data.is_active,
  });
  return {
    item: product,
    success: true,
  };
};

exports.edit_item = async (data) => {
  await Product.update(
    {
      name: data.name,
      is_active: data.is_active,
    },
    {
      where: {
        id: data.item_id,
      },
    }
  );
  let product = await Product.findOne({
    where: {
      id: data.item_id,
    },
  });
  return {
    item: product,
    success: true,
  };
};

exports.delete_item = async (data) => {
  let product = await Product.findOne({
    where: {
      id: data.item_id,
    },
  });
  // let expense = await db.Expense.findOne({
  //   where: {
  //     expense_product: data.item_id,
  //   },
  // });
  // if (expense) {
  //   return {
  //     success: false,
  //     message: "PREVENT_DELETE",
  //   };
  // }
  await product.destroy();
  return {
    success: true,
  };
};
