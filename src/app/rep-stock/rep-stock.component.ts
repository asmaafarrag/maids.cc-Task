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

@Component({
  selector: 'app-rep-stock',
  templateUrl: './rep-stock.component.html',
  styleUrls: ['./rep-stock.component.css']
})
export class RepStockComponent implements OnInit {

  // storeslist: Store[];
  // itemslist: Item[];
  // selectedstore: Store;
  // storeItemsStock: Stock[];
  // selectedItem: Item;
  // hideZeros: boolean = false;


  // ItemName = "";
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Item[]>;

  // ChkhideZeros = new FormControl();
  // UserID: string;
  // UserType: string;

  // ItemsCount: number = 0;
  // TotalCOSTPrice: number = 0;
  // TotalDollarPrice: number = 0;
  // TotalStockPrice: number = 0;

  // ItemCardViewList: ItemCardView[];

  // tranLabels: any;

  // constructor(private servStockService: ServStockService) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  // }

  ngOnInit() {

    // this.tranLabels = {
    //   lng: 'EN',
    //   code: 'Code',
    //   item: 'item',
    //   qty: 'Quantity',
    //   unit: 'Unit',
    //   costPrice: 'Cost Price',
    //   sillingPrice: 'Silling Price',
    //   totalsillingPrice: 'Total',
    //   store: 'Store',
    //   sillingPriceCurr: 'Silling Price $',
    //   totalSillingPriceCurr: 'Total $',
    //   total: 'Total'
    // };
    // this.changLang();
    // this.getStores();
    // this.getItems();

    // this.selectedstore = new Store();
    // this.selectedstore.StoreId = 0;

  }

  // changLang() {
  //   if (this.tranLabels.lng == 'EN') {
  //     this.tranLabels.lng = 'AR'
  //     this.tranLabels.code = 'الكود',
  //       this.tranLabels.item = 'الصنف',
  //       this.tranLabels.qty = 'الكمية',
  //       this.tranLabels.unit = 'الوحدة',
  //       this.tranLabels.costPrice = 'القيمة',
  //       this.tranLabels.sillingPrice = 'سعر البيع',
  //       this.tranLabels.totalsillingPrice = 'الاجمالى',
  //       this.tranLabels.store = 'المخزن',
  //       this.tranLabels.sillingPriceCurr = 'السعر بالعملة $',
  //       this.tranLabels.totalSillingPriceCurr = 'الاجمالى بالعملة',
  //       this.tranLabels.total = 'الاجمالى'
  //   }
  //   else {
  //     this.tranLabels.lng = 'EN'
  //     this.tranLabels.code = 'Code',
  //       this.tranLabels.item = 'item',
  //       this.tranLabels.qty = 'Quantity',
  //       this.tranLabels.unit = 'Unit',
  //       this.tranLabels.costPrice = 'Cost Price',
  //       this.tranLabels.sillingPrice = 'Silling Price',
  //       this.tranLabels.totalsillingPrice = 'Total',
  //       this.tranLabels.store = 'Store',
  //       this.tranLabels.sillingPriceCurr = 'Silling Price $',
  //       this.tranLabels.totalSillingPriceCurr = 'Total $',
  //       this.tranLabels.total = 'Total'
  //   }
  // }

  // getStores() {
  //   this.servStockService.getStores().subscribe(res => this.storeslist = res);

  // }

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

  // Saveform(): void {
  //   if (this.stateCtrl.value != '')
  //     this.selectedItem = this.stateCtrl.value;
  //   else
  //     this.selectedItem = null;




  //   if (this.selectedItem == null)
  //     this.servStockService.getStockItems(
  //       (this.selectedstore.StoreId == undefined ? 0 : this.selectedstore.StoreId), this.hideZeros).subscribe(
  //         res => this.storeItemsStock = res,
  //         err => console.log('MiniCode HTTP Error', err),
  //         () => this.calcGrandTotal()
  //       );
  //   else
  //     this.servStockService.getStockItems_By_ItemId((this.selectedstore.StoreId == undefined ? 0 : this.selectedstore.StoreId), this.selectedItem.ItemID, this.hideZeros).subscribe(res => this.storeItemsStock = res, err => console.log('MiniCode HTTP Error', err), () => this.calcGrandTotal()
  //     );
  // }

  // calcGrandTotal() {
  //   console.log(this.storeItemsStock);
  //   this.TotalCOSTPrice = this.storeItemsStock.reduce((prev, curr) => { return prev + curr.COSTPrice }, 0);
  //   this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));

  //   this.ItemsCount = this.storeItemsStock.reduce((prev, curr) => { return prev + curr.Qty }, 0);
  //   this.ItemsCount = parseFloat((this.ItemsCount).toFixed(2));

  //   this.TotalDollarPrice = this.storeItemsStock.reduce((prev, curr) => { return prev + (curr.DollarPrice * curr.Qty) }, 0);
  //   this.TotalDollarPrice = parseFloat((this.TotalDollarPrice).toFixed(2));

  //   this.TotalStockPrice = this.storeItemsStock.reduce((prev, curr) => { return prev + (curr.Qty * curr.ItemSalePrice) }, 0);
  //   this.TotalStockPrice = parseFloat((this.TotalStockPrice).toFixed(2));
  // }

}
