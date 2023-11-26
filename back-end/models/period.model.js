module.exports = (sequelize, Sequelize) => {
    const Period = sequelize.define("periods", {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  
    return Period;
  };