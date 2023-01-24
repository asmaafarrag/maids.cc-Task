import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Purchasing } from '../Models/purchasing';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  formData : Purchasing;
  constructor(private http: HttpClient) { }

  getPurchasings(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Purchasings', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  getPurchasingsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Purchasings/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  postPurchasing() {
    var body = {
      ...this.formData,
      addDets: this.formData.purchasingDets
    };
    return this.http.post(environment.ApiUrl + '/api/Purchasings', body);
  }

  postPurchasingForSelling() {
    var body = {
      ...this.formData,
      addDets: this.formData.purchasingDets
    };
    return this.http.post(environment.ApiUrl + '/api/Purchasings/PurchasingForSelling', body);
  }

  putPurchasing() {
    return this.http.put(environment.ApiUrl + '/api/Purchasings/' + this.formData.PurchasingID, this.formData);
  }

  deletePurchasing(PurchasingID : number) {
    return this.http.delete(environment.ApiUrl + '/api/Purchasings/' + PurchasingID);
  }


  getPurchasingById(saleInvId: number): Observable<Purchasing> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Purchasings/' + saleInvId, { headers: reqHeader }).pipe(map(data => <Purchasing>data));
  }

}

