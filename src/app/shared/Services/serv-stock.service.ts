import { User } from './../Models/user.model';
import { ItemTaxTypes } from 'src/app/shared/Models/item-tax-types';
import { from, Observable, of , throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Store } from "../Models/Store";
import { Stock } from "../Models/Stock";
import { Item } from '../Models/item';
import { SellingDet } from '../Models/selling-det';
import { Customer } from '../Models/customer.model';
import { SalesUnits } from '../Models/sales-units';

import { environment } from 'src/environments/environment';
import { ItemCardView } from '../Models/item-card-view';
import { ItemTransferView } from '../Models/item-transfer-view';
import {saveAs} from 'file-saver'
import { CompanyType } from '../Models/company-type';

declare var require: any;


@Injectable({
  providedIn: 'root'
})
export class ServStockService {

 //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
 //readonly rootUrl = 'http://localhost:22376';

  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Store', { headers: reqHeader }).pipe(map(data => <Store[]>data));
  }



  getStoresByUser(UserID:string): Observable<Store[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Stores/GetByUser/'+UserID, { headers: reqHeader }).pipe(map(data => <Store[]>data));
  }


  getItems(): Observable<Item[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Items/get-Items-drop-down-list', { headers: reqHeader }).pipe(map(data => <Item[]>data));
  }


  GetItemTaxTypes(ItemID : number): Observable<ItemTaxTypes[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetItemTaxTypes?ItemID='+ItemID, { headers: reqHeader }).pipe(map(data => <ItemTaxTypes[]>data));
  }

  GetItemsByEGS(): Observable<Item[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetItemsByEGS', { headers: reqHeader }).pipe(map(data => <Item[]>data));
  }
  getItemsWithQty(): Observable<Item[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetItemsWithQty', { headers: reqHeader }).pipe(map(data => <Item[]>data));
  }

  getUnits(): Observable<SalesUnits[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UNITs', { headers: reqHeader }).pipe(map(data => <SalesUnits[]>data));
  }

  getStockItems(StoreID: number , hideZeros : boolean) : Observable<Stock[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock?StoreID='+StoreID+'&Hide_Zeros='+hideZeros, { headers: reqHeader }).pipe(map(data => <Stock[]>data));
  }

  getStockItems_By_ItemId(StoreID: number,ItemID : number , hideZeros : boolean) : Observable<Stock[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock?StoreID='+StoreID+'&ItemID='+ItemID+'&Hide_Zeros='+hideZeros, { headers: reqHeader }).pipe(map(data => <Stock[]>data));
  }

  getItemCardView(StoreID: number,ItemID : number) : Observable<ItemCardView[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock/GetItemCardView?StoreID='+StoreID+'&ItemID='+ItemID, { headers: reqHeader }).pipe(map(data => <ItemCardView[]>data));
  }


  GetItemTransferViews(StoreID: number,ItemID : number, fromDate : Date , toDate : Date) : Observable<ItemTransferView[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock/GetItemTransferViews?StoreID='+StoreID+'&ItemID='+ItemID+'&fromdate='+fromDate+'&ToDate='+toDate, { headers: reqHeader }).pipe(map(data => <ItemTransferView[]>data));
  }

  GetCustomersByEmpId(empId: string): Observable<Customer[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Customer/GetCustomersByEmpId?EmpId='+empId, { headers: reqHeader }).pipe(map(data => <Customer[]>data));
  }

  getCustomers(): Observable<Customer[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Customers/get-customers-drop-down-list', { headers: reqHeader }).pipe(map(data => <Customer[]>data));
  }


  getUsers(): Observable<User[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Customers/get-customers-drop-down-list', { headers: reqHeader }).pipe(map(data => <User[]>data));
  }
  getCompanyType(): Observable<CompanyType[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CompanyTypes', { headers: reqHeader }).pipe(map(data => <CompanyType[]>data));
  }


  getSellingDet(StoreID: number,ItemID : number , CustomerID : number , fromDate : Date , toDate : Date) : Observable<SellingDet[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });

    return this.http.get(environment.ApiUrl + '/api/SellingDet?StoreID='+StoreID+'&ItemID='+ItemID+'&CustomerID='+CustomerID+'&fromdate='+fromDate+'&ToDate='+toDate, { headers: reqHeader }).pipe(map(data => <SellingDet[]>data));
  }
  //getSellingDet(StoreID: number ) : Observable<SellingDet[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    //const reqHeader = new HttpHeaders({
      //'Content-Type': 'application/json', 'Authorization':
        //'Bearer ' + localStorage.getItem('userToken')
   // });
   // return this.http.get(this.rootUrl + '/api/V_Store_Stock?StoreID='+StoreID+'&Hide_Zeros='+hideZeros, { headers: reqHeader }).pipe(map(data => <Stock[]>data));
  //}


  // getPdfDocument(): Observable<HttpResponse<Blob>> {

  //    window.open( 'http://104.196.134.107/AfitAPI/Report/Report' , '_blank');

  //   return this.http.get( 'http://104.196.134.107/AfitAPI/Report/Report',  { responseType: 'blob', observe: 'response' });
  // }


   downloadReport(file): Observable<any> {
    // Create url
    let url = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    var body = { filename: file };

    return this.http.post(url, body, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }


   downloadPDF(): any {
    var mediaType = 'application/pdf';
     return this.http.post('http://104.196.134.107/AfitAPI/Report/Report', {location: "report.pdf"}, { responseType: 'blob' }).subscribe(
        (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(blob, 'report.pdf');
        },
        e => { throwError(e); }
    );
}


}
