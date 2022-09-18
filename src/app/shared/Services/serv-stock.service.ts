import { SellingsOfPurchasingView } from './../Models/sellings-of-purchasing-view';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { Selling } from '../Models/selling';
import { FnGetSalesPerSellingTypeAndDateResult } from '../Models/fn-get-sales-per-selling-type-and-date-result';
import { GetStockFromAllStoresView } from '../Models/get-stock-from-all-stores-view';
import { GetAnalyzingSellingsAndIndebtedness } from '../Models/get-analyzing-sellings-and-indebtedness';
import { ItemTaxTypes } from '../Models/item-tax-types';

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
    return this.http.get(environment.ApiUrl + '/api/store', { headers: reqHeader }).pipe(map(data => <Store[]>data));
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
    return this.http.get(environment.ApiUrl + '/api/Item', { headers: reqHeader }).pipe(map(data => <Item[]>data));
  }

  GetItemTaxTypes(ItemID : number): Observable<ItemTaxTypes[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Item/GetItemTaxTypes?ItemID='+ItemID, { headers: reqHeader }).pipe(map(data => <ItemTaxTypes[]>data));
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


  // api/V_Store_Stock/GetSellingsOfPurchasing


  GetSellingsOfPurchasing(PurchasingNo : string) : Observable<SellingsOfPurchasingView[]>{
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock/GetSellingsOfPurchasing?PurchasingNo='+PurchasingNo, { headers: reqHeader }).pipe(map(data => <SellingsOfPurchasingView[]>data));
  }

  GetCustomersByEmpId(empId: string): Observable<Customer[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/customer/GetCustomersByEmpId?EmpId='+empId, { headers: reqHeader }).pipe(map(data => <Customer[]>data));
  }

  getCustomers(): Observable<Customer[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/customer', { headers: reqHeader }).pipe(map(data => <Customer[]>data));
  }

  GetSalesPerSellingTypeAndDate(storeId: number,sellingType : string , customerid : number , fdate : Date , tdate : Date) : Observable<FnGetSalesPerSellingTypeAndDateResult[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock/GetSalesPerSellingTypeAndDate?storeId='+storeId+'&sellingType='+sellingType+'&customerid='+customerid+'&fdate='+fdate+'&Tdate='+tdate, { headers: reqHeader }).pipe(map(data => <FnGetSalesPerSellingTypeAndDateResult[]>data));
  }


  GetStockFromAllStoresViews() : Observable<GetStockFromAllStoresView[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    
    return this.http.get(environment.ApiUrl + '/api/V_Store_Stock/GetStockFromAllStoresViews', { headers: reqHeader }).pipe(map(data => <GetStockFromAllStoresView[]>data));
  }
 

  GetAnalyzingSellingsAndIndebtedness( fdate : Date , tdate : Date) : Observable<GetAnalyzingSellingsAndIndebtedness[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    
    return this.http.get(environment.ApiUrl +'/api/V_Store_Stock/GetAnalyzingSellingsAndIndebtedness?fdate='+ fdate +'&Tdate='+tdate, { headers: reqHeader }).pipe(map(data => <GetAnalyzingSellingsAndIndebtedness[]>data));
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


}
