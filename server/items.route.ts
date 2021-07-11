import { Request, Response } from 'express';
import { Item, ITEMS } from "./db-data";

export function getAllItems(req: Request, res: Response) {
    try {
        res.status(200).json({ payload: Object.values(ITEMS) });
    } catch (e) {
        res.status(404).send(e.message);
    }
}

export function addItem(req: Request, res: Response) {
    const item: Item = req.body;
    let message = "Try again";
    try {
        let index = ITEMS.findIndex(d => d.item === item.item);
        if (index > 0 || index == 0) {
            message = "Already Present";
        }
        else {
            ITEMS.push(item);
            message = "Successfully added";
        }
        res.status(200).send({
            message: message,
            IsSuccess: true,
            result: ""
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
}

export function modifyItem(req: Request, res: Response) {
    const item: Item = req.body;
    let message = "Try again";
    try {
        let index = ITEMS.findIndex(d => d.item === item.item);
        if (index > 0 || index == 0) {
            ITEMS[index]['item'] = item['item'];
            ITEMS[index]['cost'] = item['cost'];
            ITEMS[index]['description'] = item['description'];
            message = "Successfully modified"
        }
        res.status(200).send({
            message: message,
            IsSuccess: true,
            result: ""
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
}

export function deleteItem(req: Request, res: Response) {
    const name: string = req.params.name;
    console.log(name)
    let message = "Try again";
    try {
        let index = ITEMS.findIndex(d => d.item === name);
        if (index > 0 || index == 0) {
            ITEMS.splice(index, 1);
            message = "Successfully deleted";
        }
        res.status(200).send({
            message: message,
            IsSuccess: true,
            result: ""
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
}