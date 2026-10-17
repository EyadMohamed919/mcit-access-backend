const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const session = require('express-session');

const port = process.env.PORT || 8080;

const globalRouter = require("./routers/globalRouter");
const formsRouter = require("./routers/formsRouter");
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
const eventRouter = require("./routers/eventRouter");
const outputRouter = require("./routers/outputRouter");
const traineeRouter = require("./routers/traineeRouter");
const productRouter = require("./routers/productRouter");
const trainingProgramRouter = require("./routers/trainingProgramRouter");
const settingsRouter = require("./routers/settingsRouter");
const errorRouter = require("./routers/errorRouter");

// 1. Resolve base directory properly for both Development and Packaged (app.asar) mode
const staticPath = path.join(__dirname, 'static/public');
const viewsPath = path.join(__dirname, 'static/public/views');

app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// 2. Fix maxAge arithmetic calculation (24 hours in milliseconds)
app.use(session({
    secret: 'mcit_dashboard_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 // 24 Hours
    }
}));

app.set("view engine", "ejs");
app.set("views", viewsPath);

// Routes
app.use("/error", errorRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/events", eventRouter);
app.use("/api/outputs", outputRouter);
app.use("/api/trainee", traineeRouter);
app.use("/api/trainingProgram", trainingProgramRouter);
app.use("/api/products", productRouter);
app.use("/api/settings", settingsRouter);
app.use(globalRouter);
app.use(formsRouter);

// 3. Bind server and log local vs network access URLs
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Express server running!`);
    console.log(`Local Electron URL: http://127.0.0.1:${port}`);
    console.log(`Network URL: http://0.0.0.0:${port}`);
});

module.exports = app;