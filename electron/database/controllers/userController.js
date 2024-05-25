const db = require('../db').getDB()
const User = db.User;
const Encrypt = require('../../systems/Encryption')
//const store = require('../../stores/appStore')
const { Op } = require("sequelize");
exports.login_user = async (data) => {
  
   
    let user = await User.findOne({
        where: {
            [Op.or]: [{  email: data.email}, {  username: data.email}], 
        }
    })

    if(user == null)
    {
        return {
            success : false
        }
    }

    const password = await Encrypt.verifyPassword(data.password,user.dataValues.password);

    if(password == false)
    {
        return {
            success : false
        }
    }
    //store.set('data.authUser',user.dataValues)
    return  {
        user : user.dataValues,
        success : true
    }
}