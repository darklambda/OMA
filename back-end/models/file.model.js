module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
      path: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      instrument: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Violín I"
      }
    });
  
    return File;
  };