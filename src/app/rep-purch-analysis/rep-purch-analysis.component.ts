import { SellingsOfPurchasingView } from './../shared/Models/sellings-of-purchasing-view';
import { PurchasingService } from 'src/app/shared/Services/purchasing.service';
import { Purchasing } from 'src/app/shared/Models/purchasing';
import { SupplierService } from 'src/app/shared/Services/supplier.service';
import { Supplier } from './../shared/Models/supplier';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Stock } from '../shared/Models/Stock';
import { Store } from "../shared/Models/Store";
import { Item } from '../shared/Models/item';
import { ItemCardView } from '../shared/Models/item-card-view';

import { ServStockService } from '../shared/Services/serv-stock.service';
import { stringify } from '@angular/compiler/src/util';
import { ItemTransferView } from '../shared/Models/item-transfer-view';
@Component({
  selector: 'app-rep-purch-analysis',
  templateUrl: './rep-purch-analysis.component.html',
  styleUrls: ['./rep-purch-analysis.component.css']
})
export class RepPurchAnalysisComponent implements OnInit {

    storeslist : Supplier[] ;
    itemslist : Purchasing[] ;
    selectedstore : Supplier;
    
    selectedPurch : Purchasing;
  
    PurchasingName="";  
    stateCtrl = new FormControl();
    filteredStates: Observable<Purchasing[]>;
  
    UserID : string;
  
    ItemsCount: number = 0;
  
    TotalEGYTPrice: number = 0;
    TotalDollarPrice: number = 0;

    LTotalEGYTPrice: number = 0;
    LTotalDollarPrice: number = 0;
    TotPurchasing_Qty:number =0;

    ItemTransferViewList : SellingsOfPurchasingView[];
  
    fromDate = new FormControl();
    toDate = new FormControl(new Date());
  
    constructor(private servStockService: ServStockService , public supplierServ : SupplierService , public purchServ:PurchasingService) {  
      this.UserID = localStorage.getItem('lUsr');         
     }
  
    ngOnInit() {    
      this.getStores();
      this.getItems();  
      
      
      this.selectedstore = new Supplier();
      this.selectedstore.SupplierId = 0;   
          
      var today = new Date(); 
      today.setDate(today.getDate() - 30);    
      this.fromDate.patchValue(today);
    }
  
    getStores() {
      this.supplierServ.getSuppliers().subscribe(res=> this.storeslist = res) ;   
    }

  
    getItems() {
      this.purchServ.getPurchasingss().subscribe((data: any) => {
        this.itemslist = data;
        this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.PurchasingName),
          map(state => state ? this._filterStates(state) : this.itemslist.slice())
        ); 
      },
        (err: HttpErrorResponse) => {        
        });          
    }
    
    private _filterStates(value: string): Purchasing[] {
      const filterValue = value.toLowerCase();
      
      return this.itemslist.filter(state => state.PurchasingName.toLowerCase().indexOf(filterValue) >= 0 );
    }
    displayFn(Item?: Purchasing): string | undefined {
      return Item ? Item.PurchasingName : undefined;
    }
   
  
    setSelectedStore(str) {
      this.selectedstore = str;
    }
  
    EndDateChange(EndDate) {
      console.log(EndDate);
      
    }
  
    Saveform() : void {
      // this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
      // this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
      

      console.log( this.selectedPurch)
      if(this.stateCtrl.value != '')
      this.selectedPurch = this.stateCtrl.value; 
      else
      this.selectedPurch = null;
      
      this.servStockService.GetSellingsOfPurchasing(
        
        // this.selectedPurch.PurchasingID == undefined? 0:this.selectedPurch.PurchasingID
        this.selectedPurch.toString()
        // this.selectedPurch == null? 0:this.selectedPurch.PurchasingID)
        // this.fromDate.value.toISOString().substring(0, 10) , 
        // this.toDate.value.toISOString().substring(0, 10)
        ).subscribe(         
          res=> this.ItemTransferViewList = res, 
          err => console.log('MiniCode HTTP Error', err), 
          // () => console.log(this.ItemTransferViewList),
          () => this.calcGrandTotal()
          ) ;     
    }  

    calcGrandTotal() {

      

      this.TotPurchasing_Qty = this.ItemTransferViewList.reduce((prev, curr) => { return prev + curr.Purchasing_Qty }, 0);
      this.TotPurchasing_Qty = parseFloat((this.TotPurchasing_Qty).toFixed(2));

      this.TotalEGYTPrice = this.ItemTransferViewList.reduce((prev, curr) => { return prev + curr.Price }, 0);
      this.TotalEGYTPrice = parseFloat((this.TotalEGYTPrice).toFixed(2));
  
      this.TotalDollarPrice = this.ItemTransferViewList.reduce((prev, curr) => { return prev + curr.DollarPrice }, 0);
      this.TotalDollarPrice = parseFloat((this.TotalDollarPrice).toFixed(2));

      this.LTotalDollarPrice = this.ItemTransferViewList.reduce((prev, curr) => { return prev + curr.TotalDollarPrice }, 0);
      this.LTotalDollarPrice = parseFloat((this.LTotalDollarPrice).toFixed(2));

      this.LTotalEGYTPrice = this.ItemTransferViewList.reduce((prev, curr) => { return prev + curr.TotalPrice }, 0);
      this.LTotalEGYTPrice = parseFloat((this.LTotalEGYTPrice).toFixed(2));
  
    }
  
  }
  
  