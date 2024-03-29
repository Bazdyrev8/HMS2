"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const ItemController_1 = require("./controllers/ItemController");
const AuthController_1 = require("./controllers/AuthController");
const app = (0, express_1.default)();
const itemsController = new ItemController_1.ItemsController();
const authController = new AuthController_1.AuthController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
;
app.listen(8310, () => {
    console.log('Server is running on port 8320');
});
app.get("/", (req, res) => {
    itemsController.index(req, res);
});
app.post("/hms/statistics", (req, res) => {
    itemsController.recording_statistics(req, res);
});
// ИМИТАЦИЯ POST-запроса С ARDUINO
app.get("/hms", (req, res) => {
    itemsController.hms(req, res);
});
// ACCOUNT
app.get("/account", (req, res) => {
    authController.account(req, res);
});
app.get("/logIN", (req, res) => {
    authController.logIN(req, res);
});
// Регистрация
app.get("/register", (req, res) => {
    authController.register(req, res);
});
app.post("/auth", (req, res) => {
    authController.auth(req, res);
});
// Здесь регистрация для ГлавВРАЧА и ОБЫЧНОГО
app.post("/registration", (req, res) => {
    authController.registration(req, res);
});
//# sourceMappingURL=index.js.map