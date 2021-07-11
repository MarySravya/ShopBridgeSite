export const ITEMS: any[] = [
    { item: 'Beach ball', cost: 4, description: 'Buy beach ball at the least price' },
    { item: 'Towel', cost: 5, description: 'Buy one towel and get one free' },
    { item: 'Frisbee', cost: 2, description: 'Buy Frisbee at 10% offer' },
    { item: 'Sunscreen', cost: 4, description: 'Buy Sunscreen and get Chocolate free' },
    { item: 'Cooler', cost: 25, description: 'Buy Cooler with 1 year warranty' },
    { item: 'Swim suit', cost: 15, description: 'Buy Swim suit of nylon cloth' },
];

export interface Item {
    cost:number;
    description:string;
    item: string;
}