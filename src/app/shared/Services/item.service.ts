import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../Models/item';
import { environment } from 'src/environments/environment';

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
    return this.http.get(environment.ApiUrl + '/api/Items/get-Items-with-pagination', { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  // GetUnSubmitedItems(sellingList :Item[] ,EInvMode :string){
  //   var body = {
  //     salInvModelList: sellingList,
  //     // generatedAccessToken: generatedAccessToken,
  //     EInvMode:EInvMode
  //   };
  //   console.log(body);
  //   //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   // return this.http.get(environment.ApiUrl + '/api/v1.0/codetypes/requests/codes', { headers: reqHeader }).pipe(map(data => <Item[]>data));
  //   return this.http.post(environment.ApiUrl + '/api/v1.0/codetypes/requests/codes?EInvMode='+ EInvMode, body.salInvModelList);
  // }


  postItems() {
    var body = {
      ...this.formData,
      addDets: this.formData.itemPrices
    };
    console.log(body,"body")
    return this.http.post(environment.ApiUrl + '/api/Items/add-item', body);
  }

  putItem() {
    return this.http.put(environment.ApiUrl + '/api/Items/update-item/' + this.formData.item_ID, this.formData);
  }

  putItemPrices() {
    return this.http.put(environment.ApiUrl + '/api/Items/update-item-prices/' + this.formData.item_ID, this.formData);
  }

  deleteItem(ItemId:number) {
    return this.http.delete(environment.ApiUrl + '/api/Items/delete-item/' + ItemId);
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
    return this.http.get(environment.ApiUrl + '/api/Items/get-item-by-id/' + saleInvId, { headers: reqHeader }).pipe(map(data => <Item>data));
  }


  getItemWPriceById(id: number): Observable<Item> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Items/get-item-with-price-by-id/' + id, { headers: reqHeader }).pipe(map(data => <Item>data));
  }



}
