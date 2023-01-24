import { SellingAdds } from './../Models/selling-adds';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellingAddsService {

  formData: SellingAdds;
  //saleInvItems : SalesSaleInvDet[];

  constructor(private http: HttpClient) { }

  //getSaleInvs(): Observable<SalesSaleInv[]> {
  getSellingAdds(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingAdds', { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  getAllSellingAdds(BranchId:number) :Observable<SellingAdds[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UnSubmitedSellingAdd?BranchId='+BranchId, { headers: reqHeader }).pipe(map(data => <SellingAdds[]>data));
  }


  getSellingAddsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingAdds/GetByUser/'+ UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  // PostSellingAdds(sellingList :SellingAdds[],EInvMode :string , ActivityTypeCode:string) {
  //   var body = {
  //     salInvModelList: sellingList,
  //     ActivityTypeCode:ActivityTypeCode,
  //     // generatedAccessToken: generatedAccessToken,
  //     EInvMode:EInvMode
  //   };
  //   console.log(body);
  //   return this.http.post(environment.ApiUrl + '/api/v1/SelingRetSubmissions?EInvMode=' + EInvMode + '&ActivityTypeCode='+ ActivityTypeCode, body.salInvModelList);
  // }

  postSellingAdds() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      SellingAddDets: this.formData.SellingAddDets
    };
    return this.http.post(environment.ApiUrl + '/api/SellingAddsdata', body);
  }

  putSellingAdds() {
    return this.http.put(environment.ApiUrl + '/api/SellingAdds/' + this.formData.SellingAddId, this.formData);
  }

  deleteSellingAdds(SellingRetId:number) {
    return this.http.delete(environment.ApiUrl + '/api/SellingAdds/' + SellingRetId);
  }


  GetMaxSellingAddsNo(): Observable<string> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingAdds/GetMaxSellingAddsNo', { headers: reqHeader }).pipe(map(data => <string>data));
  }


  getSellingAddsById(SellingRetId: number): Observable<SellingAdds> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingAdds/' + SellingRetId, { headers: reqHeader }).pipe(map(data => <SellingAdds>data));
  }


}
