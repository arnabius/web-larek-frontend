import { Basket } from './components/data/Basket';
import { EventEmitter } from './components/base/events';
import { ItemData } from './components/data/ItemData';
import { Order } from './components/data/Order';
import './scss/styles.scss';
import { IApi, IBasket, IOrderData, IContactsData, IPurchase } from './types';
import { Api } from './components/base/api';
import { API_URL, settings, BASKET_IN, BASKET_OUT } from './utils/constants';
import { AppApi } from './components/data/AppApi';
import { Card } from './components/view/CardView';
import { cloneTemplate } from './utils/utils';
import { CardsContainer } from './components/view/CardsContainer';
import { Modal } from './components/common/Modal';
import { BasketHeader } from './components/view/BasketHeaderView';
import { BasketView } from './components/view/BasketView';
import { OrderView } from './components/view/OrderView';
import { ContactsView } from './components/view/ContactsView';
import { SuccessView } from './components/view/SuccessView';

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const itemData = new ItemData(events);
const basket = new Basket(events);
const order = new Order(events);


// Получение массива товаров с сервера
api.getItems()
.then((itemsApi) => {
    itemData.items = itemsApi.items;
    events.emit('initialData:loaded');
})
.catch((err) => {
    console.error(err);
});

// Конейнер с карточками товаров на главной странице
const cardsContainer = new CardsContainer(document.querySelector('.gallery'));
// Значок корзины в шапке страницы
const basketHeader = new BasketHeader(document.querySelector('.header__container'), events);
// Модальное окно
const modal = new Modal(document.querySelector('#modal-container'), events);

// Отрисовка карточки в списке товаров на главной странице на основании шаблона ('#card-catalog');
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog'); //('#card-preview'); //('#card-catalog');

// Отрисовка карточки в модалке на основании шаблона ('#card-preview');
const cardPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview'); 
const cardPreview = new Card(cloneTemplate(cardPreviewTemplate), 'preview', events);

// Отрисовка карточки в корзине на основании шаблона
const cardBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket'); 

// Отрисовка всей корзины на основании шаблона
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket'); 
// Содержимое корзины
const basketView = new BasketView(cloneTemplate(basketTemplate), events);

// Форма для ввода данных заказа: способа оплаты и адреса
const orderParamTemplate: HTMLTemplateElement = document.querySelector('#order');
const orderParamView = new OrderView(cloneTemplate(orderParamTemplate), events);

// Форма для ввода контактных данных: адреса эл. почты и телефона
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const contactsParamView = new ContactsView(cloneTemplate(contactsTemplate), events);

// Модалка с успешным завершением заказа
const successTemplate: HTMLTemplateElement = document.querySelector('#success');
const successView = new SuccessView(cloneTemplate(successTemplate), events);


events.on('initialData:loaded', () => {
	const cardsArray = itemData.items.map((item) => {
		const cardInstant = new Card(cloneTemplate(cardTemplate), 'catalog', events);
		return cardInstant.render(item);
	});

	cardsContainer.render({ catalog: cardsArray });
});

// Открытие карточки товара в модалке
events.on('card:open', (cardItem: Card) => {
    itemData.previewId = cardItem.id;
    const item = itemData.getItem(cardItem.id);
    
    // При открытии модалки проверим наличие товара в корзине, в соответствии с этим выведем надпись на кнопке "В корзину"
    if (basket.includes(item.id)) {
        cardPreview.basketDirection = BASKET_OUT;
    }
    else {
        cardPreview.basketDirection = BASKET_IN;
    }

    // Потом уже отрисуем модалку
    modal.open();
    modal.renderContent(cardPreview.render(item));

});

// Нажатие кнопки "В корзину"/"Из корзины"
events.on('basket:change', (cardItem: Card) => {
    const item = itemData.getItem(cardItem.id);

    basket.changeBasket(item);

    order.itemsArr = basket.itemsArr;
    order.total = basket.total;
});

// Изменение состава корзины
events.on('basket:changed', (cardItem: Card) => { 
    const basketViewItems = basket.getItems().map((item, index) => {
        const cardBasket = new Card(cloneTemplate(cardBasketTemplate), 'basket', events);
        
        return cardBasket.render(item, index + 1);
    });
    
    basketView.items = basketViewItems;
    basketView.total = basket.total;
    basketHeader.itemQty = basket.itemQty;   
});

// Открытие корзины
events.on('basket:open', (basketInfo: BasketView) => {
    modal.open();
    
    const basketData: IBasket = { itemsArr: basket.itemsArr, total: basket.total }
    modal.renderContent(basketView.render(basketData));
});

// Нажатие кнопки "Оформить" в корзине
events.on('basket:submit', () => {
    modal.clear();
    
    const orderData: IOrderData = { payment: order.payment, address: order.address }
    modal.renderContent(orderParamView.render(orderData));
    orderParamView.checkValidation();
});

// Ввод данных пользователем на форме данных заказа
events.on('orderForm:input', (inputElement: HTMLElement) => {
    orderParamView.checkValidation();
});

// Нажатие "Далее" на форме ввода данных заказа - сохранение данных в модели
events.on('orderForm:submit', (orderData: { payment: string, address: string }) => {
    order.addOrderDataToOrder(orderData);
});

// Отображение формы контактных данных после сохранения данных заказа
events.on('order:changed', () => {
    modal.clear();

    const contactsData: IContactsData = { email: order.email, phone: order.phone }
    modal.renderContent(contactsParamView.render(contactsData));
});

// Ввод данных пользователем на форме ввода контактных данных
events.on('contactsForm:input', (inputElement: HTMLElement) => {
    contactsParamView.checkValidation();
});

// Нажатие кнопки "Оплатить" на форме ввода контактных данных - завершение оформления заказа
events.on('contactsForm:submit', (contactsData: { email: string, phone: string }) => {
    order.addContactsToOrder(contactsData);
    //Отправим заказ на сервер
    const purchaseData: IPurchase = {
        items: order.itemsArr.map(item => {
            return item.id;
        }),
        total: order.total,
        payment: order.payment,
        address: order.address,
        email: order.email,
        phone: order.phone
    }

    api.savePurchase(purchaseData)
    .then((result) => {
        // Очистим объекты с данными 
        basket.clear();
        
        events.emit('order:sent', { totalSum: order.total });
        
        order.clear();
    })
    .catch((err) => {
        console.error(err);
    });   
});


// Данные на сервер отправлены - покажем успешную модалку
events.on('order:sent', (data: { totalSum: number }) => {
    modal.clear();
    basketView.clear();
    orderParamView.close();
    contactsParamView.close();

    modal.renderContent(successView.render( { total: data.totalSum }));   

});

// Закрытие формы успешного оформления заказа
events.on('success:submit', () => {
    modal.clear();
    modal.close();
});

