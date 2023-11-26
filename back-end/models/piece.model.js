module.exports = (sequelize, Sequelize) => {
    const Piece = sequelize.define("pieces", {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      composer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      year: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
    });
  
    return Piece;
  };