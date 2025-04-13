const { defineConfig } = require('cypress');
const pg = require('pg');
require('dotenv').config();
module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  viewportWidth: 1366,
  viewportHeight: 768,
  // projectId: 'sfjguw',
  reporterOptions: {
    reportDir: 'cypress/report/mochawesome-report',
    overwrite: true,
    reporter: 'mochawesome',
    chromeWebSecurity: true,
    html: true,
    json: false,
    timestamp: 'mmddyyyy_HHMMss',
  },
  env: {
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // create a task - take 2 params, first being config, second is sql 
        READFROMDB({ dbConfig, sql }) {
          // create a client using the config argument object
          const client = new pg.Pool(dbConfig)
          // return the results from the sql 
          return client.query(sql);
        }
      })
    },
    //baseUrl: 'http://localhost:3001/',
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
  },
  DBAPP: {
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: "5432",
    database: "postingdb",
    /*ssl: {
      rejectUnauthorized: process.env.DBAPP_SSL_REJECT_UNAUTHORIZED === 'true'
    }*/
  },

});