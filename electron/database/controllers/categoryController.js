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
  