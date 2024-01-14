import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import { ItemsController } from './controllers/ItemController';
import { AuthController } from './controllers/AuthController';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
const app: Express = express();
const itemsController = new ItemsController();
const authController = new AuthController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

declare module "express-session" {
  interface SessionData {
    auth: boolean,  
    email: string,
    password: string,
    admin: boolean,
  }
};

app.listen(8320, () => {
  console.log('Server is running on port 8320');
});

app.get("/", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

app.post("/hms/statistics", (req: Request, res: Response) => {
  itemsController.recording_statistics(req, res);
});

// ИМИТАЦИЯ POST-запроса С ARDUINO
app.get("/hms", (req: Request, res: Response) => {
  itemsController.hms(req, res);
});


// ACCOUNT

app.get("/account", (req: Request, res: Response) => {
  authController.account(req, res);
});

app.get("/logIN", (req: Request, res: Response) => {
  authController.logIN(req, res);
});

// Регистрация

app.get("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

app.post("/auth", (req: Request, res: Response) => {
  authController.auth(req, res);
});

// Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО

app.post("/registration", (req: Request, res: Response) => {
  authController.registration(req, res);
});