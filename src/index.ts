import { Basket } from './components/data/Basket';
import { EventEmitter, IEvents } from './components/base/events';
import { ItemData } from './components/data/Item';
import { Order } from './components/data/Order';
import './scss/styles.scss';
import { IApi, IBasket, IItem, IPurchase } from './types';
import { Api } from './components/base/api';
import { API_URL, settings, BASKET_IN, BASKET_OUT } from './utils/constants';
import { AppApi } from './components/data/AppApi';
import { Purchase } from './components/data/Purchase';
import { Card } from './components/view/CardView';
import { itemsConst } from './utils/tempConstants';
import { cloneTemplate } from './utils/utils';
import { CardsContainer } from './components/view/CardsContainer';
import { Modal } from './components/common/Modal';
import { BasketHeader } from './components/view/BasketHeaderView';
import { BasketView } from './components/view/BasketView';
//import { Modal } from './components/ModalForm';

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const itemData = new ItemData(events);
//const itemData1 = new ItemData(events);
const basket = new Basket(events);
// Значок корзины в шапке страницы
const basketHeader = new BasketHeader(document.querySelector('.header__container'), events);

const order = new Order(events);
const purchase = new Purchase(events);

const cardsContainer = new CardsContainer(document.querySelector('.gallery'));


events.onAll((event) => {
    console.log(event.eventName, event.data)
})


// Получение массива товаров с сервера
api.getItems()
.then((itemsApi) => {
    itemData.items = itemsApi.items;
    events.emit('initialData:loaded');
})
.catch((err) => {
    console.error(err);
});

// Отрисовка карточки в списке товаров на главной странице на основании шаблона ('#card-catalog');
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog'); //('#card-preview'); //('#card-catalog');

// Отрисовка карточки в модалке на основании шаблона ('#card-preview');
const cardPreviewTemplate: HTMLTemplateElement = document.querySelector('#card-preview'); 
const cardPreview = new Card(cloneTemplate(cardPreviewTemplate), 'preview', events);

// Отрисовка карточки в корзине на основании шаблона
const cardBasketTemplate: HTMLTemplateElement = document.querySelector('#card-basket'); 
//const cardBasket = new Card(cloneTemplate(cardBasketTemplate), events);

// Отрисовка всей корзины на основании шаблона
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket'); 
// Содержимое корзины
const basketView = new BasketView(cloneTemplate(basketTemplate), events);




// отрисовка массива карточек  ('#card-catalog');
//const card = new Card(cloneTemplate(cardTemplate), events);
//const cardArray = [];
//cardArray.push(card.render(itemsConst[2]));  // пока выводим один товар
//cardsContainer.render({catalog:cardArray});

events.on('initialData:loaded', () => {
	const cardsArray = itemData.items.map((item) => {
		const cardInstant = new Card(cloneTemplate(cardTemplate), 'catalog', events);
		return cardInstant.render(item);
	});

	cardsContainer.render({ catalog: cardsArray });
});


const modal = new Modal(document.querySelector('#modal-container'), events);

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


events.on('basket:change', (cardItem: Card) => {
    const item = itemData.getItem(cardItem.id);
    // Карточка, которая будет показана в корзине, когда откроют корзину
    //const cardBasket = new Card(cloneTemplate(cardBasketTemplate), 'basket', events);

    if (cardItem.basketDirection === BASKET_IN) {
        basket.addItem(item);
        //item.index = basket.itemQty;
    }
    else {
        basket.delItem(item);
        //item.index = basket.itemQty;
    }

    /*console.log('basketView.items before: ', basketView.items);
    basketView.items = basket.itemsArr.map(item => {
        //console.log('basketView.itemsArr: ', basketView.itemsArr);
        const cardBasket = new Card(cloneTemplate(cardBasketTemplate), 'basket', events);
        
        return cardBasket.render(item)
    });
    console.log('basketView.items after: ', basketView.items);*/
    
    console.log('basket.itemsArr: ', basket.getItems());

    const basketViewItems = basket.getItems().map(item => {
        console.log('item: ', item);
        const cardBasket = new Card(cloneTemplate(cardBasketTemplate), 'basket', events);
        
        return cardBasket.render(item);
    });
    //console.log('basketViewItems: ', basketViewItems);
    
    basketView.items = basketViewItems;

    //console.log('basketView.items after: ', basketView.items);
    
    
    //basketView.render(basket.itemsArr, cardBasket);

    basketHeader.itemQty = basket.itemQty; 

    //console.log('basketView', basketView);
    
});

events.on('basket:open', (basketInfo: HTMLElement) => {
    modal.open();
    
    const basketData: IBasket = { itemsArr: basket.itemsArr, total: basket.total }
    modal.renderContent(basketView.render(basketData));
});

/*
const card = new Card(cloneTemplate(cardTemplate), events);
const card1 = new Card(cloneTemplate(cardTemplate), events);
const cardArray = [];
cardArray.push(card.render(itemsConst[0]));
cardArray.push(card1.render(itemsConst[1]));

cardsContainer.render({catalog:cardArray})*/
//----------------
/*
events.on('initialData:loaded', () => {
	const cardsArray = itemData.items.map((item) => {
		const cardInstant = new Card(cloneTemplate(cardTemplate), events);
		return cardInstant.render(item);
	});

	cardsContainer.render({ catalog: cardsArray });
});*/
//----------------

//itemData.previewId = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9';
//console.log(itemData.previewId);
//-------------
/*
basket.addItem({
    "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    "image": "/Shell.svg",
    "title": "HEX-леденец",
    "category": "другое",
    "price": 1450
});

basket.addItem({
    "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
    "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
    "image": "/Soft_Flower.svg",
    "title": "Фреймворк куки судьбы",
    "category": "дополнительное",
    "price": 2500
});

basket.addItem({
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
});

console.log('Basket: ', basket);


order.addOrderDataToOrder('Онлайн', 'Тамбов');

order.addContactsToOrder('arnab@yandex.ru', '9999999999');

console.log('Order: ', order);*/
//---------------


/*//purchase.addBasketToPurchase(basket, basket.total);
purchase.items = ["c101ab44-ed99-4a54-990d-47aa2bb4e7d9", "412bcf81-7e75-4e70-bdb9-d3c73c9803b7", "854cef69-976d-4c2a-a18c-2aa45046c390"];
purchase.payment = 'Онлайн';
purchase.address = 'Тамбов';
purchase.email = 'arnab@yandex.ru';
purchase.phone = '9999999999';
purchase.total = 4700;*/
//console.log('Purchase: ', purchase);

/*
//purchase.savePurchase();
api.savePurchase(purchase)
.then((result) => {
    console.log('result', result); 
    //console.log('itemsFromApi.items', itemsApi.items);
    //itemData.items = itemsApi.items;
    //console.log('itemDataApi', itemData);
    //console.log('itemDataApi.getItems', itemData.getItems());
})
.catch((err) => {
    console.error(err);
});*/

//----
//console.log(order.checkContactsValidation('arnab@yandex.ru', '9999999999'));

