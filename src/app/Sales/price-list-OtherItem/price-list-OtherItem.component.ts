
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { GetPriceListOtherItemsViewModel } from './../../shared/Models/price-lists';
import { Item } from 'src/app/shared/Models/item';
import { PriceLists } from 'src/app/shared/Models/price-lists';
import { Unit } from 'src/app/shared/Models/unit';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { UnitService } from 'src/app/shared/Services/unit.service';
import { Stock } from 'src/app/shared/Models/Stock';


@Component({
  selector: 'app-price-list-Otheritem',
  templateUrl: './price-list-Otheritem.component.html',
  styleUrls: ['./price-list-Otheritem.component.css']
})
export class PriceListOtherItemComponent implements OnInit {

  @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  formData: GetPriceListOtherItemsViewModel;
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
    public dialogRef: MatDialogRef<PriceListOtherItemComponent>, private servStockService: ServStockService
    , private servSalInv: PriceListsService) {

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
        item_ID:this.data.item_ID,
        otherItem_Name:'',
        otherItem_Price:null,
        otherItem_QTY:null,
        otherItem_Total_Price:null,
        otherItem_Total_Tax:0.15,
        otherItem_SubTotal:null,

      }
    }
    else {
      this.formData = Object.assign({}, this.servSalInv.formData.priceListOtherItems[this.data.orderItemIndex]);
      this.servStockService.getItems().subscribe((data: any) => {
        this.itemslist = data;
        this.selectedItem =  this.itemslist.filter(x => x.item_ID == this.formData.item_ID)[0] ;

        console.log(  this.selectedItem , "  this.selectedItem")
        // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
        //   res => {
        //     this.storeItemsStock = res;
        //     if (this.storeItemsStock[0] == undefined)
        //       this.formData.AvailableQty = 0;
        //     else
        //       this.formData.AvailableQty = this.storeItemsStock[0].Qty + this.formData.Qty;
        //   });


        // this.formData.AvailableQty
      },
        (err: HttpErrorResponse) => {
        });
    }

  }

  getItems() {
    this.servStockService.getItems().subscribe((data: any) => {
      console.log(data);
      this.itemslist = data;
      console.log(this.itemslist);
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.item_Name),
          map(state => state ? this._filterStates(state) : this.itemslist.slice())
        );
    },
      (err: HttpErrorResponse) => {
      });
  }

  setSelectedBranch(res) {
    this.selectedItem = res
  }

  private _filterStates(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.itemslist.filter(state => state.item_Name.toLowerCase().indexOf(filterValue) >= 0);
  }
  displayFn(Item?: Item): string | undefined {
    return Item ? Item.item_Name : undefined;
  }

  UpdateQty() {
    if (this.stateCtrl.value != '') {
      this.selectedItem = this.stateCtrl.value;
      // this.formData.Item_ID = this.selectedItem.Item_ID;
      this.formData.otherItem_Name = this.selectedItem.item_Name;
      // this.formData.otherItem_Price = this.selectedItem.ItemSalePrice;
      // this.formData.UNITID = this.selectedItem.UnitId
      // this.formData.UnitName = this.selectedItem.UnitName;
      // this.formData.ItemNO = this.selectedItem.ItemNO.toString();
      // this.formData.CompanyName = this.selectedItem.CompanyName;

      // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
      //   res => {
      //     this.storeItemsStock = res;
      //     if (this.storeItemsStock[0] == undefined)
      //       this.formData.AvailableQty = 0;
      //     else
      //       this.formData.AvailableQty = this.storeItemsStock[0].Qty;
      //     //setTimeout(() => this.inputEl.nativeElement.focus());
      //     //this.inputEl.nativeElement.focus();
      //     //console.log(this.inputEl.nativeElement);
      //     //this.txtArea.find((item, idx) => {
      //     //  return idx === 0;
      //     //}).nativeElement.focus();


      //   });

    }
    // this.UpdateTotal();
  }

  UpdateTotal() {
    console.log(this.formData.otherItem_Price);
    if ( this.formData.otherItem_Price === undefined || this.formData.otherItem_Price == null || this.formData.otherItem_Price.toString().length <= 0 )
      this.formData.otherItem_Price = 0;

    this.formData.otherItem_Total_Price = parseFloat((this.formData.otherItem_Price * this.formData.otherItem_QTY).toFixed(2));
    console.log( this.formData.otherItem_Total_Price ,".otherItem_Total_Price " )

    // this.formData.otherItem_SubTotal = parseFloat((this.formData.otherItem_Total_Price + this.formData.otherItem_Total_Tax).toFixed(2));
    this.UpdateTotal2()
  }

  UpdateTotal2() {
    console.log( this.formData.otherItem_Total_Tax ,".otherItem_Total_Tax " )

    if ( this.formData.otherItem_Total_Price === undefined || this.formData.otherItem_Total_Price == null || this.formData.otherItem_Total_Price.toString().length <= 0 )
    this.formData.otherItem_Total_Price = 0;


    this.formData.otherItem_SubTotal =  parseFloat(((this.formData.otherItem_Total_Price * this.formData.otherItem_Total_Tax) + this.formData.otherItem_Total_Price ).toFixed(2));
    // +this.formData.otherItem_Total_Price +  +this.formData.otherItem_Total_Tax
    // this.formData.otherItem_SubTotal  = parseInt((this.formData.otherItem_Total_Price   + this.formData.otherItem_Total_Tax).toFixed(2));
    console.log( this.formData.otherItem_SubTotal ,".otherItem_SubTotal " )

    // this.formData.otherItem_SubTotal= parseFloat(( this.formData.otherItem_SubTotal).toFixed(2));

    // this.formData.otherItem_SubTotal = parseFloat((this.formData.otherItem_Total_Price + this.formData.otherItem_Total_Tax).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.servSalInv.formData.priceListOtherItems.push(form.value);
      }
      else {
        this.servSalInv.formData.priceListOtherItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: GetPriceListOtherItemsViewModel) {

    this.isValid = true;
    if (formData.otherItem_Price == 0 || formData.otherItem_Price == null)
      this.isValid = false;
    else if (formData.otherItem_QTY == 0 || formData.otherItem_QTY == null)
      this.isValid = false;
    else if (formData.otherItem_Price == null)
      this.isValid = false;
    // else if (formData.Qty > formData.AvailableQty)
    //   this.isValid = false;
    return this.isValid;

  }

  SaveAndAdd(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.servSalInv.formData.priceListOtherItems.push(form.value);
      }
      else {
        this.servSalInv.formData.priceListOtherItems[this.data.orderItemIndex] = form.value;
      }

      this.resetForm();
      this.selectedItem = new Item;
    }
  }

}
