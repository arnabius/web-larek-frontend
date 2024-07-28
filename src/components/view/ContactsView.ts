import { IContactView } from "../../types";
import { IEvents } from "../base/events";
import { FormView } from "./FormView";

export class ContactsView extends FormView<IContactView> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;
    protected inputs: NodeListOf<HTMLInputElement>;

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._email = this._form.email;
        this._phone = this._form.phone;
        this.inputs = this.container.querySelectorAll('.form__input');
    }

    set email(emailValue: string) {
        this._email.value = emailValue;
    }

    get email() {
        return this._email.value;
    }

    set phone(phoneValue: string) {
        this._phone.value = phoneValue;
    }

    get phone() {
        return this._phone.value;
    }

    protected getInputValues() {
		const valuesObject: Record<string, string> = {};

        this.inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
	}

    checkValidation() {
        if (this.email && this.phone) {
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
}
