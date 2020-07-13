const express = require('express');
const usersController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//No se necesita estar logueado.
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassoword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Todos los metodos de abajo SI necesitan de estar logueado
//Entonces acá se pone el middleware como general
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', usersController.getMe, usersController.getUser);
router.patch(
  '/updateMe',
  usersController.uploadUserPhoto,
  usersController.resizeUserPhoto,
  usersController.updateMe
); //photo = campo en el form
router.delete('/deleteMe', usersController.deleteMe);

//Todos los middleware de abajo están restringidos a ADMIN
router.use(authController.restrictTo('admin'));

router.route('/').get(usersController.getAllUsers);
router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
