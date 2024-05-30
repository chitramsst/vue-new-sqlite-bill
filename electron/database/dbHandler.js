const user_controller = require("./controllers/userController");
const category_controller = require("./controllers/categoryController");
const brand_controller = require("./controllers/brandController");
const unit_controller = require("./controllers/unitController");
const product_controller = require("./controllers/productController");

module.exports = {
  dbHandler: global.share.ipcMain.handle(
    "database-function",
    async (event, params) => {
      //Login
      switch (params.target) {
        case "login-user":
          return user_controller.login_user(params.data);

        /* categories start */
        case "get-categories":
          return category_controller.get_items(params.data);
        case "create-category":
          return category_controller.create_item(params.data);
        case "edit-category":
          return category_controller.edit_item(params.data);
        case "delete-category":
          return category_controller.delete_item(params.data);
        /* categories end */

        /* brands */
        case "get-brands":
          return brand_controller.get_items(params.data);
        case "create-brand":
          return brand_controller.create_item(params.data);
        case "edit-brand":
          return brand_controller.edit_item(params.data);
        case "delete-brand":
          return brand_controller.delete_item(params.data);
        /* end brands */


        /* units */
        case "get-units":
          return unit_controller.get_items(params.data);
        case "create-unit":
          return unit_controller.create_item(params.data);
        case "edit-unit":
          return unit_controller.edit_item(params.data);
        case "delete-unit":
          return unit_controller.delete_item(params.data);
        /* end brands */

         /* products */
        case "get-product-create-initial-items":
        return product_controller.get_product_create_initial_items(params.data);
        case "get-products":
        return product_controller.get_items(params.data);
        case "create-product":
          return product_controller.create_item(params.data);
        case "edit-product":
          return product_controller.edit_item(params.data);
        case "delete-product":
          return product_controller.delete_item(params.data);
        /* end brands */


        
      }
    }
  ),
};
