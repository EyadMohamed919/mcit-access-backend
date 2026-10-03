const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const port = 8080;
const session = require('express-session');

const globalRouter = require("./routers/globalRouter");
const formsRouter = require("./routers/formsRouter");
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
const eventRouter = require("./routers/eventRouter");
const outputRouter = require("./routers/outputRouter");
const traineeRouter = require("./routers/traineeRouter");
const productRouter = require("./routers/productRouter");
const trainingProgramRouter = require("./routers/trainingProgramRouter");
const errorRouter = require("./routers/errorRouter");

app.use(express.static(path.join(__dirname, 'static/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(session({
    secret: 'mcit_dashboard_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "static/public/views"));

app.use("/error", errorRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/events", eventRouter);
app.use("/api/outputs", outputRouter);
app.use("/api/trainee", traineeRouter);
app.use("/api/trainingProgram", trainingProgramRouter);
app.use("/api/products", productRouter);
app.use(globalRouter);
app.use(formsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on http://0.0.0.0:${port}`);
});