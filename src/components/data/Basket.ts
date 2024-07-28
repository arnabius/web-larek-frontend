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
    
    getItemQty(): number {
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
        this._itemsArr.push(item);
    }
    
    delItem(item: IItem): void {
        this._itemsArr = this._itemsArr.filter(function(itemVal) {
            return itemVal.id !== item.id;
        });
    }

    changeBasket(item: IItem): void {
        if (!this.includes(item.id)) {
            if (item.price !== null) {
                this.addItem(item);
            }
        }
        else {
            this.delItem(item);
        }
        
        this.setTotals();
    }

    setTotals() {
        this.total = this.recalcTotal();
        this.itemQty = this.getItemQty(); 

        this.events.emit('basket:changed');
    }

    // Проверяет наличие товара в корзине
    includes(itemId: string) {
        return this._itemsArr.some(function(itemVal) {
            return itemVal.id === itemId;
        });
    }

    clear() {
        this.itemsArr.forEach((item: IItem) => {
            this.delItem(item);
        });

        this.setTotals();
    }
}
