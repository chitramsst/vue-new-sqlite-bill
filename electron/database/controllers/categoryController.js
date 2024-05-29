const db = require('../db').getDB()
const Category = db.Category;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let categories = await Category.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    // if(categories == null)
    // {
    //     return {
    //         success : false
    //     }
    // }
    return  {
        items : categories,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
    let category = await Category.create({
      name: data.name,
      is_active: data.is_active
    });
    return {
      item: category,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Category.update(
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
    let category = await Category.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: category,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let category = await Category.findOne({
      where: {
        id: data.item_id,
      },
    });
    // let expense = await db.Expense.findOne({
    //   where: {
    //     expense_category: data.item_id,
    //   },
    // });
    // if (expense) {
    //   return {
    //     success: false,
    //     message: "PREVENT_DELETE",
    //   };
    // }
    await category.destroy();
    return {
      success: true,
    };
  };