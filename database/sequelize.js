
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: '../blog.db'
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports =  sequelize;