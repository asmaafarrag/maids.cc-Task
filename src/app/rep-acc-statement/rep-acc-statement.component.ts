import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Statement } from '../shared/Models/statement.model';
import { Accounts } from "../shared/Models/accounts.model";

import { AccIncListQService  } from '../shared/Services/acc-inc-list-q.service'


@Component({
  selector: 'app-rep-acc-statement',
  templateUrl: './rep-acc-statement.component.html',
  styleUrls: ['./rep-acc-statement.component.css']
})
export class RepAccStatementComponent implements OnInit {

//   // selectedAccount : Accounts;
//   // Accountslist : Accounts[];
//   // Statmentlist : Statement[];
//   // isValidFormSubmitted : boolean;
//   // UserID: string;
//   // UserType: string;
//   // EmpID: string;
//   // length:number;
//   // stateCtrl = new FormControl();
//   // filteredStates: Observable<Accounts[]>;
  

//   // fromDate = new FormControl();
//   // toDate = new FormControl(new Date());


//   selectedAccount : Accounts;
//   Accountslist : Accounts[];
//   Statmentlist : Statement[];
//   isValidFormSubmitted : boolean;
//   UserID: string;
//   UserType: string;
//   EmpID: string;
//   length:number;
//   stateCtrl = new FormControl();
//   filteredStates: Observable<Accounts[]>;
//   SellingDetails : Statement[];
//   ItemName="";  
//   DiscTot: number = 0;
//   TotalCOSTPrice: number = 0;
  

//   fromDate = new FormControl();
//   toDate = new FormControl(new Date());


//   userForm = new FormGroup({    
//     Acnt: new FormControl('', Validators.required),
//  });
 
//   constructor(private servAccIncListQService: AccIncListQService ) { 
//     this.UserID = localStorage.getItem('lUsr');
//     this.UserType = localStorage.getItem('UserType');
//     this.EmpID = localStorage.getItem('EmpID');
//   }

//   ngOnInit() {
//     this.getAccounts();
//     // this.selectedAccount = null;
//     //this.selectedstore.StoreId = null;   
        
//     var today = new Date(); 
//     today.setDate(today.getDate() );    
//     this.fromDate.patchValue(today);
    
//     // var today = new Date(); 
//     // //today.setDate(today.getDate() - 30);    
//     // this.fromDate.patchValue(today);
//   }

//   // getAccounts(){

    
//   //   // if (this.UserType.toUpperCase() == 'ADMIN') {
//   //     // this.servAccIncListQService.getAllAccounts().subscribe(res=> this.Accountslist = res) ;   
//   //   // }
//   //   // else {
//   //     this.servAccIncListQService.getAccounts(this.UserID).subscribe(res => this.Accountslist = res)
//   //   // }

//   // }

//   setSelectedAccount(str) {
//     this.selectedAccount = str;
//   }

//   EndDateChange(EndDate) {
//     console.log(EndDate);
    
//   }
 

//   getAccounts() {
//    this.UserID = localStorage.getItem('lUsr');
//    console.log(this.UserID , "UserID")
//     this.servAccIncListQService.getAccounts(this.UserID).subscribe((data: any) => {
//       this.Accountslist = data;
//       console.log( this.Accountslist , " this.Accountslist")
//       this.filteredStates = this.stateCtrl.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => typeof value === 'string' ? value : value.ItemName),
//         map(state => state ? this._filterStates(state) : this.Accountslist.slice())
//       ); 
//       let length =  this.Accountslist.length;
//       console.log(length , "length")
//     },
//       (err: HttpErrorResponse) => {        
//       });          
//   }



//   // getaccount(){
//   //   if (this.UserType.toUpperCase() == 'ADMIN') {
//   //     this.servAccIncListQService.getAllAccounts().subscribe((data: any) => {
//   //       this.Accountslist = data;
       
//   //       this.filteredStates = this.stateCtrl.valueChanges
//   //       .pipe(
//   //         startWith(''),
//   //         map(value => typeof value === 'string' ? value : value.ItemName),
//   //         map(state => state ? this._filterStates(state) : this.Accountslist.slice())
//   //       ); 
//   //       this.length =  this.Accountslist.length;
//   //       console.log(length , "length")
//   //     },
//   //       (err: HttpErrorResponse) => {        
//   //       }); 
//   //     // .subscribe(res => this.Supplierslist = res);
//   //   }
//   //   else {
//   //     this.servAccIncListQService.getAccounts(this.UserID).subscribe((data: any) => {
//   //       this.Accountslist = data;
     
//   //       this.filteredStates = this.stateCtrl.valueChanges
//   //       .pipe(
//   //         startWith(''),
//   //         map(value => typeof value === 'string' ? value : value.ItemName),
//   //         map(state => state ? this._filterStates(state) : this.Accountslist.slice())
//   //       ); 
//   //       this.length =  this.Accountslist.length;
//   //       console.log(length , "length")
//   //     },
//   //       (err: HttpErrorResponse) => {        
//   //       }); 
//   //     // .subscribe(res => this.Supplierslist = res);
//   //   }
//   // }

//   private _filterStates(value: string): Accounts[] {
//     const filterValue = value.toLowerCase();
//     return this.Accountslist.filter(state => state.AccountName.toLowerCase().indexOf(filterValue) >= 0 );
//   }
//   displayFn(Item?: Accounts): string | undefined {
//     return Item ? Item.AccountName : undefined;
//   }
 


 
//   Saveform() : void { 

//     this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
//     this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );


//     if(this.stateCtrl.value != '')
//     this.selectedAccount = this.stateCtrl.value; 
//     else
//     this.selectedAccount = null;

//     console.log(this.selectedAccount);
   

//     // this.isValidFormSubmitted = false;
//     // if(this.stateCtrl.value != '')
//     //  this.selectedAccount = this.stateCtrl.value; 
//     //  else
//     //  this.selectedAccount = null;

//     console.log(this.selectedAccount.ACCOUNTID);

//      //if (this.userForm.invalid) {
//      //   return;
//      //}
//     //  this.isValidFormSubmitted = true; 

//     //  this.servAccIncListQService.getStatement(
//     //   this.selectedAccount.ACCOUNTID,
//     // //  this.selectedAccount == undefined || this.selectedAccount == null? '' :this.selectedAccount.ACCOUNTID,
//     //  this.fromDate.value.toISOString().substring(0, 10) , 
//     //  this.toDate.value.toISOString().substring(0, 10))
//     //  .subscribe(res=> this.Statmentlist = res , err => console.log('MiniCode HTTP Error', err)
//     //   //  .subscribe(res=> this.SellingDetails = res , err => console.log('MiniCode HTTP Error', err), 
//     // ) ;  


//      this.isValidFormSubmitted = true; 
//      this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
//      this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
//     this.servAccIncListQService.getStatement(this.selectedAccount.ACCOUNTID,this.fromDate.value.toISOString().substring(0, 10),this.toDate.value.toISOString().substring(0, 10)).subscribe(res=> this.Statmentlist = res) ;         
  
//   }

//   openSite(siteUrl) {
//     window.open( siteUrl, '_blank');
//  }




// //  storeslist : Store[] ;
// //  customerslist : Customer[] ;
// //  sellingTypelist:Selling[]

// //  selectedstore : Store;
// //  selectedsellingType:string
// //  selectedCustomer : Customer;

// //  SellingDetails : FnGetSalesPerSellingTypeAndDateResult[];
 
// //  ItemName="";  
// //  stateCtrl = new FormControl();
// //  filteredStates: Observable<FnGetSalesPerSellingTypeAndDateResult[]>;






// //  getStores() {
// //    this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;   
// //  }

// //  getSellingType() {
// //    this.sellingServ.getSelling().subscribe(res=> this.sellingTypelist = res) ;   
// //  }


// //  getCustomers() {
// //    this.servStockService.getCustomers().subscribe(res=> this.customerslist = res) ;   
// //  }

// //  setSelectedStore(str) {
// //    this.selectedstore = str;
// //  }

// //  setSelectedCustomer(str) {
// //    this.selectedCustomer = str;
// //  }

// //  setSelectedsellingType(str){
// //    this.selectedsellingType = str;
// //    console.log(this.selectedsellingType , "selling")
// //  }

// //  EndDateChange(EndDate) {
// //    console.log(EndDate);
   
// //  }


//   //  Saveform() : void {
//   //   //  this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
//   //   //  this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
     
//   //   // // console.log(this.stateCtrl.value)
//   //   //  // if(this.stateCtrl.value != '')
//   //   //  //   this.selectedCustomer = this.stateCtrl.value; 
//   //   //  // else
//   //   //  //   this.selectedCustomer = null;

    
//   //   //  console.log(this.selectedstore);
//   //   //  console.log(this.selectedsellingType);
//   //   //  console.log(this.selectedCustomer);
//   //    this.servStockService.GetSalesPerSellingTypeAndDate(
       
//   //      (this.selectedstore == undefined || this.selectedstore == null? null:this.selectedstore.StoreId),
//   //      (this.selectedsellingType == undefined  || this.selectedsellingType == null? '':this.selectedsellingType),
//   //      (this.selectedCustomer == undefined  || this.selectedCustomer == null ? null:this.selectedCustomer.CustomerID),
//   //     this.fromDate.value.toISOString().substring(0, 10) , 
//   //     this.toDate.value.toISOString().substring(0, 10))
//   //     .subscribe(res=> this.SellingDetails = res , err => console.log('MiniCode HTTP Error', err), 
//   //     () => this.calcGrandTotal()
      
//   //      ) ;  
//   //      // console.log(this.SellingDetails)      
//   //  }  

//   //  calcGrandTotal() {
//   //    this.TotalCOSTPrice = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingTot }, 0);
//   //    this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));
 
//   //    this.DiscTot = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingDisc }, 0);
//   //    this.DiscTot = parseFloat((this.DiscTot).toFixed(4));
//   //  }





selectedAccount : Accounts;
  Accountslist : Accounts[];
  Statmentlist : Statement[];
  isValidFormSubmitted : boolean;
  UserID : string;

