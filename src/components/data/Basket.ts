import { IEvents } from "../base/events";
import { IBasket, IItem } from "../../types";

export class Basket implements IBasket {
    protected _itemsArr: IItem[];
    protected _total: number;
    protected _itemQty: number;
    protected events: IEvents;
    
    constructor(events: IEvents) {
        this.events = events;
        this._itemsArr = [];
        this._total = 0;
        this._itemQty = 0;
    }

    set itemsArr(items: IItem[]) {
        this._itemsArr = items;
        this.events.emit('basket:changed');
    }

    get itemsArr(): IItem[] {
        return this._itemsArr;
    }

    set itemQty(qty: number) {
        this._itemQty = qty;
    }

    get itemQty(): number {
        return this._itemsArr.length;
    }

    set total(total: number) {
        this._total = total;
    }

    get total(): number {
        return this._total;
    }

    getItems(): IItem[] {
        return this._itemsArr;
    }

    recalcTotal() {
        return this._itemsArr.reduce((prevValue: number, item: IItem) => {
            return prevValue + item.price;
        }, 0);
    }

    addItem(item: IItem) {
        //this.items = [item, ...this.items]      
        // проверка на наличие такого товара в корзине и на наличие у товара цены
        if (!this._itemsArr.some(function(itemVal) {
            return itemVal.id === item.id;
        }) && item.price !== null) {
            this._itemsArr.push(item);
        }

        this.total = this.recalcTotal();
        this.itemQty = this.itemsArr.length;
        
        this.events.emit('basket:changed');
    }
    
    delItem(item: IItem): void {
        this._itemsArr = this._itemsArr.filter(function(itemVal) {
            return itemVal.id !== item.id;
        });

        this.total = this.recalcTotal();
        this.itemQty = this.itemsArr.length;
    }

    // Проверяет наличие товара в корзине
    includes(itemId: string) {
        return this._itemsArr.some(function(itemVal) {
            return itemVal.id === itemId;
        })
    }
}
