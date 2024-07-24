import { IApi, IItem, IItemApi, IPurchase, TPurchaseSaveResponse } from '../../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<IItemApi> {
		return this._baseApi.get<IItemApi>(`/product`).then((itemsApi: IItemApi) => itemsApi);
	}

	/*getItem(itemId: string): Promise<TItemInfo> {
		return this._baseApi.get<IItem>(`/product/${itemId}`).then((item: IItem) => item);
	}*/

	savePurchase(data: IPurchase): Promise<TPurchaseSaveResponse> {
		return this._baseApi.post<TPurchaseSaveResponse>(`/order`, data).then((item: TPurchaseSaveResponse) => item);
	}

	/*addCard(data: TCardInfo): Promise<ICard> {
		return this._baseApi.post<ICard>(`/cards`, data).then((card: ICard) => card);
	}

	addItemInBasket(data: TPurchase): Promise<boolean> {
		return this._baseApi.post<IItem>(`/order`, data).then((item: IItem) => item);
	}

	
	delItemFromBasket(cardID: string): Promise<{ message: string }> {
		return this._baseApi.post<{ message: string }>(`/cards/${cardID}`, {}, 'DELETE').then(
			(res: { message: string }) => res
		);
	}

	setUserInfo(data: TUserBaseInfo): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me`, data, 'PATCH').then((res: IUser) => res);
	}

	setUserAvatar(data: TUserAvatar): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me/avatar`, data, 'PATCH').then(
			(res: IUser) => res
		);
	}*/

}
