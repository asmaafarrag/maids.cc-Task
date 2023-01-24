import { Contracts } from './../Models/contracts';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PriceLists } from '../Models/price-lists';
@Injectable({
  providedIn: 'root'
})
export class PriceListsService {

    formData: PriceLists;
    constructor(private http: HttpClient) { }

    getPriceLists(param): any {
      //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/get-pricelists-drop-down-list', { headers: reqHeader, params: param }).pipe(map(data => data));
    }

    getPriceListPages(param): any {
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/get-pricelists-with-pagination', { headers: reqHeader, params: param }).pipe(map(data => data));
    }

    postPriceLists() {
      var body = {
        ...this.formData,
        //saleInvItems:this.saleInvItems
        priceListItems: this.formData.priceListItems,
        priceListOtherItems: this.formData.priceListOtherItems,
        priceListAddOns: this.formData.priceListAddOns,
      };
      console.log(body , "body")
      return this.http.post(environment.ApiUrl + '/api/PriceLists/add-pricelist', body);
    }

    putPriceLists() {
      console.log(this.formData)
      return this.http.put(environment.ApiUrl + '/api/PriceLists/update-pricelist/' + this.formData.priceList_ID, this.formData);
    }

    deletePriceLists(id:number) {
      return this.http.delete(environment.ApiUrl + '/api/PriceLists/delete-pricelist/' + id);
    }

    getPriceListsById(id: number): Observable<PriceLists> {
      //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/get-pricelist-by-id/' + id, { headers: reqHeader }).pipe(map(data => <PriceLists>data));
    }


    GetUserPriceListsContractsReport(userId: any , fromDate? : Date , toDate? : Date) : any {
      //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/get-user-pricelists-contracts-report?userId='+userId+'&fromDate='+fromDate+'&toDate='+toDate, { headers: reqHeader }).pipe(map(data => <PriceLists[]>data));
    }

    GetUserContractsReport(userId: any , fromDate? : Date , toDate? : Date) : any {
      //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/get-user-pricelists-contracts-report?userId='+userId+'&fromDate='+fromDate+'&toDate='+toDate, { headers: reqHeader }).pipe(map(data => <Contracts[]>data));
    }

  }
