const db = require("../db").getDB();
const Product = db.Product;
const Category = db.Category;
const Unit = db.Unit;
const Brand = db.Brand;
const Customer = db.Customer
const Order = db.Order
const OrderDetail = db.OrderDetail
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
  let customers = await Customer.findAll({
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
    customers: customers,
    success: true,
    product_code: product_data.product_code,
    products: products
  };
};


/* create pos */
exports.create_pos = async (data) => {
  console.log("xxxx"+data.authStore.user.id)
  let pos_data = await generateOrderCode();
  let pos = await Order.create({
  order_number: pos_data.product_code,
  order_prefix: pos_data.prefix,
  total_quantity: data.cartData.total_quantity,
  sub_total: data.cartData.sub_total,
  tax_total: data.cartData.tax_total,
  net_total: data.cartData.net_total,
  tax_type: 1,
  tax_percentage: data.tax_percentage,
  status: 1,
  note: data.note,
  date: moment().format('YYYY-MM-DD'),
  customer_id: data.customer.id,
  customer_name: data.customer.name,
  customer_phone: data.customer.phone_number,
  customer_email: data.customer.email_address,
  customer_code:data.customer.customer_code,
  customer_prefix: data.customer.customer_prefix,
  created_by: data.authStore.user?data.authStore.user.id:''
  });
  let items = data.cartItems
  for(let i =0; i < (items.length); i++)
    {
        let item = items[i]
        await OrderDetail.create({
          order_id : pos.id,
          product_id: item.product_code,
          product_prefix : item.product_prefix,
            product_code : item.product_code,
            product_name : item.name,
            product_cost_price : item.cost_price,
            product_selling_price : item.selling_price,
            product_quantity : item.quantity,
            product_expiry_date : item.expiry_date,
            product_tax_amount : item.tax?item.tax:0,
            product_total : item.total,
            product_supplier_id : item.supplier,
            product_category : item.category,
            product_unit : item.unit,
            product_brand : item.brand,
            product_hsCode : item.hsCode,
            product_quantity : item.quantity,
            product_tax_rate:  item.tax_rate
        })
    }
  return {
    item: pos,
    success: true,
  };
};


async function generateOrderCode() {
    let prefix = "ORD";
    let lastProduct = await Order.findOne({
      order: [["createdAt", "DESC"]],
    });
  
    if (lastProduct) {
      if (prefix) {
        return {
          prefix,
          product_code: parseInt(lastProduct.order_number) + 1,
        };
      } else {
        return {
          prefix: null,
          product_code: parseInt(lastProduct.order_number) + 1,
        };
      }
    }
    return {
      prefix,
      product_code: 1,
    };
  }
  