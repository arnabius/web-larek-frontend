import { IItem } from "../../types";
import { Component } from "../base/Component";

export class Card<T> extends Component<T> {
    protected itemId: string;
	protected itemTitle: HTMLElement;
    protected itemPrice: HTMLSpanElement;
    
    constructor(protected container: HTMLElement, item: Partial<IItem>) {
        super(container);
        this.itemTitle = this.container.querySelector('.card__title');
        this.itemPrice = this.container.querySelector('.card__price');
        this.itemId = item.id;
        this.title = item.title;
        this.price = item.price;
    }
       
    render(itemData: Partial<IItem>): HTMLElement {
        this.id = itemData.id;
        this.price = itemData.price;
        
        return super.render();
    }

    set title (title: string) {
        this.itemTitle.textContent = title;   
    }

    set price (price: number) {
        if (price === null) {
            this.itemPrice.textContent = "Бесценно";
        }
        else {
            this.itemPrice.textContent = price.toString() + " синапсов";   
        }
    }

    set id (id: string) {
		this.itemId = id;
	}

	get id() {
		return this.itemId;
	}
}

