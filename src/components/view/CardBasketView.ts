import { ICardView, IItem } from "../../types";
import { IEvents } from "../base/events";
import { Card } from "./CardView";

export class CardBasket extends Card<ICardView> {
	protected itemIndex: HTMLSpanElement;
    protected delFromBasketButton?: HTMLButtonElement; 
	protected events: IEvents;
    
    constructor(protected container: HTMLElement, item: Partial<IItem>, events: IEvents) {
        super(container, item);
        this.events = events;
        this.itemIndex = this.container.querySelector('.basket__item-index');

        // Кнопка "Удалить из корзины"
        this.delFromBasketButton = this.container.querySelector('.basket__item-delete');
        if (this.delFromBasketButton) {
            this.delFromBasketButton.addEventListener('click', () => {
                this.events.emit('basket:change', this)
            });
        }
    }
       
    render(itemData: IItem, index?: number): HTMLElement {
        if (this.itemIndex) {
            this.itemIndex.textContent = index.toString();
        }

        this.title = itemData.title;

        return super.render(itemData);
    }
}

