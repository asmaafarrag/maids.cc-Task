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

import { SellingDet } from '../shared/Models/selling-det';
import { Store } from "../shared/Models/Store";
import { Item } from '../shared/Models/item';
import { Customer } from '../shared/Models/customer.model';

import { ServStockService } from '../shared/Services/serv-stock.service'



@Component({
  selector: 'app-rep-selling-det',
  templateUrl: './rep-selling-det.component.html',
  styleUrls: ['./rep-selling-det.component.css']
})
export class RepSellingDetComponent implements OnInit {

  // storeslist : Store[] ;
  // itemslist : Item[] ;
  // customerslist : Customer[] ;
  // selectedstore : Store;

  // selectedItem : Item;
  // selectedCustomer : Customer;

  // SellingDetails : SellingDet[];

  // ItemName="";
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Item[]>;


  // fromDate = new FormControl();
  // toDate = new FormControl(new Date());

  // ItemsCount: number = 0;
  // TotalCOSTPrice: number = 0;

  // constructor(private servStockService: ServStockService) {
  // }

  ngOnInit() {
    // this.getStores();
    // this.getItems();
    // this.getCustomers();

    // this.selectedstore = new Store();
    // this.selectedstore.StoreId = 1;

    // var today = new Date();
    // today.setDate(today.getDate() - 30);
    // this.fromDate.patchValue(today);
  }

  // getStores() {
  //   this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;
  // }

  // getItems() {
  //   this.servStockService.getItems().subscribe((data: any) => {
  //     this.itemslist = data;
  //     this.filteredStates = this.stateCtrl.valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value => typeof value === 'string' ? value : value.ItemName),
  //       map(state => state ? this._filterStates(state) : this.itemslist.slice())
  //     );
  //   },
  //     (err: HttpErrorResponse) => {
  //     });
  // }

  // getCustomers() {
  //   this.servStockService.getCustomers().subscribe(res=> this.customerslist = res) ;
  // }

  // private _filterStates(value: string): Item[] {
  //   const filterValue = value.toLowerCase();
  //   return this.itemslist.filter(state => state.ItemName.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote1.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote2.toLowerCase().indexOf(filterValue) >= 0);
  // }
  // displayFn(Item?: Item): string | undefined {
  //   return Item ? Item.ItemName : undefined;
  // }


  // setSelectedStore(str) {
  //   this.selectedstore = str;
  // }

  // setSelectedCustomer(str) {
  //   this.selectedCustomer = str;
  // }

  // EndDateChange(EndDate) {
  //   console.log(EndDate);

  // }

  //   Saveform() : void {
  //     this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
  //     this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );

  //     if(this.stateCtrl.value != '')
  //     this.selectedItem = this.stateCtrl.value;
  //     else
  //     this.selectedItem = null;

  //     //console.log(this.toDate.value.toISOString().substring(0, 10));
  //     this.servStockService.getSellingDet(
  //       (this.selectedstore.StoreId == undefined? 0:this.selectedstore.StoreId),
  //       (this.selectedItem == null? 0:this.selectedItem.Item_ID),
  //       (this.selectedCustomer == null? 0:this.selectedCustomer.Customer_ID),
  //       this.fromDate.value.toISOString().substring(0, 10) ,
  //       this.toDate.value.toISOString().substring(0, 10)).subscribe(res=> this.SellingDetails = res , err => console.log('MiniCode HTTP Error', err),
  //       () => this.calcGrandTotal()
  //       ) ;
  //   }

  //   calcGrandTotal() {
  //     this.TotalCOSTPrice = this.SellingDetails.reduce((prev, curr) => { return prev + curr.Tot }, 0);
  //     this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));

  //     this.ItemsCount = this.SellingDetails.reduce((prev, curr) => { return prev + curr.Qty }, 0);
  //     this.ItemsCount = parseFloat((this.ItemsCount).toFixed(0));


  //   }


}
