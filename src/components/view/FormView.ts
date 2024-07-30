import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export abstract class FormView<T> extends Component<T> {
    protected _form: HTMLFormElement;
    protected formName: string;
    protected _error: HTMLSpanElement;
    protected submitButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container);
        this.events = events;
        this._form = this.container;
		this.formName = this.container.getAttribute('name');
        this._error = this.container.querySelector('.form__errors');
        this.submitButton = this.container.querySelector('.modal__actions').querySelector('.button');

		this.container.addEventListener('input', (event: InputEvent) => {
			this.inputHandler(event);
		});

        this.submitButton.addEventListener('click', (event: InputEvent) => {
			event.preventDefault();
			this.events.emit(`${this.formName}Form:submit`, this.getInputValues());
		});
    }

    protected inputHandler(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        const field = target.name;
        const value = target.value;
        this.events.emit(`${this.formName}Form:input`, { field, value });
    }

    protected abstract getInputValues(): Record<string, string>;

    get form() {
		return this.container;
	}

    set error(isValid: boolean) {
        this._error.textContent = isValid ? '' : 'Не заполнены необходимые поля';
    }

    set valid(isValid: boolean) {
		this.submitButton.disabled = !isValid;
        this.error = isValid;
	}

    close() {
        this.container.reset();
	}

}

