/**
 * Sequelize initialization module
 */

'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const sequelizeTransforms = require('sequelize-transforms');
const lodash = require('lodash');
let db = {};
const {
  postgre,
  env,
} = require('./vars');

// Open sequelize connection
if (postgre.enabled === 'true') {
  const sequelize = new Sequelize(postgre.db, postgre.username, postgre.password, {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: 'postgres',

    // custom host; default: localhost
    host: postgre.host,

    // custom port; default: dialect default
    port: postgre.port,

    // custom protocol; default: 'tcp'
    // postgres only, useful for Heroku
    // protocol: null,

    // disable logging; default: console.log
    logging: false,

    // you can also pass any dialect options to the underlying dialect library
    // - default is empty
    // - currently supported: 'mysql', 'postgres', 'mssql'
    dialectOptions: {
      // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },

    // the storage engine for sqlite
    // - default ':memory:'
    // storage: 'path/to/database.sqlite',

    // disable inserting undefined values as NULL
    // - default: false
    omitNull: true,

    // a flag for using a native library or not.
    // in the case of 'pg' -- set this to true will allow SSL support
    // - default: false
    native: true,

    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: { timestamps: false }
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    define: {
      underscored: false,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: true,
    },

    // similar for sync: you can define this to always force sync for models
    sync: {
      force: true,
    },

    // pool configuration used to pool database connections
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 60000
    }

    // isolation level of each transaction
    // defaults to dialect default
    // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
  });

  sequelizeTransforms(sequelize);

  let models = ['user'];

  let modelPathFormat = path.join(__dirname, '../api/models/sql/{0}.model.js');

  for (let i in models) {
    let model = sequelize.import(modelPathFormat.replace(/\{0\}/g, models[i]));
    db[model.name] = model;
  }
  try {
    // TODO: Uncomment after solving cyclic dependencies
    Object.keys(db).forEach(function (modelName) {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });
  }
  catch (err) {
    console.log('err', err)
  }

  module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize,
  }, db);
}
