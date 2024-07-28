import { ICardsContainer } from "../../types";
import { Component } from "../base/Component";

export class CardsContainer extends Component<ICardsContainer> {
    protected _catalog: HTMLElement;
    

    constructor(protected container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}