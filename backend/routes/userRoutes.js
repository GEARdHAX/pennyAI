const express = require('express');
const router = express.Router();
const { isLoggedin, isAuthenticated } = require('../middleware/authMiddleware');
const { registerUser, loginUser, logoutUser, getProfile, dashBoard } = require('../controllers/userController');
router.post('/register', isAuthenticated, registerUser);
router.post('/login', isAuthenticated, loginUser);
router.post('/logout', logoutUser);
router.get('/profile', isLoggedin, getProfile);
router.get('/dashboard', isLoggedin, dashBoard);
router.get('/login', isAuthenticated, loginUser)
module.exports = router;