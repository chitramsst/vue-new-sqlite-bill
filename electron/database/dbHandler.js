const user_controller = require('./controllers/userController')

module.exports = {
    dbHandler: global.share.ipcMain.handle('database-function',async (event, params) => {
        //Login
        switch(params.target)
        {
            case 'login-user': 
                return user_controller.login_user(params.data)
         }
        
    })
}