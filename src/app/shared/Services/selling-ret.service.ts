import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SellingRet,SellingRetDets } from '../Models/selling-ret';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SellingRetService {

  formData: SellingRet;
  //saleInvItems : SalesSaleInvDet[];

  constructor(private http: HttpClient) { }

  //getSaleInvs(): Observable<SalesSaleInv[]> {
  getSellingRets(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingRets', { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  getAllSellingRet(BranchId:number) :Observable<SellingRet[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UnSubmitedSellingRet?BranchId='+BranchId, { headers: reqHeader }).pipe(map(data => <SellingRet[]>data));
  }



  getSellingRetsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingRets/GetByUser/'+ UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  PostSellingRet(sellingList :SellingRet[],EInvMode :string , ActivityTypeCode:string) {
    var body = {
      salInvModelList: sellingList,
      ActivityTypeCode:ActivityTypeCode,
      // generatedAccessToken: generatedAccessToken,
      EInvMode:EInvMode
    };
    console.log(body);
    return this.http.post(environment.ApiUrl + '/api/v1/SelingRetSubmissions?EInvMode=' + EInvMode + '&ActivityTypeCode='+ ActivityTypeCode, body.salInvModelList);
  }

  postSellingRet() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      saleInvItems: this.formData.sellingRetDets
    };
    return this.http.post(environment.ApiUrl + '/api/SellingRetsdata', body);
  }

  putSellingRet() {
    return this.http.put(environment.ApiUrl + '/api/SellingRets/' + this.formData.SellingRetId, this.formData);
  }

  deleteSellingRet(SellingRetId:number) {
    return this.http.delete(environment.ApiUrl + '/api/SellingRets/' + SellingRetId);
  }


  GetMaxSellingRetsNo(): Observable<string> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingRets/GetMaxSellingRetsNo', { headers: reqHeader }).pipe(map(data => <string>data));
  }


  getSellingRetsById(SellingRetId: number): Observable<SellingRet> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingRets/' + SellingRetId, { headers: reqHeader }).pipe(map(data => <SellingRet>data));
  }


}
