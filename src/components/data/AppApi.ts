import { IApi, IBasket, IContactsData, IItem, IItemApi, IOrder, IOrderData, TPurchaseSaveResponse } from '../../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<IItemApi> {
		return this._baseApi.get<IItemApi>(`/product`).then((itemsApi: IItemApi) => itemsApi);
	}

	savePurchase(data: IBasket | IOrderData | IContactsData): Promise<TPurchaseSaveResponse> {
		return this._baseApi.post<TPurchaseSaveResponse>(`/order`, data).then((item: TPurchaseSaveResponse) => item);
	}
}
