import { IItem, IPurchase } from "../../types"
import { IEvents } from "../base/events";
import { Order } from "./Order";

export class Purchase extends Order implements IPurchase {
    protected _itemsArr: IItem[];
    protected _total: number;
    //items: string[]; //string[]; 
    /*payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;*/

    constructor(events: IEvents) {
        super(events);
        //this.itemsArr = [];
        //this.items = [];

    }

    set itemsArr(itemsArr: IItem[]) {
        this._itemsArr = itemsArr;
    }

    get itemsArr(): IItem[] {
        return this._itemsArr;
    }

    set total(total: number) {
        this._total = total;
    }

    get total(): number {
        return this._total;
    }


        /*addBasketToPurchase(basket: IBasket items: IItem[], total: number) {
        basket.items.forEach(item => {
            this.items.push(item.id);
        });
        this.total = total;
    }*/

    /*addOrderToPurchase(payment: string, address: string) {
        this.payment = payment;
        this.address = address;       
    }

    addContactsToPurchase(email: string, phone: string) {
        this.email = email;
        this.phone = phone;       
    }

    savePurchase(): boolean {
       
        return true;
    }*/

}
