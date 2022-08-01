import express  from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import { AppDataSource } from './data-source';
import routes from "./routes";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

AppDataSource.initialize().then(() => {
    const app = express();

   // Setup Layout
    app.use(expressLayouts);
    app.set('layout','layouts/layout');
    // Setting the view engine
    app.set('view engine','ejs');
    // Setting for the root path for views directory
    app.set("views",path.join(__dirname,'views'));

    // Setting bodyParser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // Setting for the root path for public directory
    app.use(express.static(path.join(__dirname,'public')));


    app.use(cookieParser('secret'));
    app.use(session({
        name: 'session',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(flash());

    app.use(routes)

    return app.listen(process.env.PORT)
})