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
      return this.http.get(environment.ApiUrl + '/api/PriceLists', { headers: reqHeader, params: param }).pipe(map(data => data));
    }

    getPriceListPages(param): any {
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
    }
  
    postPriceLists() {
      var body = {
        ...this.formData,
        //saleInvItems:this.saleInvItems
        PriceListDets: this.formData.PriceListDets
      };
      return this.http.post(environment.ApiUrl + '/api/PriceLists', body);
    }
  
    putPriceLists() {
      return this.http.put(environment.ApiUrl + '/api/PriceLists/' + this.formData.PriceListID, this.formData);
    }
  
    deletePriceLists(id:number) {
      return this.http.delete(environment.ApiUrl + '/api/PriceLists/' + id);
    }
  
    getPriceListsById(id: number): Observable<PriceLists> {
      //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/PriceLists/' + id, { headers: reqHeader }).pipe(map(data => <PriceLists>data));
    }
  
  
  
  }
  