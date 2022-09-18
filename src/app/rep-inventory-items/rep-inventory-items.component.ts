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
import { Store } from "../shared/Models/Store";
import { Item } from '../shared/Models/item';
import { Customer } from '../shared/Models/customer.model';
import { ServStockService } from '../shared/Services/serv-stock.service'
import { Selling } from '../shared/Models/selling';
import { SellingService } from '../shared/Services/selling.service.service';
import { FnGetSalesPerSellingTypeAndDateResult } from '../shared/Models/fn-get-sales-per-selling-type-and-date-result';

@Component({
  selector: 'app-rep-inventory-items',
  templateUrl: './rep-inventory-items.component.html',
  styleUrls: ['./rep-inventory-items.component.css']
})
export class RepInventoryItemsComponent implements OnInit {

  storeslist : Store[] ;
  customerslist : Customer[] ;
  sellingTypelist:Selling[]

  selectedstore : Store;
  selectedsellingType:string
  selectedCustomer : Customer;

  SellingDetails : FnGetSalesPerSellingTypeAndDateResult[];
  
  ItemName="";  
  stateCtrl = new FormControl();
  filteredStates: Observable<FnGetSalesPerSellingTypeAndDateResult[]>;
  fromDate = new FormControl();
  toDate = new FormControl(new Date());


  DiscTot: number = 0;
  TotalCOSTPrice: number = 0;
  
  constructor(private servStockService: ServStockService , private sellingServ:SellingService) { 
  }

  ngOnInit() {    
    this.getStores();
    this.getCustomers();
    this.getSellingType();

    this.selectedstore = null;
    this.selectedCustomer = null;
    this.selectedsellingType = '';
    //this.selectedstore.StoreId = null;   
        
    var today = new Date(); 
    today.setDate(today.getDate() - 30);    
    this.fromDate.patchValue(today);
  }

  getStores() {
    this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;   
  }

  getSellingType() {
    this.sellingServ.getSelling().subscribe(res=> this.sellingTypelist = res) ;   
  }


  getCustomers() {
    this.servStockService.getCustomers().subscribe(res=> this.customerslist = res) ;   
  }

  setSelectedStore(str) {
    this.selectedstore = str;
  }

  setSelectedCustomer(str) {
    this.selectedCustomer = str;
  }

  setSelectedsellingType(str){
    this.selectedsellingType = str;
    console.log(this.selectedsellingType , "selling")
  }

  EndDateChange(EndDate) {
    console.log(EndDate);
    
  }


    Saveform() : void {
      this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
      this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
      
     // console.log(this.stateCtrl.value)
      // if(this.stateCtrl.value != '')
      //   this.selectedCustomer = this.stateCtrl.value; 
      // else
      //   this.selectedCustomer = null;

     
      console.log(this.selectedstore);
      console.log(this.selectedsellingType);
      console.log(this.selectedCustomer);
      this.servStockService.GetSalesPerSellingTypeAndDate(
        
        (this.selectedstore == undefined || this.selectedstore == null? null:this.selectedstore.StoreId),
        (this.selectedsellingType == undefined  || this.selectedsellingType == null? '':this.selectedsellingType),
        (this.selectedCustomer == undefined  || this.selectedCustomer == null ? null:this.selectedCustomer.CustomerID),
       this.fromDate.value.toISOString().substring(0, 10) , 
       this.toDate.value.toISOString().substring(0, 10))
       .subscribe(res=> this.SellingDetails = res , err => console.log('MiniCode HTTP Error', err), 
       () => this.calcGrandTotal()
       
        ) ;  
        // console.log(this.SellingDetails)      
    }  

    calcGrandTotal() {
      this.TotalCOSTPrice = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingTot }, 0);
      this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));
  
      this.DiscTot = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingDisc }, 0);
      this.DiscTot = parseFloat((this.DiscTot).toFixed(4));
    }


}
