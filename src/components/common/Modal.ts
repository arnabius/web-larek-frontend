import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal <T> extends Component<T> {
    protected modal: HTMLElement;
    protected events: IEvents;
    //protected type: string;
    protected content: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        const closeButtonElement = this.container.querySelector(".modal__close");
        closeButtonElement.addEventListener("click", this.close.bind(this));
        this.container.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this);
    }
  
    renderContent(content: HTMLElement) {
        this.content = this.container.querySelector(".modal__content");
        this.content.appendChild(content);
    }

    /*renderBasket(content: HTMLElement) {
        this.content = this.container.querySelector(".modal__content");
        this.content.appendChild(content);
    }*/

    open() {
        //console.log('container', this.container);
        this.container.classList.add("modal_active");
        
        document.addEventListener("keyup", this.handleEscUp);       
    }

    close() {
        this.container.classList.remove("modal_active");
        
        this.clear();

        document.removeEventListener("keyup", this.handleEscUp);
    }

    clear() {
        let elem = this.content;
        //let elem = this.container.querySelector(".modal__content");

        let child = elem.lastElementChild;
        while (child) {
            elem.removeChild(child);
            child = elem.lastElementChild;
        }
    }
  
    handleEscUp (evt: KeyboardEvent) {
      if (evt.key === "Escape") {
          this.close();
      }
    };
  }
  