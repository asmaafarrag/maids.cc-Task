import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../Models/item';
import { environment } from 'src/environments/environment';
import { ItemPriceModel } from '../Models/item-price-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  formData : Item;
  constructor(private http: HttpClient) { }

  getItemsList(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetItemList', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getItemsPriceList(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetItempriceList', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  postItem() {
    return this.http.post(environment.ApiUrl + '/api/Item', this.formData);
  }

  postItems() {
    var body = {
      ...this.formData,
      addDets: this.formData.ItemTaxTypes
    };
    return this.http.post(environment.ApiUrl + '/api/Item', body);
  }
  
  putItem() {
    return this.http.put(environment.ApiUrl + '/api/Item/' + this.formData.ItemID, this.formData);
  }

  putItemPriceList(ItemsList :ItemPriceModel[]) {
   // console.log(this.formData , 'this.formData')
    return this.http.put(environment.ApiUrl + '/api/Item/PutItemPriceList' , ItemsList);
  }

  deleteItem(ItemId:number) {
    return this.http.delete(environment.ApiUrl + '/api/Item/' + ItemId);
  }

  GetMaxItemNo(): Observable<number> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetMaxItemNo', { headers: reqHeader }).pipe(map(data => <number>data));
  }

  getItemById(saleInvId: number): Observable<Item> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/' + saleInvId, { headers: reqHeader }).pipe(map(data => <Item>data));
  }


}
