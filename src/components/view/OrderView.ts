import { IOrderView } from "../../types";
import { CARD, CASH } from "../../utils/constants";
import { IEvents } from "../base/events";
import { FormView } from "./FormView";

export class OrderView extends FormView<IOrderView> {
    protected paymentButtons: NodeListOf<HTMLElement>;
    protected _payment: string;
    protected card: HTMLElement;
    protected cash: HTMLElement;
    protected _address: HTMLInputElement;

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.payment = '';
        this.paymentButtons = this.container.querySelectorAll<HTMLInputElement>('.order__buttons');
        this.card = this._form.card;
        this.cash = this._form.cash;
        this._address = this._form.address;

        this.card.addEventListener('click', (event: InputEvent) => {
            this.payment = CARD;
            this.inputHandler(event);
        });

        this.cash.addEventListener('click', (event: InputEvent) => {
            this.payment = CASH;
            this.inputHandler(event);
        });      
    }

    set payment(paymentType: string) {
        if (this.card && this.cash) {
            if (paymentType === CARD) {
                this.card.classList.add('button_alt-active');
                this.cash.classList.remove('button_alt-active');  
            }
            else
            if (paymentType === CASH) {
                this.card.classList.remove('button_alt-active');
                this.cash.classList.add('button_alt-active'); 
            }
            else {
                this.card.classList.remove('button_alt-active');
                this.cash.classList.remove('button_alt-active'); 
            }
        }

        this._payment = paymentType;
    }

    get payment(): string {
        return this._payment;
    }

    set address(addr: string) {
        this._address.value = addr;
    } 

    get address(): string {
        return this._address.value;
    }

    protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		valuesObject['payment'] = this.payment;
        valuesObject['address'] = this.address;

		return valuesObject;
	}

    checkValidation() {
        if (this.payment && this.address) {
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
}

