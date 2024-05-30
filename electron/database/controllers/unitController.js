const db = require('../db').getDB()
const Unit = db.Unit;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let units = await Unit.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    return  {
        items : units,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
    let unit = await Unit.create({
      name: data.name,
      full_name: data.full_name,
      is_active: data.is_active
    });
    return {
      item: unit,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Unit.update(
      {
        name: data.name,
        full_name: data.full_name,
        is_active: data.is_active,
      },
      {
        where: {
          id: data.item_id,
        },
      }
    );
    let unit = await Unit.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: unit,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let unit = await Unit.findOne({
      where: {
        id: data.item_id,
      },
    });
    await unit.destroy();
    return {
      success: true,
    };
  };