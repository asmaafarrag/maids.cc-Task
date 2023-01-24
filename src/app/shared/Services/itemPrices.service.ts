import { ItemPriceModel } from 'src/app/shared/Models/item-price-model';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../Models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemPricesService {

  formData : ItemPriceModel;
  constructor(private http: HttpClient) { }

  // getItemsList(param): any {
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/Item/GetItemList', { headers: reqHeader, params: param }).pipe(map(data => data));
  // }


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



  // postCreateEGSCodeUsageDTO(ItemID:number) {
  //   return this.http.post(environment.ApiUrl + '/api/v1.0/EGS/requests/codes?ItemID='+ ItemID, this.formData);
  // }

  // postItem() {
  //   return this.http.post(environment.ApiUrl + '/api/Item', this.formData);
  // }

  // postItems() {
  //   var body = {
  //     ...this.formData,
  //     addDets: this.formData.ItemPrices
  //   };
  //   return this.http.post(environment.ApiUrl + '/api/Item', body);
  // }

  // putItem() {
  //   return this.http.put(environment.ApiUrl + '/api/Item/' + this.formData.Item_ID, this.formData);
  // }

  // deleteItem(ItemId:number) {
  //   return this.http.delete(environment.ApiUrl + '/api/Item/' + ItemId);
  // }

  // GetMaxItemNo(): Observable<number> {
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/Item/GetMaxItemNo', { headers: reqHeader }).pipe(map(data => <number>data));
  // }

  // getItemById(saleInvId: number): Observable<Item> {
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/Item/' + saleInvId, { headers: reqHeader }).pipe(map(data => <Item>data));
  // }


}
