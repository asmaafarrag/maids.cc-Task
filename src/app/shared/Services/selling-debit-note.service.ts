import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import { SalesSaleInv , SalesSaleInvDet } from '../Models/sales-sale-inv';

import { environment } from 'src/environments/environment';
import { SalesInv } from '../Models/sales-inv';
import { SellingDebitNotes } from '../Models/SellingDebitNotes';
import { Selling } from '../Models/selling';
import { DocumentInvoice } from '../Models/document-invoice';

@Injectable({
  providedIn: 'root'
})
export class SellingDebitNoteService {

  
  formData: SellingDebitNotes;
  //saleInvItems : SalesSaleInvDet[];

  constructor(private http: HttpClient) { }

  //getSellingDebitNotes(): Observable<SellingDebitNotes[]> {
  getSellingDebitNotes(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSellingDebitNotesByEmp(EmpID: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/GetByEmp/'+EmpID, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getSellingDebitNotesByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  GetUnSubmitedSellings(): Observable<SellingDebitNotes[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/GetUnSubmitedSellings', { headers: reqHeader }).pipe(map(data => <SellingDebitNotes[]>data));
    
  }

  GetEInvoiceFromSellings(SellingDebitNoteId:number): Observable<DocumentInvoice> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + 'api/EInvoice/GenerateInvoice/' + SellingDebitNoteId, { headers: reqHeader }).pipe(map(data => <DocumentInvoice>data));
    
  }

  

  postSellingDebitNote() {
    var body = {
      ...this.formData,
      //saleInvItems:this.saleInvItems
      SellingDebitNoteDets: this.formData.SellingDebitNoteDets
    };
    return this.http.post(environment.ApiUrl + '/api/SellingDebitNotes', body);
  }

  PostETASubmit(sellingList :SellingDebitNotes[],generatedAccessToken :string) {
    var body = {
      salInvModelList: sellingList,
      generatedAccessToken: generatedAccessToken
    };
console.log(body);
    return this.http.post(environment.ApiUrl + '/api/SellingDebitNotes/ETASubmit', body);
  }

  putSellingDebitNotes() {
    return this.http.put(environment.ApiUrl + '/api/SellingDebitNotes/' + this.formData.SellingDebitNoteId, this.formData);
  }

  deleteSellingDebitNotes(SellingDebitNoteId:number) {
    return this.http.delete(environment.ApiUrl + '/api/SellingDebitNotes/' + SellingDebitNoteId);
  }

  

  GetMaxSellingsNo(): Observable<string> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/GetMaxSellingsNo', { headers: reqHeader }).pipe(map(data => <string>data));
  }


  getSellingDebitNotesById(SellingDebitNoteId: number): Observable<SellingDebitNotes> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SellingDebitNotes/' + SellingDebitNoteId, { headers: reqHeader }).pipe(map(data => <SellingDebitNotes>data));
  }


}
