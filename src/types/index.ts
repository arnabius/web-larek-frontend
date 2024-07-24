export interface IItem {
    id: string;
    index: number;
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

//export type TItemInfo = Pick<IItem, 'id' | 'title' | 'category' | 'image' | 'price'>;

export type TCardType = 'catalog' | 'preview' | 'basket';

export interface IBasket {
    itemsArr: IItem[];
    total: number;
    //getItems(): IItem[];
    //addItem(item: IItem): void;
    //delItem(item: IItem): void;
}

export type TOrderData = {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrder extends TOrderData {
    //basket: IBasket;
    /*payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;*/
    //orderData: TOrderData;
    step: string;
    isConfirmed: boolean;
    checkOrderValidation(payment: string, address: string): boolean;
    checkContactsValidation(email: string, phone: string): boolean;
    addOrderDataToOrder(payment: string, address: string): void;
    addContactsToOrder(email: string, phone: string): void;
    //saveOrder(order: IOrder): boolean;
}

export interface IPurchase extends IBasket, TOrderData {
    /*items: string[]; //Pick<IItem, 'id'>[],
    payment: Pick<IOrder, 'payment'>;
    address: Pick<IOrder, 'address'>;
    email: Pick<IOrder, 'email'>;
    phone: Pick<IOrder, 'phone'>;
    total: Pick<IBasket, 'total'>;*/
    //addBasketToPurchase(basket: IBasket/*items: IItem[]*/, total: number): void;

    //savePurchase(): boolean;
}

export type TPurchaseSaveResponse = {
    mode: string,
	raw: IPurchase
}


/*//Оформление покупки - Корзина:
export interface IPurchaseBasket {
    basket: IBasket;
    total: Pick<IOrder, 'total'>;
}

//Оформление покупки - Детали заказа:
export type TStepOrder = {
    payment: Pick<IOrder, 'payment'>;
    address: string;
}

export interface IPurchaseOrder {
    payment: Pick<TStepOrder, 'payment'>;
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
*/

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type IItemApi = {
    total: number;
    items: IItem[]
}