'use strict';

// NOTE: Column naming in this database is not fully consistent.
// Most fields are snake_case (password_hash, base_price, deleted_at),
// but createdAt/updatedAt were created as camelCase in the original
// migrations. Sequelize's `underscored: true` option would auto-map
// camelCase model fields to snake_case columns globally - but turning
// it on here would break every query, since createdAt/updatedAt don't
// actually follow that convention in the real database.
// Deliberate tradeoff: each model declares its snake_case fields
// explicitly instead of relying on a global convention. Not fixed,
// just documented, since correcting it would require an actual
// migration renaming real database columns.

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
