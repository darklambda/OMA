const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.piece = require("../models/piece.model.js")(sequelize, Sequelize);
db.file = require("../models/file.model.js")(sequelize, Sequelize);
db.period = require("../models/period.model.js")(sequelize, Sequelize);

db.period.belongsToMany(db.piece, {
  through: "period_piece",
  foreignKey: "periodId",
  otherKey: "pieceId"
});

db.piece.belongsToMany(db.period, {
  through: "period_piece",
  foreignKey: "pieceId",
  otherKey: "periodId"
});

db.piece.hasMany(db.file, {as: 'files'});
db.file.belongsTo(db.piece);

module.exports = db;