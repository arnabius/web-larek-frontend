import { IBasket } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class BasketView extends Component<IBasket> {
    protected itemsArr: HTMLElement;
    protected _total: HTMLSpanElement;
    protected submitBasketButton: HTMLButtonElement; 
    protected events: IEvents;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.itemsArr = this.container.querySelector(".basket__list");
        this._total = this.container.querySelector(".basket__price");
        this.events = events;
          
        this.submitBasketButton = this.container.querySelector(".basket__button");
        this.submitBasketButton.addEventListener('click', () => {
            this.events.emit('order:start', this);
        });
    }

    set items(items: HTMLElement[]) {
        //console.log('items args: ', items);
        //console.log('this.itemsArr before: ', this.itemsArr);

        if (items.length) {
            this.itemsArr.replaceChildren(...items);
        } 
        /*else {
            this.itemsArr.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }*/
        //console.log('this.itemsArr after: ', this.itemsArr);
    }

    getItems() {

        return this.itemsArr;
    }

    set total(basketSum: number) {
        this._total.textContent = basketSum.toString() + " синапсов";
    }


    clear() {
        /*this.itemsArr.map(item => {
            item.removeChild(item);
        });*/
        this.itemsArr.textContent = '';
    }

    /*get items(): HTMLElement {
        return this.itemsArr;
    }*/


    
    render(basketData: IBasket) {
        
        //return this.itemsArr;
        return super.render(basketData);
    }
}