const db = require("../db").getDB();
const Product = db.Product;
const Category = db.Category;
const Unit = db.Unit;
const Brand = db.Brand;
const Supplier = db.Supplier
const { Op } = require("sequelize");
const moment = require('moment')

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
  let product_data = await generateProductCode();
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
  return {
    categories: categories,
    brands: brands,
    units: units,
    suppliers: suppliers,
    success: true,
    product_code: product_data.product_code
  };
};

/* create item */
exports.create_item = async (data) => {

  let product_data = await generateProductCode();

  let product = await Product.create({
    name: data.name,
    selling_price: data.selling_price,
    cost_price: data.cost_price,
    category: data.category,
    brand: data.brand,
    supplier: data.supplier,
    tax_rate: data.tax_rate,
    quantity: data.quantity,
    reOrderLevel:data.reOrderLevel,
    unit:data.unit,
    product_code: product_data.product_code,
    hsCode: data.hsCode,
    warehouseLocation: data.warehouseLocation,
    description:data.description,
    expiry_date: moment(data.expiry_date).toDate(),
    is_active: this.is_active, 
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




async function generateProductCode() {
  // let settings = await db.MasterSetting.findAll()
  // let array  = {};
  // settings.forEach((item) => {
  //     array[item.dataValues.title] = item.dataValues.value;
  // })
  // let prefix = array['invoice_prefix'] ? array['invoice_prefix'] : null;
  let prefix = "PR";
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
