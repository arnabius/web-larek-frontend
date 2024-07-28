import { IEvents } from "../base/events";
import { IBasket, IItem, IOrder } from "../../types";

export class Order implements IOrder {
    protected _itemsArr: IItem[];
    protected _total: number;
    protected _payment: string;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected events: IEvents;
    
    constructor(events: IEvents) {
        this.events = events;
        this._total = 0;
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    set itemsArr(items: IItem[]) {
        this._itemsArr = items;
    }

    get itemsArr() {
        return this._itemsArr;
    }

    set total(totalSum: number) {
        this._total = totalSum;
    }

    get total() {
        return this._total;
    }

    set payment(payment: string) {
        this._payment = payment;
    }

    get payment(): string {
        return this._payment;
    }

    set address(address: string) {
        this._address = address;
    }

    get address(): string {
        return this._address;
    }

    set email(email: string) {
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get phone(): string {
        return this._phone;
    }

    addOrderDataToOrder(orderData: { payment: string, address: string }) {
        this.payment = orderData.payment;
        this.address = orderData.address;       
        this.events.emit('order:changed');
    }

    addContactsToOrder(contactsData: { email: string, phone: string }) {
        this.email = contactsData.email;
        this.phone = contactsData.phone;       
    }

    clear() {
        this.itemsArr = [];
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        this._total = 0;
    }
}