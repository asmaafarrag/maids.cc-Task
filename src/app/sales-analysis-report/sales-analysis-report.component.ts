import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { GetAnalyzingSellingsAndIndebtedness } from '../shared/Models/get-analyzing-sellings-and-indebtedness';

@Component({
  selector: 'app-sales-analysis-report',
  templateUrl: './sales-analysis-report.component.html',
  styleUrls: ['./sales-analysis-report.component.css']
})
export class SalesAnalysisReportComponent implements OnInit {

  customerslist : Customer[] ;
  storeslist : Store[] ;
  selectedCustomer : Customer;
  selectedstore : Store;

  SellingDetails : GetAnalyzingSellingsAndIndebtedness[];
  
  CustomerName="";  
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;

  stateCtrl1 = new FormControl();
  fromDate = new FormControl();
  toDate = new FormControl(new Date());


  ItemsCount: number = 0;
  TotalCOSTPrice: number = 0;
  TotCash:number = 0;
  TotCredit:number = 0;
  FCredit:number=0;
  NFCredit:number=0;
  TotRet:number=0;
  Disc:number=0;
  OpenTotCr:number=0;
  OpenTotCs:number=0;
  DTot:number=0;

  constructor(private servStockService: ServStockService) {}
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


   _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit() { 


    var today = new Date(); 
    today.setDate(today.getDate() - 30);    
    this.fromDate.patchValue(today);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.getStores();
    this.selectedstore = new Store();
    this.selectedstore.StoreId = 1;     
    
    // this.filteredStreets = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );

    this.customerFilter = this.custom.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.getCustomers();
    var today = new Date(); 
    today.setDate(today.getDate() - 30);    
    this.fromDate.patchValue(today);
  }

  // ngAfterViewInit() {
  //     (<any>$(this.el.nativeElement))
  //          .chosen()
  //         .on('change', (e, args) => {
  //             this.selectedValue = args.selected;
  //         });
  // }
  custom = new FormControl();
  //customerList = [{ id: 1, name: "kumar" }, { id: 2, name: "mukesh" }];
  customerFilter: Observable<any>;




  // name = 'Angular 4';
  // myDropDown: string;
  // items = ['one', 'two', 'three'];
  // origItems = ['one', 'two', 'three'];
  // @ViewChild('selectList', { static: false }) selectList: ElementRef;

  // onChangeofOptions(newGov) {
  //   console.log(newGov);
  // }

  // filterItem(event) {
  //   if (!event) {
  //     this.customerslist = this.customerslist;
  //   } // when nothing has typed*/   
  //   if (typeof event === 'string') {
  //     console.log(event);
  //     this.customerslist = this.customerslist.filter(a => a.toString().toLowerCase()
  //       .startsWith(event.toLowerCase()));
  //   }
  //   console.log(this.customerslist.length);
  //   this.selectList.nativeElement.size = this.customerslist.length + 1;
  // }


  control = new FormControl();
  // streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<Customer[]>;


  // private _filter(value: any): Customer[] {
  //   const filterValue = this._normalizeValue(value);
  //   return this.customerslist.filter(street => this._normalizeValue(street.CustomerName).includes(filterValue));
  // }

  // private _normalizeValue(value: string): string {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }




  //  _filter(value: string): any {
  //   console.log("-----");
  //   console.log(value);
  //   const filterValue = value;

  //   return this.customerslist.filter(customer => {
  //     console.log(customer);
  //     return customer.CustomerName.toLowerCase().indexOf(filterValue) === 0;
  //   });
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

  getCustomers() {
    this.servStockService.getCustomers().subscribe(res=> this.customerslist = res) ;   
  }

  getStores() {
    this.servStockService.getStores().subscribe(res=> this.storeslist = res) ;   
  }
  
  // private _filterStates(value: string): Item[] {
  //   const filterValue = value.toLowerCase();
  //   return this.itemslist.filter(state => state.ItemName.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote1.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote2.toLowerCase().indexOf(filterValue) >= 0);
  // }
  // displayFn(Item?: Item): string | undefined {
  //   return Item ? Item.ItemName : undefined;
  // }
 
  setSelectedCustomer(str) {
    this.selectedCustomer = str;
  }

  setSelectedStore(str) {
    this.selectedstore = str;
  }

  EndDateChange(EndDate) {
    console.log(EndDate);
    
  }


    Saveform() : void {
     this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
      this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
      
      if(this.stateCtrl.value != '')
      this.selectedCustomer = this.stateCtrl.value; 
      else
      this.selectedCustomer = null;
     
     // console.log(this.toDate.value.toISOString().substring(0, 10));
      this.servStockService.GetAnalyzingSellingsAndIndebtedness(
      this.fromDate.value.toISOString().substring(0, 10) , 
      this.toDate.value.toISOString().substring(0, 10))
     .subscribe(res=> this.SellingDetails = res , err => console.log('MiniCode HTTP Error', err), 
     () => this.calcGrandTotal()
       
      ) ;        
    }  
    
   
    calcGrandTotal() {

      //   إجمالي المبيعات 
      this.TotalCOSTPrice = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SellingTot }, 0);
      this.TotalCOSTPrice = parseFloat((this.TotalCOSTPrice).toFixed(2));


      
      // المبيعات النقدية
      this.TotCash = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CashSellings }, 0);
      this.TotCash = parseFloat((this.TotCash).toFixed(2));

      // المبيعات الاجلة
      this.TotCredit = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CreditSellings }, 0);
      this.TotCredit = parseFloat((this.TotCredit).toFixed(2));


     // المرتجعات النقدية
     this.FCredit = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CashSellingsRets }, 0);
     this.FCredit = parseFloat((this.FCredit).toFixed(2));

      // المرتجعات الاجلة
      this.NFCredit = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CreditSellingsRets }, 0);
      this.NFCredit = parseFloat((this.NFCredit).toFixed(2));
  
      //التحصيلات
      this.TotRet = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CollectedAmount }, 0);
      this.TotRet = parseFloat((this.TotRet).toFixed(0));

      //خصم خاص
      this.Disc = this.SellingDetails.reduce((prev, curr) => { return prev + curr.SpecialDisc }, 0);
      this.Disc = parseFloat((this.Disc).toFixed(0));
      
      //رصيد افتتاحي مدين 
      this.OpenTotCr = this.SellingDetails.reduce((prev, curr) => { return prev + curr.DebitOpenVal }, 0);
      this.OpenTotCr = parseFloat((this.OpenTotCr).toFixed(0));

      //رصيد افتتاحي دائن 
      this.OpenTotCs = this.SellingDetails.reduce((prev, curr) => { return prev + curr.CreditOpenVal }, 0);
      this.OpenTotCs = parseFloat((this.OpenTotCs).toFixed(0));

      //اجمالي المديونية 
      this.DTot = this.SellingDetails.reduce((prev, curr) => { return prev + curr.DebitnessTot }, 0);
      this.DTot = parseFloat((this.DTot).toFixed(0));


    }

}
