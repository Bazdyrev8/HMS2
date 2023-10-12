"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ItemController_1 = require("./controllers/ItemController");
const app = (0, express_1.default)();
const carsController = new ItemController_1.ItemsController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.listen(8320, () => {
    console.log('Server is running on port 8320');
});
app.get("/", (req, res) => {
    carsController.index(req, res);
});
app.get("/data", (req, res) => {
    carsController.data(req, res);
});
//# sourceMappingURL=index.js.map