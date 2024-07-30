import { IEvents } from "../base/events";

export class BasketHeader {
    protected itemQtySpan: HTMLSpanElement;
    protected events: IEvents;
    protected openBasketButton: HTMLButtonElement; 
    protected _itemQty: number;

    constructor(protected container: HTMLElement, events: IEvents) {
        this.openBasketButton = this.container.querySelector(".header__basket");
        this.itemQtySpan = this.container.querySelector(".header__basket-counter");
        this.events = events;
        this._itemQty = 0;
        
        this.openBasketButton.addEventListener('click', () => {
            this.events.emit('basket:open', this);
        });
    }
    
    set itemQty(qty: number) {
        this.itemQtySpan.textContent = qty.toString();
        this._itemQty = qty;
    }

    get itemQty() {
        return this._itemQty;
    }

}