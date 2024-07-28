export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    headers: {
        authorization: `${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
    }
};

export const BASKET_IN = 'In';
export const BASKET_OUT = 'Out';

export const categoryArray = {
    'soft': 'софт-скил',
    'additional': 'дополнительное',
    'hard': 'хард-скил',
    'button': 'кнопка',
    'other': 'другое'
}

export const categoryClasses = Object.keys(categoryArray).map(item => { return `card__category_${item}` });


export const CARD = 'Онлайн'; //'card';
export const CASH = 'При получении'; //'cash';

