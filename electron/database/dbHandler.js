const user_controller = require('./controllers/userController')
const category_controller = require('./controllers/categoryController')

module.exports = {
    dbHandler: global.share.ipcMain.handle('database-function',async (event, params) => {
        //Login
        switch(params.target)
        {
            case 'login-user': 
                return user_controller.login_user(params.data)
            case 'get-items':
                return category_controller.get_items(params.data)
         }
        
    })
}