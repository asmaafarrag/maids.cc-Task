import { TaxTypeCalcWay } from './../Models/tax-type-calc-way';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TaxType } from '../Models/tax-type';

@Injectable({
  providedIn: 'root'
})
export class TaxTypeService {

  formData : TaxType;
  constructor(private http: HttpClient) { }

  getTaxTypes(): Observable<TaxType[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TaxTypes', { headers: reqHeader }).pipe(map(data => <TaxType[]>data));
  }

  getTaxTypeCalcWay(): Observable<TaxTypeCalcWay[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TaxTypeCalcWay', { headers: reqHeader }).pipe(map(data => <TaxTypeCalcWay[]>data));
  }

  getTaxTypesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TaxTypes/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postTaxTypes() {
    return this.http.post(environment.ApiUrl + '/api/TaxTypes', this.formData);
  }

  putTaxTypes() {
    return this.http.put(environment.ApiUrl + '/api/TaxTypes/' + this.formData.TaxTypeID, this.formData);
  }

  deleteTaxTypes(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/TaxTypes/' + Id);
  }


  getTaxTypeById(Id: number): Observable<TaxType> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TaxTypes/' + Id, { headers: reqHeader }).pipe(map(data => <TaxType>data));
  }

}
