import { ICardView, IItem, TCardType } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { CDN_URL, BASKET_IN, BASKET_OUT, categoryArray, categoryClasses } from '../../utils/constants';

export class Card extends Component<ICardView> {
    protected _cardType: TCardType;
    protected itemId: string;
	protected itemIndex: HTMLSpanElement;
	protected itemTitle: HTMLElement;
    protected itemCategory?: HTMLSpanElement;
	protected itemImage?: HTMLImageElement;
	protected itemDescription?: HTMLElement;
    protected itemPrice: HTMLSpanElement;
    protected addToBasketButton?: HTMLButtonElement; 
    protected delFromBasketButton?: HTMLButtonElement; 
    protected _basketDirection: string;
	protected events: IEvents;
    
    constructor(protected container: HTMLElement, type: TCardType, events: IEvents) {
        super(container);
        this.events = events;
        this.cardType = type;
        this.itemTitle = this.container.querySelector('.card__title');
        this.itemCategory = this.container.querySelector('.card__category');
        this.itemIndex = this.container.querySelector('.basket__item-index');
        this.itemImage = this.container.querySelector('.card__image');
        this.itemDescription = this.container.querySelector('.card__text');
        this.itemPrice = this.container.querySelector('.card__price');
        this.basketDirection = BASKET_IN;

        if (this.cardType === 'catalog') {
            this.container.addEventListener('click', (event: InputEvent) => {
                this.events.emit('card:open', this );
            });
        }
        else        
        if (this.cardType === 'basket') {
            // Кнопка "Удалить из корзины"
            this.delFromBasketButton = this.container.querySelector('.basket__item-delete');
            if (this.delFromBasketButton) {
                this.delFromBasketButton.addEventListener('click', () => {
                    this.basketDirection = BASKET_OUT;
                    this.events.emit('basket:change', this)
                });
            }
        }
        else 
        if (this.cardType === 'preview') {
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
    }
       
    render(itemData: IItem, index?: number): HTMLElement {
        if (this.itemIndex) {
            this.itemIndex.textContent = index.toString();
        }

        const {image, title, ...otherItemData} = itemData;
        this.title = title;
        this.image = {image, title};

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

    set title (title: string) {
        this.itemTitle.textContent = title;   
    }

    set price (price: string) {
        if (price === null) {
            this.itemPrice.textContent = "Бесценно";
            if (this.addToBasketButton) {
                this.addToBasketButton.disabled = true;
            }
        }
        else {
            this.itemPrice.textContent = price.toString() + " синапсов";   
            if (this.addToBasketButton) {
                this.addToBasketButton.disabled = false;
            }
        }
    }

    set id (id: string) {
		this.itemId = id;
	}

	get id() {
		return this.itemId;
	}
   
    set cardType(type: TCardType) {
        this._cardType = type;
    }

    get cardType() {
        return this._cardType;
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

