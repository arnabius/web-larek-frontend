export interface IItem {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    price: number;
}

export interface IItemData {
    items: IItem[];
    previewId: string | null;
    getItems(): IItem[];
    getItem(itemId: string): IItem;
}

export type TItemInfo = Pick<IItem, '_id' | 'title' | 'category' | 'image' | 'price'>;

export interface IUser {
    id: string;
    address: string;
    email: string;
    phone: string;
}

export interface ICart {
    items: IItem[];
    getItems(): IItem[];
    addItem(item: IItem): void;
    delItem(item: IItem): void;
}

export interface IOrder {
    cart: ICart;
    user: IUser;
    paytype: string;
    cost: number;
    step: number;
    isConfirmed: boolean;
    checkValidation(order: IOrder): boolean;
    sendOrder(order: IOrder): boolean;
}

