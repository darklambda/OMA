const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    last_name: req.body.last_name,
    instrument: req.body.instrument,
    genre: req.body.genre,
    bday_date: req.body.bday_date,
    initial_year: req.body.initial_year,
    academic_year: req.body.academic_year,
    phone_number: req.body.phone_number,
    type_id: req.body.type_id,
    country_id: req.body.country_id,
    type_musician: req.body.type_musician,
    type_member: req.body.type_member,
    city_of_residence: req.body.city_of_residence,
    rol: req.body.rol,
    active: req.body.active,
    admin: req.body.admin
  })
    .then(user => {
        console.log(user);
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        admin: user.admin,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};