require('dotenv').config();

module.exports = {
    development: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres'
        // No SSL block needed for local db
    },

    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: { ssl:{require: true, rejectUnauthorized: false}},
        logging: false       
    }
};