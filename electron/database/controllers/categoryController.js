const db = require('../db').getDB()
const Category = db.Category;
const { Op } = require("sequelize");
exports.get_items = async (data) => {
  
   
    let categories = await Category.findAll()
    console.log(categories)
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