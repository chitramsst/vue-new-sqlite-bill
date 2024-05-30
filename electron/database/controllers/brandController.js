const db = require('../db').getDB()
const Brand = db.Brand;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let brands = await Brand.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    // if(brands == null)
    // {
    //     return {
    //         success : false
    //     }
    // }
    return  {
        items : brands,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
    let brand = await Brand.create({
      name: data.name,
      is_active: data.is_active
    });
    return {
      item: brand,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Brand.update(
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
    let brand = await Brand.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: brand,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let brand = await Brand.findOne({
      where: {
        id: data.item_id,
      },
    });
    // let expense = await db.Expense.findOne({
    //   where: {
    //     expense_brand: data.item_id,
    //   },
    // });
    // if (expense) {
    //   return {
    //     success: false,
    //     message: "PREVENT_DELETE",
    //   };
    // }
    await brand.destroy();
    return {
      success: true,
    };
  };