// Final API gateaways

const { parse } = require('json2csv');
const csv = require('csvtojson');

const { Op } = require("sequelize");
const fs = require('fs');
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

const genres = [
  'Mujer',
  'Hombre',
  'Otro',
];

const instruments = [
  'Violín I',
  'Violín II',
  'Viola',
  'Cello',
  'Contrabajo',
  'Flauta',
  'Clarinete',
  'Oboe',
  'Fagot',
  'Corno Frances',
  'Trompeta',
  'Trombón',
  'Tuba',
  'Percusion',
  'Piano',
  'Dirección',
];

const id_types = [
  'Rut',
  'Pasaporte',
];

const id_musicians = [
  'Planta',
  'Taller',
];

const id_members = [
  'Estudiante USM',
  'Prof/Func USM',
  'Ex-Estudiante USM',
  'Externo',
];

  exports.userAccess = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminAccess = (req, res) => {
    res.status(200).send("OK Admin.");
  };

  exports.uploadBulk = async (req, res) => {

    let file = req['files'].bulk;

    const converter=csv({
      delimiter: [";"]
    });

    jsonObj =  null;

    try {
      jsonObj = await converter.fromFile(file.tempFilePath);
    } catch (err) {
      res.status(500).send({message: err});
    }
    
    succes = true;
    message = [];

    for (let index in jsonObj) {
      entry = jsonObj[index];

      attributes = genres.includes(entry.genre) && 
                    instruments.includes(entry.instrument) && 
                    id_types.includes(entry.type_id) && 
                    id_musicians.includes(entry.type_musician) && 
                    id_members.includes(entry.type_member);

      if (attributes){
        const user = await User.findOne({ where: { email: entry.email } }); // add try catch?
      
          if (user !== null){ // usuario existe, debe actualizar sus datos
            try {
              user.set({
                name: entry.name,
                last_name: entry.last_name,
                instrument: entry.instrument,
                genre: entry.genre,
                bday_date: entry.bday_date,
                initial_year: entry.initial_year,
                academic_year: entry.academic_year,
                phone_number: entry.phone_number,
                type_id: entry.type_id,
                country_id: entry.country_id,
                type_musician: entry.type_musician,
                type_member: entry.type_member,
                city_of_residence: entry.city_of_residence,
                rol: entry.rol,
                active: entry.active,
                admin: entry.admin
              });
  
              await user.save();
            } catch (err) {
              success = false;
              number = Number(index) + 1;
              message.push( { error: "Error en linea " + number.toString() + ": " + err});
            }
          } else { // usuario no existe, debe crearse
            password = entry.name.toLowerCase().substring(0,4) + entry.last_name.toLowerCase().substring(0,4) // FLAG nombres con largo menor que ;
            
            try {
              await User.create({
                email: entry.email,
                password: bcrypt.hashSync(password, 8),
                name: entry.name,
                last_name: entry.last_name,
                instrument: entry.instrument,
                genre: entry.genre,
                bday_date: entry.bday_date,
                initial_year: entry.initial_year,
                academic_year: entry.academic_year,
                phone_number: entry.phone_number,
                type_id: entry.type_id,
                country_id: entry.country_id,
                type_musician: entry.type_musician,
                type_member: entry.type_member,
                city_of_residence: entry.city_of_residence,
                rol: entry.rol,
                active: entry.active,
                admin: entry.admin
              });
            } catch (err){
              succes = false;
              number = Number(index) + 1;
              message.push( { error: "Error en linea " + number.toString() + ": " + err});
            }
          }
      } else {
        succes = false;
        number = Number(index) + 1;
        message.push( { error: "Error en linea " + number.toString() + ": Atributos incorrectos."});
      }
    }
    res.status(200);
    if (succes){
      message = [{success : "Actualización de base de datos correcta!"}];
    } 
    res.send(message);
  };

exports.downloadCsv = async (req, res) => {
  const users = await User.findAll({ raw: true });
  const fields = ['email', 'name', 'last_name', 'instrument', 'genre',
                      'bday_date', 'initial_year', 'academic_year', 'phone_number', 'type_id',
                    'country_id', 'type_musician', 'type_member', 'city_of_residence', 'rol', 'active'];
  const delimiter = ";";
  const opts = { fields, delimiter };
  fileName = "orchestra.csv";

  try {
    const csv = parse(users, opts);

    fs.writeFile(__dirname + '/' + fileName, csv, err => { // problemas al crear archivo
      if (err) {
        res.status(500).send({message: err});
      }
      res.status(200).sendFile(__dirname + '/' + fileName);
    });
    
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
}


exports.listUsers = (req, res) => {
  User.findAll({ raw: true })
  .then((users) => {
    res.status(200).send(users);
  });
};

exports.adminUserInfo = (req, res) => {
  try {
    User.findOne({where: { id: req.params.idUser }, raw: true })
    .then((user) => {
      res.status(200).send(user);
    });
  } catch (err) {
    res.status(500).send({message: "Server error..."});
  }
  
};

exports.deleteUser = (req, res) => {
  try {
    User.destroy({
      where: {
          id: req.params.idUser
      }
    });
    res.status(200).send({message: "User deleted!"});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "Server error..."});
  }
};

exports.editUser = async (req, res) => {
  try {
    id = req.params.idUser;
    const user = await User.findOne({where: { id: req.params.idUser }});
    if (user !== null){
      if (req.body.password == null){
        const userTmp = await User.findOne({where: { email: req.body.email,
                                                    id: {[Op.ne]: req.params.idUser}
        }});
        if (userTmp == null){
          if (user.email == req.body.email){
            user.set({
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
            });
          } else {
            user.set({
              name: req.body.name,
              last_name: req.body.last_name,
              email: req.body.email,
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
            });
          }
          await user.save();
          res.status(200).send({message: "User edited succesfully!"});
        } else {
          res.status(400).send({message: "Email already in use!"});
        }
        
      } else {
        user.set({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
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
        });
        await user.save();
        res.status(200).send({message: "User edited succesfully!"});
      }
    } else {
      res.status(400).send({message: "User not found!"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "Server error..."});
  }
};

exports.userInfo = (req, res) => {
  try {
    User.findOne({
      where: {
          id: req.params.idUser
      }
    }).then((user) =>{
      if (user != null){
        res.status(200).send(user);
      } else {
        res.status(400).send({message: "User not found!"});
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({message: "Server error..."});
  }
};
  