  stateCtrl = new FormControl();
  filteredStates: Observable<Accounts[]>;
  

  fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());

  userForm = new FormGroup({    
    Acnt: new FormControl('', Validators.required),
 });
 
  constructor(private servAccIncListQService: AccIncListQService) { }

  ngOnInit() {
    this.getAccounts();

    // var today = new Date(); 
    // //today.setDate(today.getDate() - 30);    
    // this.fromDate.patchValue(today);
  }

  getAccounts() {
   this.UserID = localStorage.getItem('lUsr');
    this.servAccIncListQService.getAccounts(this.UserID).subscribe((data: any) => {
      this.Accountslist = data;
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.ItemName),
        map(state => state ? this._filterStates(state) : this.Accountslist.slice())
      ); 
    },
      (err: HttpErrorResponse) => {        
      });          
  }

  private _filterStates(value: string): Accounts[] {
    const filterValue = value.toLowerCase();
    return this.Accountslist.filter(state => state.AccountName.toLowerCase().indexOf(filterValue) >= 0 );
  }
  displayFn(Item?: Accounts): string | undefined {
    return Item ? Item.AccountName : undefined;
  }
 

  setSelectedAccount(str) {
    this.selectedAccount = str;
  }

 
  Saveform() : void { 
    this.isValidFormSubmitted = false;
    if(this.stateCtrl.value != '')
     this.selectedAccount = this.stateCtrl.value; 
     else
     this.selectedAccount = null;

     console.log(this.selectedAccount.ACCOUNTID);

     //if (this.userForm.invalid) {
     //   return;
     //}

     console.log(this.selectedAccount.ACCOUNTID);

     this.isValidFormSubmitted = true; 
     this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
     this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
    this.servAccIncListQService.getStatement(this.selectedAccount.ACCOUNTID,this.fromDate.value.toISOString().substring(0, 10),this.toDate.value.toISOString().substring(0, 10)).subscribe(res=> this.Statmentlist = res) ;         
  }

  openSite(siteUrl) {
    window.open( siteUrl, '_blank');
 }



}
