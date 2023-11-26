const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userAccess
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminAccess
  );

  app.post(
    "/api/test/uploadBulk",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.uploadBulk
  );

  app.get(
    "/api/test/downloadCsv",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.downloadCsv
  );
  
  app.get(
    "/api/test/userList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.listUsers
  );

  app.get(
    "/api/test/delete/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.get(
    "/api/test/adminUserInfo/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminUserInfo
  );

  app.post(
    "/api/test/edit/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editUser
  );

  app.get(
    "/api/test/profile/:idUser",
    [authJwt.isReqUser],
    controller.userInfo
  );

  app.post(
    "/api/test/newPiece",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newPiece
  );

  app.get(
    "/api/test/pieceList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.pieceList
  );


};