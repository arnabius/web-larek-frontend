import { BASKET_IN, BASKET_OUT } from '../utils/constants';

export interface IItem {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    price: number;
}

export interface IItemData {
    items: IItem[];
    previewId: string | null;
    getItem(itemId: string): IItem;
    getItems(): IItem[];
}

export interface IBasket {
    itemsArr: IItem[];
    total: number;
    getItems?(): IItem[];
    recalcTotal?(): void;
    changeBasket?(item: IItem): void;
    addItem?(item: IItem): void;
    delItem?(item: IItem): void;
    includes?(itemId: string): boolean;
    clear?(): void;
    setTotals?(): void;
}

export type TPayment = 'card' | 'cash';

export interface IOrderData {
    payment: string;
    address: string;
}

export interface IContactsData {
    email: string;
    phone: string;
}

export interface IOrder extends IBasket, IOrderData, IContactsData {
    addOrderDataToOrder(orderData: { payment: string, address: string }): void;
    addContactsToOrder(contactsData: { email: string, phone: string }): void;
    clear(): void;
}

export interface IPurchase {
    items: string[];
    total: number,
    payment: string,
    address: string,
    email: string,
    phone: string
}

export type TPurchaseSaveResponse = {
    mode: string,
	raw: IPurchase
}

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

export interface ICardsContainer {
    catalog: HTMLElement[];
}

export type TCardType = 'catalog' | 'preview' | 'basket';

export type TBASKET_IN = typeof BASKET_IN;
export type TBASKET_OUT = typeof BASKET_OUT;

export type TCardBasket = TBASKET_IN | TBASKET_OUT;

export interface ICardView {
    cardType: TCardType;
    id: string;
    index?: number;
    title: string;
    category?: string;
    image?: string;
    description?: string;
    price: number;
    basketDirection: string;
    render(itemData: IItem, index?: number): HTMLElement;
    addToBasketRender(): void;
    basketDirectionToggle(): void;
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    render(basketData?: IBasket): HTMLElement;
    clear(): void;
}

export interface IOrderView {
    payment: string;
    card: string;
    cash: string;
    address: string;
    getInputValues(): Record<string, string>;
    checkValidation(): void;
}

export interface IContactView {
    email: string;
    phone: string;
}

export interface ISuccessView {
    total: number;
}