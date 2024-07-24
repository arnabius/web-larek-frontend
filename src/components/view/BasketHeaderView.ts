import { IEvents } from "../base/events";

export class BasketHeader {
    protected itemQtySpan: HTMLSpanElement;
    protected events: IEvents;
    protected openBasketButton: HTMLButtonElement; 

    constructor(protected container: HTMLElement, events: IEvents) {
        this.openBasketButton = this.container.querySelector(".header__basket");
        this.itemQtySpan = this.container.querySelector(".header__basket-counter");
        this.events = events;
        this.itemQty = 0;
        
        this.openBasketButton.addEventListener('click', () => {
            if (this.itemQty > 0) {
                this.events.emit('basket:open', this);
            }
        });
    }
    
    set itemQty(qty: number) {
        this.itemQtySpan.textContent = qty.toString();
    }

    get itemQty() {
        return parseInt(this.itemQtySpan.textContent);
    }

}