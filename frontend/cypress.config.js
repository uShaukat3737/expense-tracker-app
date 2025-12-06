const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  baseUrl: 'https://expense-tracker-app-three-beryl.vercel.app/',
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
  },
});
