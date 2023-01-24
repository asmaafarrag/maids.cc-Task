import { BranchUser } from './../../shared/Models/branch-user';
import { PriceListsService } from './../../shared/Services/price-lists.service';
import { BranchUserService } from 'src/app/shared/Services/branch-user.service';
import { Customer } from './../../shared/Models/customer.model';
import { User } from './../../shared/Models/user.model';
import { ServStockService } from './../../shared/Services/serv-stock.service';
import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Contracts } from './../../shared/Models/contracts';
import { ContractsService } from './../../shared/Services/contracts.service';
import { PriceLists } from 'src/app/shared/Models/price-lists';
// import { Stock } from '../shared/Models/Stock';
// import { Store } from "../shared/Models/Store";
import { Item } from './../../shared/Models/item';

import { stringify } from '@angular/compiler/src/util';
// import { ItemTransferView } from '../shared/Models/item-transfer-view';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {
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
 PriceListCount:number=0;
 PriceList : Contracts[] ;
 userList:BranchUser[];

 url = 'http://pergola-api.minicodeco.com/api/Contracts/print-contract/'

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

   this.pricelistServ.GetUserContractsReport(this.selectedUser, this.fromDate.value.toISOString().substring(0, 10) ,  this.toDate.value.toISOString().substring(0, 10)).subscribe(res=>

    {
      this.PriceList = res.contracts;
      this.PriceListCount = res.contracts_Count;
    }
     // console.log(res),

     );

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

 printPdf(id:number){
  window.open(this.url + id , '_blank');
  }

}
