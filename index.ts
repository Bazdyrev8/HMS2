import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/ItemController';

const app: Express = express();
const carsController = new ItemsController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(8230, () => {
  console.log('Server is running on port 8230');
});

app.get("/", (req: Request, res: Response) => {
  carsController.index(req, res);
});

