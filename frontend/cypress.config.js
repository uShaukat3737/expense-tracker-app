// cypress.config.js
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://expense-tracker-app-three-beryl.vercel.app', // YOUR VERCEL URL
    setupNodeEvents(on, config) {
      // optional
    },
  },
})