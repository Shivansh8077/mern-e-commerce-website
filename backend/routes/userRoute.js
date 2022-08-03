const express = require('express');
const {registerUser,loginUser, logout, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUserDetails, deleteUser, updateUserRole} = require('../controller/usercontroller');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser,getUserDetail)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/updateProfile').put(isAuthenticatedUser,updateProfile)
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUserDetails)
router.route('/admin/updateUserRole/:id').post(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole)
router.route('/admin/deleteUser/:id').get(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

module.exports = router; 

