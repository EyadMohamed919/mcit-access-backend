const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const port = 8080;
const globalRouter = require("./routers/globalRouter");
const db = require("./config/db");
const session = require('express-session');
// routers
const userRouter = require("./routers/userRouter");

app.use(express.static(path.join(__dirname, 'static/public')));
app.use(session({
    secret: 'mcit_dashboard_secret', // Used to sign the session ID cookie
    resave: false,
    saveUninitialized: false
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "static/public/views"));

app.use(globalRouter);
app.use("/api/users", userRouter);

// async function testConnection() {
// try {

//     const result = await db.query('SELECT TOP 1 * FROM Projects');
//     console.log('Connection Successful! Access Driver is working.');
//     console.log('Sample Data Record:', result);
// } catch (error) {
//     console.error('Connection Failed:', error.message);
// }
// }

testConnection();

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server is listening on http://0.0.0.0:${port}`);
})