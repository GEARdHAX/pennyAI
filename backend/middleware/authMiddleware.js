const isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized: Please log in' });
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            message: 'Authorized! Redirecting to dashboard.',
            redirect: '/'
        });
    }   
    next();
};

module.exports = {
    isLoggedin,
    isAuthenticated,
};
