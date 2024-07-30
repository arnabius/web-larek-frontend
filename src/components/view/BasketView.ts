import { IBasket, IBasketView } from "../../types";
import { createElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class BasketView extends Component<IBasketView> {
    protected _items: HTMLElement;
    protected _total: HTMLSpanElement;
    protected submitBasketButton: HTMLButtonElement; 
    protected events: IEvents;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this._items = this.container.querySelector(".basket__list");
        this._total = this.container.querySelector(".basket__price");
        this.events = events;
         
        this.submitBasketButton = this.container.querySelector(".basket__button");
        this.submitBasketButton.addEventListener('click', () => {
            this.events.emit('basket:submit', this);
        });
        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._items.replaceChildren(...items);
            this.submitBasketButton.disabled = false;
        } 
        else {
            this._items.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.submitBasketButton.disabled = true;
        }
    }

    set total(basketSum: number) {
        this._total.textContent = basketSum.toString() + " синапсов";
    }
 
    render(basketData?: IBasket): HTMLElement {
        if (basketData) {
            return super.render(basketData);
        }
        else {
            return super.render();
        }        
    }
}