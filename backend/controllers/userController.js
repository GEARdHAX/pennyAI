const User = require('../models/User');
const passport = require('passport');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });

        await user.save();

        // Automatically log in the user after successful registration
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in after registration:', err);
                // If auto-login fails, we still let the frontend know registration was successful
                // so it can redirect to the login page.
                return res.status(201).json({ message: 'User registered successfully. Please log in.' });
            }
            // On successful login, send back user data
            res.status(201).json({ message: 'Registration successful', user: { id: user.id, name: user.name, email: user.email } });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(400).json({ message: info.message || 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) throw err;
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: req.user.id,
                    name: req.user.name,
                    email: req.user.email,
                }
            });
        });
    })(req, res, next);
};

const logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logout successful' });
    });
};

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = (req, res) => {
    if (req.user) {
        res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const dashBoard = (req, res) => {
    res.status(200).json({ message: `Welcome to your dashboard, ${req.user.name}!` });
};


module.exports = { registerUser, loginUser, logoutUser, getProfile, dashBoard };