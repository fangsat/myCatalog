'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async checkPassword(plainPassword){
      return bcrypt.compare(plainPassword, this.password_hash);
    }

    static async register({email, password, name}){
      const normalizedEmail = email.trim().toLowerCase();

      const existing = await User.findOne({where: {email: normalizedEmail}});

      if(existing){
        const err = new Error('Email already registered');
        err.status = 409;
        throw err;
      }

      const password_hash = await bcrypt.hash(password, 10);
      return User.create({email: normalizedEmail, password_hash, name, role: 'user'});
    }
  }

  User.init({
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      where: { deleted_at: null }
    },
    hooks: {
      beforeValidate: (user) => {
        if (user.email) {
          user.email = user.email.trim().toLowerCase();
        }
      }
    }
  });

  return User;
};