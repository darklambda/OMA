module.exports = {
    HOST: "localhost",
    USER: "orchestra",
    PASSWORD: "orchestra",
    DB: "orchestra",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };