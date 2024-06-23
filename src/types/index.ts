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
    paytype: string;
    address: string;
    email: string;
    phone: string;
    cost: number;
    step: number;
    isConfirmed: boolean;
    checkValidation(order: IOrder): boolean;
    sendOrder(order: IOrder): boolean;
}

//Оформление покупки - Корзина:
export interface IPurchaseCart {
    cart: ICart;
    cost: Pick<IOrder, 'cost'>;
}

//Оформление покупки - Детали заказа:
export type TStepOrder = {
    paytype: Pick<IOrder, 'paytype'>;
    address: string;
}

export interface IPurchaseOrder {
    paytype: Pick<TStepOrder, 'paytype'>;
    address: Pick<TStepOrder, 'address'>;
    checkValidation(data: Record<keyof TStepOrder, string>): boolean;
}

//Оформление покупки - Контакты:
export type TStepContacts = {
    email: string;
    phone: string;
}
 
export interface IPurchaseContacts {
    email: Pick<TStepContacts, 'email'>;
    phone: Pick<TStepContacts, 'phone'>;
    checkValidation(data: Record<keyof TStepContacts, string>): boolean;
}

