const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000 
}));

const users = [
    { username: 'ons', password: 'onspassword' },
    { username: 'ons2', password: 'password2' }
];


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.status(200).send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Error logging out');
        } else {
            res.send('Logged out successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
