module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instrument: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bday_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      initial_year: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      academic_year: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      phone_number: {
        type: Sequelize.STRING
      },
      type_id: { // passport or rut
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_musician: {   // integer or workshop
        type: Sequelize.STRING
      },
      type_member: {   // sansano, professor, former-student, external member
        type: Sequelize.STRING
      },
      city_of_residence: {   
        type: Sequelize.STRING
      },
      rol: {  // only if type_member != external member 
        type: Sequelize.STRING
      },
      active: { //
        type: Sequelize.STRING,
        defaultValue: "Activo"

      },
      admin: {   // only for permissions in platform
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return User;
  };