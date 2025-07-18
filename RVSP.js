const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RSVP = sequelize.define('RSVP', {
  status: {
    type: DataTypes.ENUM('going', 'maybe', 'not_going'),
    allowNull: false,
  },
});

module.exports = RSVP;
