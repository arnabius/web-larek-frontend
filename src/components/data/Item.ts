import { IEvents } from "../base/events";
import { IItem, IItemData } from "../../types";

/*export class Item implements IItem {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    price: number;

    get id () {
        return this._id;
    }
}*/

export class ItemData implements IItemData {
    items: IItem[];
    protected _previewId: string | null;
    protected events: IEvents;
    
    constructor(events: IEvents) {
        this.events = events;
    }

    get previewId (): string | null {
        return this._previewId;
    }

    set previewId(itemId: string | null) {
        if (!itemId) {
            this._previewId = null;
        }
        const selectedItem = this.getItem(itemId);
        if (selectedItem) {
            //////this.events.emit('item:selected');
            this._previewId = itemId;
        }
    }

    getItem(itemId: string) {
        return this.items.find((item) => item.id === itemId)
    }

    getItems(): IItem[] {
        return this.items;
    }

}