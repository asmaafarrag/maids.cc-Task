import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { PurchasingDet } from 'src/app/shared/Models/purchasing';
import { Stock } from 'src/app/shared/Models/Stock';
import { PurchasingService } from 'src/app/shared/Services/purchasing.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-purchasing-for-selling-items',
  templateUrl: './purchasing-for-selling-items.component.html',
  styleUrls: ['./purchasing-for-selling-items.component.css']
})
export class PurchasingForSellingItemsComponent implements OnInit {

  @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  formData: PurchasingDet;
  itemslist: Item[];
  selectedItem: Item;
  
  ItemName = "";
  StoreId: number;
  ExchangeRateVal: number;
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;
  TotDollar:number =0;
  isValid: boolean = true;

  storeItemsStock: Stock[];

  UserID : string;
  UserType: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PurchasingForSellingItemsComponent>, private servStockService: ServStockService
    , private PurchasingServ: PurchasingService) { 
      this.UserID = localStorage.getItem('lUsr');
      this.UserType = localStorage.getItem('UserType');
    }

  ngOnInit() {
    this.StoreId = this.data.StoreId;
    this.ExchangeRateVal = this.data.ExchangeRate;
    this.getItems();
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    if (this.data.orderItemIndex == null) {

      this.formData = {
        SerNo: null,
        PurchasingID: this.data.SellingId,
        ItemId: null,
        ItemName: '',
        Qty: null,
        Price: null,
        DollarPriceTot:0,
        DISC: 0,
        UnitID: null,
        UnitName: '',
        Tot: 0,
        ItmDiscVal: null,
        ActPrice: 0,
        DollarPrice: null,
        SellingPrice:0
      }
    }
    else {
      this.formData = Object.assign({}, this.PurchasingServ.formData.purchasingDets[this.data.orderItemIndex]);

    }

  }

  getItems() {
    this.servStockService.getItems().subscribe((data: any) => {
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
    return this.itemslist.filter(state => state.ItemName.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote1.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote2.toLowerCase().indexOf(filterValue) >= 0);
  }
  displayFn(Item?: Item): string | undefined {
    return Item ? Item.ItemName : undefined;
  }


  
 


  UpdateQty() {
    if (this.stateCtrl.value != '') {
      this.selectedItem = this.stateCtrl.value;
      this.formData.ItemId = this.selectedItem.ItemID;
      this.formData.ItemName = this.selectedItem.ItemName;
      //this.formData.Price = this.selectedItem.ItemSalePrice;
      this.formData.UnitID = this.selectedItem.UnitId
      this.formData.UnitName = this.selectedItem.UnitName;
      this.formData.SellingPrice = this.selectedItem.ItemSalePrice;

      this.formData.DollarPrice = this.selectedItem.DollarPrice;

     console.log(this.selectedItem.DollarPrice , 'ddd')
     console.log(this.selectedItem.ItemSalePrice , 'ggg')

      //this.formData.ItemNO = this.selectedItem.ItemNO.toString();
      //this.formData.CompanyName = this.selectedItem.CompanyName;

    }
    this.UpdateTotal();
    this.CalcLocalVal();
  }

  UpdateTotal() {    
    if (this.formData.Price === undefined || this.formData.Price == null || this.formData.Price.toString().length <= 0)
      this.formData.Price = 0;

    this.formData.Tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(2));    
    // this.TotDollar = parseFloat((this.formData.DollarPrice * this.formData.Qty).toFixed(2));  // بالدولار
    this.formData.DollarPriceTot = parseFloat((this.formData.DollarPrice * this.formData.Qty).toFixed(2))

  }

  CalcLocalVal() {    
    // if (this.formData.DollarPrice === undefined || this.formData.DollarPrice == null || this.formData.DollarPrice.toString().length <= 0)
    //   this.formData.DollarPrice = 0;

    this.formData.Price = parseFloat((this.ExchangeRateVal * this.formData.DollarPrice).toFixed(2));
    this.UpdateTotal();
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.PurchasingServ.formData.purchasingDets.push(form.value);
      }
      else {
        this.PurchasingServ.formData.purchasingDets[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: PurchasingDet) {

    this.isValid = true;
    if (formData.ItemId == 0 || formData.ItemId == null)
      this.isValid = false;
    else if (formData.Qty == 0 || formData.Qty == null)
      this.isValid = false;
    else if (formData.Price == null)
      this.isValid = false;
      else if (formData.SellingPrice == 0 || formData.SellingPrice == null)
      this.isValid = false;
    //else if (formData.Qty > formData.AvailableQty)
    //  this.isValid = false;
    return this.isValid;

  }

  SaveAndAdd(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.PurchasingServ.formData.purchasingDets.push(form.value);
      }
      else {
        this.PurchasingServ.formData.purchasingDets[this.data.orderItemIndex] = form.value;
      }

      this.resetForm();
      this.selectedItem = new Item;
    }
  }

}

