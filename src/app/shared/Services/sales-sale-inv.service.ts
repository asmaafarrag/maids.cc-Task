import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SalesSaleInv , SalesSaleInvDet } from '../Models/sales-sale-inv';

import { environment } from 'src/environments/environment';
import { SalesInv } from '../Models/sales-inv';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class SalesSaleInvService {

  formData: SalesSaleInv;
  //saleInvItems : SalesSaleInvDet[];
  url="http://www.sas.edu.sg/uploaded/SAS/Learning_at_SAS/IS/More_Resources/docs/Grade_Level_Links_Grade5_Science_Animal_Kingdom_Defn.pdf"

  constructor(private http: HttpClient) { }

  //getSaleInvs(): Observable<SalesSaleInv[]> {
  getSaleInvs(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSaleInvsByEmp(EmpID: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetByEmp/'+EmpID, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSaleInvsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  postSaleInv() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      saleInvItems: this.formData.saleInvItems
    };
    return this.http.post(environment.ApiUrl + '/api/Sellings', body);
  }

  putSaleInv() {
    return this.http.put(environment.ApiUrl + '/api/Sellings/' + this.formData.SellingId, this.formData);
  }

  deleteSaleInv(SellingId:number) {
    return this.http.delete(environment.ApiUrl + '/api/Sellings/' + SellingId);
  }

  IsUnderCreditLimit(CustomerID: number): Observable<boolean> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Customers/IsUnderCreditLimit/' + CustomerID, { headers: reqHeader }).pipe(map(data => <boolean>data));
  }

  GetMaxSellingsNo(): Observable<string> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetMaxSellingsNo', { headers: reqHeader }).pipe(map(data => <string>data));
  }


  getSaleInvById(saleInvId: number): Observable<SalesSaleInv> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/' + saleInvId, { headers: reqHeader }).pipe(map(data => <SalesSaleInv>data));
  }

  // downloadPDF(): any {
  //   return this.http.get(this.url, { responseType: 'blob'})
  //           .pipe(map(res => {
  //           return new Blob([res], { type: 'application/pdf', });
  //     }));
  // }


}
