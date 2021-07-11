import * as express from 'express';
import { Application } from "express";
import { addItem, deleteItem, getAllItems, modifyItem } from "./items.route";

const app: Application = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
app.options('*', cors());  
var jsonParser = bodyParser.json()
app.get('/api/items', getAllItems);
app.post('/api/add',jsonParser, addItem);
app.post('/api/modify',jsonParser, modifyItem);
app.delete('/api/delete/:name',jsonParser, deleteItem);

const httpServer: any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});