import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { SellingRetDets } from 'src/app/shared/Models/selling-ret';
import { Stock } from 'src/app/shared/Models/Stock';
import { SellingRetService } from 'src/app/shared/Services/selling-ret.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-selling-rets-items',
  templateUrl: './selling-rets-items.component.html',
  styleUrls: ['./selling-rets-items.component.css']
})
export class SellingRetsItemsComponent implements OnInit {

  @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  formData: SellingRetDets;
  itemslist: Item[];
  selectedItem: Item;

  ItemName = "";
  StoreId: number;
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;

  isValid: boolean = true;

  storeItemsStock: Stock[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SellingRetsItemsComponent>, private servStockService: ServStockService
    , private servSellingRet: SellingRetService) {
      
     }

  ngOnInit() {
    this.StoreId = this.data.StoreId;
    this.getItems();
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    if (this.data.orderItemIndex == null) {

      this.formData = {
        SerNo: null,
        SellingRetID: this.data.SellingRetID,
        ItemId: null,
        ItemNO: '',
        ItemName: '',
        Price: 0,
        Qty: null,
        UnitId: null,
        UnitName: '',
        tot: 0,
        CompanyName: '',
        TotWithTax:null,
        DetTaxGainCom:0,
        DetTaxSal:0,
        ItmSaleTax:null,
        QtySaleTax:null,
        ItemSaleTaxRatio:null,
        PricWithTax:null,
        DISC:0,
        DiscRatio:null,
        DiscV:0,
      }
    }
    else {
      this.formData = Object.assign({}, this.servSellingRet.formData.sellingRetDets[this.data.orderItemIndex]);
      this.servStockService.getItems().subscribe((data: any) => {
        this.itemslist = data; 
        this.selectedItem =  this.itemslist.filter(x => x.ItemID == this.formData.ItemId)[0] ; 
              },
        (err: HttpErrorResponse) => {
        });
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
      this.formData.Price = this.selectedItem.ItemSalePrice;
      this.formData.UnitId = this.selectedItem.UnitId
      this.formData.UnitName = this.selectedItem.UnitName;
      this.formData.ItemNO = this.selectedItem.ItemNO.toString();
      this.formData.CompanyName = this.selectedItem.CompanyName;

      

    }
    this.UpdateTotal();
  }

  UpdateTotal() {
  
    if ( this.formData.Price === undefined || this.formData.Price == null || this.formData.Price.toString().length <= 0 )
      this.formData.Price = 0;

    this.formData.tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.servSellingRet.formData.sellingRetDets.push(form.value);
      }
      else {
        this.servSellingRet.formData.sellingRetDets[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: SellingRetDets) {

    this.isValid = true;
    if (formData.ItemId == 0 || formData.ItemId == null)
      this.isValid = false;
    else if (formData.Qty == 0 || formData.Qty == null)
      this.isValid = false;
    else if (formData.Price == null)
      this.isValid = false;
    
    return this.isValid;

  }

  SaveAndAdd(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.servSellingRet.formData.sellingRetDets.push(form.value);
      }
      else {
        this.servSellingRet.formData.sellingRetDets[this.data.orderItemIndex] = form.value;
      }

      this.resetForm();
      this.selectedItem = new Item;
    }
  }

}
