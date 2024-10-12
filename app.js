const express = require("express");
const app = express();
const path = require("path");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require('./routes/products')

require('dotenv').config();

 require('./config/google_oauth_config');
require('./config/db');
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.SESSION_SECRET,
    })
)
app.use(cookieParser());
app.use("/",indexRouter);
app.use('/auth',authRouter)
app.use('/admin',adminRouter);
app.use('/products',productRouter);

app.listen(3000);