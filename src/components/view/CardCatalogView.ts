import { ICardView, IItem } from "../../types";
import { IEvents } from "../base/events";
import { CDN_URL, categoryArray, categoryClasses } from '../../utils/constants';
import { Card } from "./CardView";

export class CardCatalog extends Card<ICardView> {
    protected itemCategory: HTMLSpanElement;
	protected itemImage: HTMLImageElement;
	protected events: IEvents;
    
    constructor(protected container: HTMLElement, item: Partial<IItem>, events: IEvents) {
        super(container, item);
        this.events = events;
        this.itemCategory = this.container.querySelector('.card__category');
        this.itemImage = this.container.querySelector('.card__image');
        
        this.container.addEventListener('click', (event: InputEvent) => {
            this.events.emit('card:open', this );
        });
    }
       
    render(itemData: Partial<IItem>): HTMLElement {
        const {image, title, category } = itemData;
        this.title = title;
        this.image = {image, title};
        this.category = category;
        
        return super.render(itemData);
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
}

