import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SuppDiscount } from "../Models/supp-discount";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuppDiscountService {

  formData : SuppDiscount;
  constructor(private http: HttpClient) { }

  GetMaxInvsNo(): Observable<number> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SuppDiscounts/GetMaxNo', { headers: reqHeader }).pipe(map(data => <number>data));
  }

  getSuppDiscountsList(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SuppDiscounts/GetPages', { headers: reqHeader, params:param }).pipe(map(data => data));
  }


  postSuppDiscount() {
    return this.http.post(environment.ApiUrl + '/api/SuppDiscounts', this.formData);
  }

  putSuppDiscount() {
    return this.http.put(environment.ApiUrl + '/api/SuppDiscounts/'+this.formData.SuppDiscountId, this.formData);
  }

  deleteSuppDiscount(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/SuppDiscounts/'+ iD);
  }

  getSuppDiscountById(SuppDiscId : number): Observable<SuppDiscount> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SuppDiscounts/'+SuppDiscId, { headers: reqHeader }).pipe(map(data => <SuppDiscount>data));
  }

}
