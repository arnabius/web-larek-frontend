import { ISuccessView } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class SuccessView extends Component<ISuccessView> {
    protected _total: HTMLParagraphElement;
    protected successButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container);
        this.events = events;
        this._total = this.container.querySelector('.order-success__description');

        this.successButton = this.container.querySelector('.order-success__close');
        this.successButton.disabled = false;

        this.successButton.addEventListener('click', (event: InputEvent) => {
			event.preventDefault();
			this.events.emit('success:submit', this);
		});
    }

    set total(totalSum: number) {
        this._total.textContent = `Списано ${totalSum} синапсов`
    }

}
