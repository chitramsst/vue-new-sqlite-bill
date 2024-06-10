const db = require('../db').getDB()
const Customer = db.Customer;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let customers = await Customer.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    return  {
        items : customers,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
  let customer_data = await generateCustomerCode();
    let customer = await Customer.create({
        customer_code: data.customer_code,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        email_address: data.email_address,
        address: data.address,
        tax_vat_number: data.tax_vat_number,
        customer_code: customer_data.customer_code,
        customer_prefix : customer_data.prefix,
        is_active: data.is_active,
    });
    return {
      item: customer,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Customer.update(
      {
        name: data.name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        email_address: data.email_address,
        address: data.address,
        tax_vat_number: data.tax_vat_number,
        is_active: data.is_active,
      },
      {
        where: {
          id: data.item_id,
        },
      }
    );
    let customer = await Customer.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: customer,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let customer = await Customer.findOne({
      where: {
        id: data.item_id,
      },
    });
    // let expense = await db.Expense.findOne({
    //   where: {
    //     expense_customer: data.item_id,
    //   },
    // });
    // if (expense) {
    //   return {
    //     success: false,
    //     message: "PREVENT_DELETE",
    //   };
    // }
    await customer.destroy();
    return {
      success: true,
    };
  };


/* get needed items for customer creation */
exports.get_customer_create_initial_items = async (data) => {
  let customer_data = await generateCustomerCode();
  return {
    success: true,
    customer_code: customer_data.prefix+'_'+customer_data.customer_code
  };
};

  async function generateCustomerCode() {
    // let settings = await db.MasterSetting.findAll()
    // let array  = {};
    // settings.forEach((item) => {
    //     array[item.dataValues.title] = item.dataValues.value;
    // })
    // let prefix = array['invoice_prefix'] ? array['invoice_prefix'] : null;
    let prefix = "CU";
    let lastCustomer = await Customer.findOne({
      order: [["createdAt", "DESC"]],
    });
  
    if (lastCustomer) {
      if (prefix) {
        return {
          prefix,
          customer_code: parseInt(lastCustomer.customer_code) + 1,
        };
      } else {
        return {
          prefix: null,
          customer_code: parseInt(lastCustomer.customer_code) + 1,
        };
      }
    }
    return {
      prefix,
      customer_code: 1,
    };
  }