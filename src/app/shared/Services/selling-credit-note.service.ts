import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import { SalesSaleInv , SalesSaleInvDet } from '../Models/sales-sale-inv';

import { environment } from 'src/environments/environment';
import { SalesInv } from '../Models/sales-inv';
import { SellingCreditNotes } from '../Models/SellingCreditNotes';
import { Selling } from '../Models/selling';
import { DocumentInvoice } from '../Models/document-invoice';

@Injectable({
  providedIn: 'root'
})
export class SellingCreditNoteService {

  
  formData: SellingCreditNotes;
  //saleInvItems : SalesSaleInvDet[];

  constructor(private http: HttpClient) { }

  //getSellingCreditNotes(): Observable<SellingCreditNotes[]> {
  getSellingCreditNotes(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSellingCreditNotesByEmp(EmpID: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/GetByEmp/'+EmpID, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSellingCreditNotesByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  GetUnSubmitedSellings(): Observable<SellingCreditNotes[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/GetUnSubmitedSellings', { headers: reqHeader }).pipe(map(data => <SellingCreditNotes[]>data));
    
  }

  GetEInvoiceFromSellings(SellingCreditNoteId:number): Observable<DocumentInvoice> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + 'api/EInvoice/GenerateInvoice/' + SellingCreditNoteId, { headers: reqHeader }).pipe(map(data => <DocumentInvoice>data));
    
  }

  

  postSellingCreditNote() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      SellingCreditNoteDets: this.formData.SellingCreditNoteDets
    };
    return this.http.post(environment.ApiUrl + '/api/SellingCreditNotes', body);
  }

  PostETASubmit(sellingList :SellingCreditNotes[],generatedAccessToken :string) {
    var body = {
      salInvModelList: sellingList,
      generatedAccessToken: generatedAccessToken
    };
console.log(body);
    return this.http.post(environment.ApiUrl + '/api/SellingCreditNotes/ETASubmit', body);
  }

  putSellingCreditNotes() {
    return this.http.put(environment.ApiUrl + '/api/SellingCreditNotes/' + this.formData.SellingCreditNoteId, this.formData);
  }

  deleteSellingCreditNotes(SellingCreditNoteId:number) {
    return this.http.delete(environment.ApiUrl + '/api/SellingCreditNotes/' + SellingCreditNoteId);
  }

  

  GetMaxSellingsNo(): Observable<string> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/GetMaxSellingsNo', { headers: reqHeader }).pipe(map(data => <string>data));
  }


  getSellingCreditNotesById(SellingCreditNoteId: number): Observable<SellingCreditNotes> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingCreditNotes/' + SellingCreditNoteId, { headers: reqHeader }).pipe(map(data => <SellingCreditNotes>data));
  }


}
