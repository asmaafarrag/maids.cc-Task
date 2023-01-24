import { BranchUser } from './../../shared/Models/branch-user';
import { BranchUserService } from './../../shared/Services/branch-user.service';
import { PriceListsService } from './../../shared/Services/price-lists.service';
import { PriceLists } from './../../shared/Models/price-lists';
import { ServStockService } from './../../shared/Services/serv-stock.service';
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

// import { Stock } from '../shared/Models/Stock';
// import { Store } from "../shared/Models/Store";
import { Item } from './../../shared/Models/item';

import { stringify } from '@angular/compiler/src/util';
// import { ItemTransferView } from '../shared/Models/item-transfer-view';

@Component({
  selector: 'app-price-list-reports',
  templateUrl: './price-list-reports.component.html',
  styleUrls: ['./price-list-reports.component.css']
})
export class PriceListReportsComponent implements OnInit {

  // storeslist : Store[] ;
  itemslist : Item[] ;
  // selectedstore : Store;

  selectedItem : Item;
  selectedUser:BranchUser;


  ItemName="";
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;

  UserID : string;

  ItemsCount: number = 0;

  PriceList : PriceLists[] ;
  PriceListCount:number=0;
  userList:BranchUser[];
  url = 'http://pergola-api.minicodeco.com/api/PriceLists/print-pricelist/'


  // ItemTransferViewList : ItemTransferView[];

  fromDate = new FormControl();
  toDate = new FormControl(new Date());

  constructor(public servStockService: ServStockService , public pricelistServ:PriceListsService , public branchUserServ: BranchUserService ) {
    this.UserID = localStorage.getItem('lUsr');
   }

  ngOnInit() {
    // this.getStores();
    // this.getItems();

    // this.selectedstore = new Store();
    // this.selectedstore.StoreId = 0;
    this.branchUserServ.getuser().subscribe(res=> this.userList = res) ;

    var today = new Date();
    today.setDate(today.getDate() - 30);
    this.fromDate.patchValue(today);



  }


  getPriceList(){
    // console.log(this.fromDate.value  ,this.toDate.value )
     this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
      this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
    console.log(this.selectedUser  ,this.fromDate.value.toISOString().substring(0, 10) ,  this.toDate.value.toISOString().substring(0, 10))

    this.pricelistServ.GetUserPriceListsContractsReport(this.selectedUser, this.fromDate.value.toISOString().substring(0, 10) ,  this.toDate.value.toISOString().substring(0, 10)).subscribe(res=> {
      // console.log(res);
      this.PriceListCount = res.priceLists_Count;
      this.PriceList = res.priceLists;
    });


    // console.log(this.PriceList)

  }

  // getStores() {
  //   this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;

  // }

  getItems() {
    this.servStockService.getItemsWithQty().subscribe((data: any) => {
      this.itemslist = data;
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.ItemName),
        map(state => state ? this._filterStates(state) : this.itemslist.slice())
      );
    },
      (err: HttpErrorResponse) => {
      });
  }

  private _filterStates(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.itemslist.filter(state => state.item_Name.toLowerCase().indexOf(filterValue) >= 0 );
  }
  displayFn(Item?: Item): string | undefined {
    return Item ? Item.item_Name : undefined;
  }


  setSelectedStore(str) {
    this.selectedUser = str;
    console.log( this.selectedUser)

    // this.getPriceList();
  }

  EndDateChange(EndDate) {
    console.log(EndDate);

  }

  printPdf(id:number){
    window.open(this.url + id , '_blank');
  }


    Saveform() : void {
      // this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
      // this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );

      // if(this.stateCtrl.value != '')
      // this.selectedItem = this.stateCtrl.value;
      // else
      // this.selectedItem = null;

      // this.servStockService.GetItemTransferViews(
      //   (this.selectedstore.StoreId == undefined? 0:this.selectedstore.StoreId),
      //   this.selectedItem.ItemID,
      //   this.fromDate.value.toISOString().substring(0, 10) ,
      //   this.toDate.value.toISOString().substring(0, 10)).subscribe(
      //     res=> this.ItemTransferViewList = res,
      //     err => console.log('MiniCode HTTP Error', err),
      //     () => console.log(this.ItemTransferViewList)
      //     ) ;




    }
}
