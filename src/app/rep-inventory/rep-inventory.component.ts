import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Stock } from '../shared/Models/Stock';
import { Store } from "../shared/Models/Store";
import { Item } from '../shared/Models/item';
import { ItemCardView } from '../shared/Models/item-card-view';

import { ServStockService } from '../shared/Services/serv-stock.service';
import { stringify } from '@angular/compiler/src/util';
import { GetStockFromAllStoresView } from '../shared/Models/get-stock-from-all-stores-view';

@Component({
  selector: 'app-rep-inventory',
  templateUrl: './rep-inventory.component.html',
  styleUrls: ['./rep-inventory.component.css']
})
export class RepInventoryComponent implements OnInit {

  // itemslist:Item[]
  // selectedItem : Item;

  SellingDetails : GetStockFromAllStoresView[];
  
  ItemName="";  
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Item[]>;
  // storeItemsStock: Stock[];
  
  // fromDate = new FormControl();
  // toDate = new FormControl(new Date());

  // ItemsCount: number = 0;
  // TotalCOSTPrice: number = 0;
  
  constructor(private servStockService: ServStockService ) { 
  }

  ngOnInit() {    
    
   // this.getItems();
    // var today = new Date(); 
    // today.setDate(today.getDate() - 30);    
    // this.fromDate.patchValue(today);
  }

  // getItems() {
  //   this.servStockService.getItemsWithQty().subscribe((data: any) => {
  //     this.itemslist = data;
  //     this.filteredStates = this.stateCtrl.valueChanges
  //       .pipe(
  //         startWith(''),
  //         map(value => typeof value === 'string' ? value : value.ItemName),
  //         map(state => state ? this._filterStates(state) : this.itemslist.slice())
  //       );
  //   },
  //     (err: HttpErrorResponse) => {
  //     });
  // }
  
  // private _filterStates(value: string): Item[] {
  //   const filterValue = value.toLowerCase();
  //   return this.itemslist.filter(state => state.ItemName.toLowerCase().indexOf(filterValue) >= 0);
  // }
  // displayFn(Item?: Item): string | undefined {
  //   return Item ? Item.ItemName : undefined;
  // }
 

  EndDateChange(EndDate) {
    console.log(EndDate);
    
  }

  Saveform() : void {

    // if(this.stateCtrl.value != '')
    //   this.selectedItem = this.stateCtrl.value; 
    // else
    //   this.selectedItem = null;

    // console.log(this.selectedItem , 'fffffffaddd')
    // console.log(this.toDate.value.toISOString().substring(0, 10));
     this.servStockService.GetStockFromAllStoresViews().subscribe(res=> this.SellingDetails = res) ;    
     
  }  

    // calcGrandTotal() {
    //   this.TotalCOSTPrice = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingTot }, 0);
    //   this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));
  
    //   this.ItemsCount = this.SellingDetails.reduce((prev, curr) => { return prev + curr.Qty }, 0);
    //   this.ItemsCount = parseFloat((this.ItemsCount).toFixed(0));
    // }



}
