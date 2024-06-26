let instance = {};
let moment = require("moment");
module.exports = function () {
  const { Sequelize, DataTypes, Model } = require("sequelize");
  var path = require("path");
  // let sequelize = new Sequelize("database", "username", "password", {
  //   dialect: "sqlite",
  //   logging: false,
  //   storage: path.join(
  //     global.share.app.getPath("userData"),
  //     "/database.sqlite"
  //   ),
  // });

  const sequelize = new Sequelize('vue_bill', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });


  let db = {};
  db.User = require("./models/User")(sequelize, Sequelize);
  db.Category = require("./models/Category")(sequelize, Sequelize);
  db.Brand = require("./models/Brand")(sequelize, Sequelize);
  db.Unit = require("./models/Unit")(sequelize, Sequelize);
  db.Supplier = require("./models/Supplier")(sequelize, Sequelize);
  db.Product = require("./models/Product")(sequelize, Sequelize);
  db.Customer = require("./models/Customer")(sequelize, Sequelize);
  db.Order = require("./models/Order")(sequelize, Sequelize);
  db.OrderDetail = require("./models/OrderDetail")(sequelize, Sequelize);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  instance = db;
  return db;
};
 
module.exports.getDB = function () {
  return instance;
};

module.exports.runSeeders = async function () {
  if (instance != undefined) {
    const Encrypt = require("../systems/Encryption");
    let usercount = 0;
    usercount = await instance.User.count();
    if (usercount == 0) {
      const password = await Encrypt.hashPassword("123456");
      instance.User.create({
        name: "Admin",
        username: "admin",
        email: "admin@admin.com",
        password: password,
        user_type: 1,
      });
    }
    // instance.Category.create({
    //   name: "new",
    // });
    return false;
  }
};
