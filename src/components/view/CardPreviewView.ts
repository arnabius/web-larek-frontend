import { ICardView, IItem } from "../../types";
import { IEvents } from "../base/events";
import { CDN_URL, BASKET_IN, BASKET_OUT, categoryArray, categoryClasses } from '../../utils/constants';
import { Card } from "./CardView";

export class CardPreview extends Card<ICardView> {
    protected itemCategory: HTMLSpanElement;
	protected itemImage: HTMLImageElement;
	protected itemDescription: HTMLElement;
    protected addToBasketButton: HTMLButtonElement; 
    protected _basketDirection: string;
	protected events: IEvents;
    
    constructor(protected container: HTMLElement, item: Partial<IItem>, events: IEvents) {
        super(container, item);
        this.events = events;
        this.itemCategory = this.container.querySelector('.card__category');
        this.itemImage = this.container.querySelector('.card__image');
        this.itemDescription = this.container.querySelector('.card__text');
        this.basketDirection = BASKET_IN;

        // Кнопка "В корзину"
        this.addToBasketButton = this.container.querySelector('.card__button');
        
        if (this.addToBasketButton && this.price !== null) {
            this.addToBasketButton.addEventListener('click', () => {
                this.events.emit('basket:change', this);
                this.basketDirectionToggle();
                this.addToBasketRender();
            });
        }
    }
       
    render(itemData: IItem): HTMLElement {
        const {image, title, category, ...otherItemData} = itemData;
        this.title = title;
        this.image = {image, title};
        this.category = category;

        if (this.addToBasketButton) {
            this.addToBasketRender();
        }
        
        return super.render(otherItemData);
    }

    set category (category: string) {
        if (this.itemCategory) {
            this.itemCategory.textContent = category;

            const categoryName: string[] = Object.entries(categoryArray).find(([key, value]) => { 
                return value === category;
            });
          
            if (categoryName) {
                this.itemCategory.classList.remove(...categoryClasses);
                this.itemCategory.classList.add(`card__category_${categoryName[0]}`);
            }
        }
    } 

    set image ({image, title} : {image: string, title: string}) {
        if (this.itemImage) {
            this.itemImage.src = `${CDN_URL}/${image}`; 
            this.itemImage.alt = title;
        }
    }

    set description (description: string) {
        if (this.itemDescription) {
            this.itemDescription.textContent = description; 
        }
    }

    set price (price: number) {
        super.price = price;

        if (price === null) {
            if (this.addToBasketButton) {
                this.addToBasketButton.disabled = true;
            }
        }
        else {
            if (this.addToBasketButton) {
                this.addToBasketButton.disabled = false;
            }
        }
    }

    addToBasketRender() {
        if (this.basketDirection === BASKET_IN) {
            this.addToBasketButton.textContent = 'В корзину';
        }
        else {
            this.addToBasketButton.textContent = 'Из корзины';
        }  
    }
    
    set basketDirection(direction: string) {
        this._basketDirection = direction;
    }

    get basketDirection() {
        return this._basketDirection;
    }

    basketDirectionToggle() {
        if (this.basketDirection === BASKET_IN) {
            this.basketDirection = BASKET_OUT;
        }
        else {
            this.basketDirection = BASKET_IN;
        }        
    }
}

