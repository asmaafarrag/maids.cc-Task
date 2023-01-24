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
  selector: 'app-rep-item-card-view',
  templateUrl: './rep-item-card-view.component.html',
  styleUrls: ['./rep-item-card-view.component.css']
})
export class RepItemCardViewComponent implements OnInit {

  // storeslist : Store[] ;
  // itemslist : Item[] ;
  // selectedstore : Store;

  // selectedItem : Item;



  // ItemName="";
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Item[]>;

  // UserID : string;

  // ItemsCount: number = 0;


  // ItemTransferViewList : ItemTransferView[];

  // fromDate = new FormControl();
  // toDate = new FormControl(new Date());

  // constructor(private servStockService: ServStockService ) {
  //   this.UserID = localStorage.getItem('lUsr');
  //  }

  ngOnInit() {
    // this.getStores();
    // this.getItems();

    // this.selectedstore = new Store();
    // this.selectedstore.StoreId = 0;

    // var today = new Date();
    // today.setDate(today.getDate() - 30);
    // this.fromDate.patchValue(today);
  }

  // getStores() {
  //   this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;

  // }

  // getItems() {
  //   this.servStockService.getItemsWithQty().subscribe((data: any) => {
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

  //     this.servStockService.GetItemTransferViews(
  //       (this.selectedstore.StoreId == undefined? 0:this.selectedstore.StoreId),this.selectedItem.ItemID,
  //       this.fromDate.value.toISOString().substring(0, 10) ,
  //       this.toDate.value.toISOString().substring(0, 10)).subscribe(
  //         res=> this.ItemTransferViewList = res,
  //         err => console.log('MiniCode HTTP Error', err),
  //         () => console.log(this.ItemTransferViewList)
  //         ) ;




  //   }



}

