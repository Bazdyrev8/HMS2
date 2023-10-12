import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/ItemController';

const app: Express = express();
const carsController = new ItemsController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(8320, () => {
  console.log('Server is running on port 8320');
});

app.get("/", (req: Request, res: Response) => {
  carsController.index(req, res);
});

app.get("/data", (req: Request, res: Response) => {
  carsController.data(req, res);
});


