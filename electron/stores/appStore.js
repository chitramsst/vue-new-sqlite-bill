const Store = require('electron-store');

// Create a new instance of Electron Store with your desired options
const store = new Store({
  defaults: {
    data: {
      authUser: null,
      currentFinancialYear: null,
    },
  },
});

// Export the store instance so that you can import it in other files
module.exports = store;