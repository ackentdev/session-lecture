require("dotenv").config();
const express = require('express');
const app = express();
const session = require("express-session");
// const cookieParser = require('cookie-parser')
const {messageAppender} = require('./middlewares/middlewares')
app.use(express.json());
// app.use(cookieParser());
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 //two weeks
    }
}))

// endpoint to set a session for each unique visitor, identified by a cookie
app.post('/api/new_user', (req, res, next) => {
    const {username, age} = req.body;
    req.session.user = {
        username,
        age
    };
    res.status(200).send(req.session.user);
})


// access session data based on the cookie that was sent
app.get("/api/user_info", (req, res, next) => {
    console.log(req.session.user);
    res.status(200).send(req.session.user);
})

app.post('/api/logout', (req, res, next) => {
    req.session.destroy()
    res.status(200).send("session was destroyed")
})
// top level middleware


// app.use((req, res, next) => {
//     if (req.cookies.cookieName === undefined) {
//       console.log("no cookie found, setting cookie");
//       res.cookie("cookieName", "mysupercoolcookie!");
//       next();
//     } else {
//       console.log("cookie Found", req.cookies.cookieName);
//       next();
//     }
//   });

app.post('/api/users', (req, res, next) => {
    const {message} = req.body
    res.status(200).send(message);
});

app.use(messageAppender);

app.post('/api/users2', (req, res, next) => {
    const {message} = req.body
    res.status(200).send(message);
});


const port = 4000;
app.listen(port, () => console.log(`${port} 🌵`))