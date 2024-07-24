import { IEvents } from "../base/events";
import { IBasket, IOrder } from "../../types";

export class Order implements IOrder {
    //basket: IBasket;
    protected _payment: string;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    //protected _total: number;
    protected _step: string;
    protected _isConfirmed: boolean;
    protected events: IEvents;
    protected emailTemplate: RegExp;
    protected phoneTemplate: RegExp;
    
    constructor(events: IEvents) {
        this.events = events;
        this.emailTemplate = /[a-zA-Z\d\.\-_]+@[a-zA-Z\d\-_]+\.[a-zA-Z]+/gm;
        this.phoneTemplate = /[\d]{10}/gm;

        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        //this.total = 0;
        this.step = '';
        this.isConfirmed = false;
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

    set step(step: string) {
        this._step = step;
    }

    get step(): string {
        return this._step;
    }

    set isConfirmed(isConfirmed: boolean) {
        this._isConfirmed = isConfirmed;
    }

    get isConfirmed(): boolean {
        return this._isConfirmed;
    }

    checkOrderValidation(payment: string, address: string): boolean {
        if ((payment === 'Онлайн' || payment === 'При получении') && address !== '') {
            return true;
        }
        else {
            return false;
        }
    }

    checkContactsValidation(email: string, phone: string): boolean {
        if (this.emailTemplate.test(email) && this.phoneTemplate.test(phone)) {
            return true;
        }
        else {
            return false;
        }
    }

    addOrderDataToOrder(payment: string, address: string) {
        this.payment = payment;
        this.address = address;       
        this.events.emit('order:changed');
    }

    addContactsToOrder(email: string, phone: string) {
        this.email = email;
        this.phone = phone;       
        this.events.emit('order:confirm');
    }


}