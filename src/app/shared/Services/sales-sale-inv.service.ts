import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SalesSaleInv , SalesSaleInvDet } from '../Models/sales-sale-inv';

import { environment } from 'src/environments/environment';
import { SalesInv } from '../Models/sales-inv';
import { Selling } from '../Models/selling';
import { DocumentInvoice } from '../Models/document-invoice';

@Injectable({
  providedIn: 'root'
})
export class SalesSaleInvService {

  formData: SalesSaleInv;
  //saleInvItems : SalesSaleInvDet[];

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

  getAllSaleInvs():  Observable<SalesSaleInv[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
        
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetAllSellings', { headers: reqHeader }).pipe(map(data => <SalesSaleInv[]>data));
  }

  getSaleInvss(BranchId:number):  Observable<SalesSaleInv[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
        
    });
    console.log(BranchId , "BranchIdBranchIdBranchId")
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetUnSubmitedSellings?BranchId='+ BranchId, { headers: reqHeader }).pipe(map(data => <SalesSaleInv[]>data));
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

  GetUnSubmitedSellings(BranchId:number): Observable<SalesSaleInv[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Sellings/GetUnSubmitedSellings?BranchId=' + BranchId, { headers: reqHeader }).pipe(map(data => <SalesSaleInv[]>data));
    
  }

  GetEInvoiceFromSellings(SellingId:number): Observable<DocumentInvoice> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + 'api/EInvoice/GenerateInvoice/' + SellingId, { headers: reqHeader }).pipe(map(data => <DocumentInvoice>data));
    
  }

  

  postSaleInv() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      saleInvItems: this.formData.saleInvItems
    };
    return this.http.post(environment.ApiUrl + '/api/Sellings', body);
  }


  postSaleInvBulk(sellingList :SalesSaleInv[]) {
    var body = {
      ...sellingList
    };
    console.log(sellingList , "b");
    return this.http.post(environment.ApiUrl + '/api/Sellings/SaveBulk', sellingList);
  }

  

  PrintOutDocument() {
   
    return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/EPCGGB3SBBFE1G505RVH3BPF10');
  }

  downloadFile(): any {
		return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/EPCGGB3SBBFE1G505RVH3BPF10', {responseType: 'blob'});
  }

  PostETASubmit(sellingList :SalesSaleInv[] , EInvMode:string , ActivityTypeCode:string) {
    var body = {
      salInvModelList: sellingList,
      ActivityTypeCode:ActivityTypeCode,
      // generatedAccessToken: generatedAccessToken,
      EInvMode:EInvMode

    };
    console.log(body);
    return this.http.post(environment.ApiUrl + '/api/v1/EInvoiceSubmissions?EInvMode=' +EInvMode +'&ActivityTypeCode='+ActivityTypeCode, body.salInvModelList);
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


}
