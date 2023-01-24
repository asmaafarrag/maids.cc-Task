import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

//import { SalesSaleInvDet } from 'src/app/shared/Models/sales-sale-inv';
import { SellingCreditNoteDet } from 'src/app/shared/Models/SellingCreditNotes';
import { Stock } from 'src/app/shared/Models/Stock';
//import { SalesSaleInvService } from 'src/app/shared/Services/sales-sale-inv.service';

import { SellingCreditNoteService } from 'src/app/shared/Services/selling-credit-note.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent implements OnInit {


  //@ViewChild("Qty") yourControl : ElementRef;
  // @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  // formData: SellingCreditNoteDet;
  // itemslist: Item[];
  // selectedItem: Item;

  // ItemName = "";
  // StoreId: number;
  // stateCtrl = new FormControl();
  // filteredStates: Observable<Item[]>;

  // isValid: boolean = true;

  // storeItemsStock: Stock[];

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data,
  //   public dialogRef: MatDialogRef<CreditNoteComponent>, private servStockService: ServStockService
  //   , private servCreditNote: SellingCreditNoteService) {

  //    }

  ngOnInit() {
    // this.StoreId = this.data.StoreId;
    // this.getItems();
    // this.resetForm();

  }

  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();

  //   if (this.data.orderItemIndex == null) {

  //     this.formData = {
  //       SellingCreditNoteID: this.data.SellingCreditNoteId,
  //       SerNo:null,
  //       ItemId:null,
  //       ItemNO:'',
  //       ItemName:'',
  //       Qty:null,
  //       Price :0,
  //       DISC: null,
  //       DiscRatio: null,
  //       UnitId: null,
  //       UnitName:'',
  //       Tot:0,
  //       TotWithTax: null,
  //       PricWithTax: null,
  //       DetTaxSal: null,
  //       ItemSaleTaxRatio:null,
  //       ItmSaleTax:null
  //     }
  //   }
  //   else {
  //     this.formData = Object.assign({}, this.servCreditNote.formData.SellingCreditNoteDets[this.data.orderItemIndex]);
  //     this.servStockService.getItems().subscribe((data: any) => {
  //       this.itemslist = data;
  //       this.selectedItem =  this.itemslist.filter(x => x.ItemID == this.formData.ItemId)[0] ;
  //       // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
  //       //   res => {
  //       //     this.storeItemsStock = res;
  //       //     if (this.storeItemsStock[0] == undefined)
  //       //       this.formData.AvailableQty = 0;
  //       //     else
  //       //       this.formData.AvailableQty = this.storeItemsStock[0].Qty + this.formData.Qty;
  //       //   });


  //      // this.formData.AvailableQty
  //     },
  //       (err: HttpErrorResponse) => {
  //       });
  //   }

  // }

  // getItems() {
  //   this.servStockService.getItems().subscribe((data: any) => {
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

  // UpdateQty() {
  //   if (this.stateCtrl.value != '') {
  //     this.selectedItem = this.stateCtrl.value;
  //     this.formData.ItemId = this.selectedItem.ItemID;
  //     this.formData.ItemName = this.selectedItem.ItemName;
  //     this.formData.Price = this.selectedItem.ItemSalePrice;
  //     this.formData.UnitId = this.selectedItem.UnitId
  //     this.formData.UnitName = this.selectedItem.UnitName;
  //     this.formData.ItemNO = this.selectedItem.ItemNO.toString();

  //     this.formData.ItemSaleTaxRatio = this.selectedItem.ItmTaxRatio;

  //     this.formData.ItmSaleTax = this.formData.ItemSaleTaxRatio * this.formData.Price / 100 ;
  //     this.formData.DetTaxSal = this.formData.ItmSaleTax * 0;

  //     // this.formData.CompanyName = this.selectedItem.CompanyName;

  //     // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
  //     //   res => {
  //     //     this.storeItemsStock = res;
  //     //     if (this.storeItemsStock[0] == undefined)
  //     //       this.formData.AvailableQty = 0;
  //     //     else
  //     //       this.formData.AvailableQty = this.storeItemsStock[0].Qty;



  //       // });

  //   }
  //   this.UpdateTotal();
  // }

  // UpdateTotal() {
  //   console.log(this.formData.Price);
  //   if ( this.formData.Price === undefined || this.formData.Price == null || this.formData.Price.toString().length <= 0 )
  //     this.formData.Price = 0;

  //   this.formData.Tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(2));

  //   this.formData.ItmSaleTax = parseFloat((this.formData.ItemSaleTaxRatio * this.formData.Price / 100).toFixed(2));
  //   this.formData.DetTaxSal = parseFloat((this.formData.ItmSaleTax * this.formData.Qty).toFixed(2));
  // }

  // onSubmit(form: NgForm) {
  //   if (this.validateForm(form.value)) {
  //     if (this.data.orderItemIndex == null) {
  //       this.servCreditNote.formData.SellingCreditNoteDets.push(form.value);
  //     }
  //     else {
  //       this.servCreditNote.formData.SellingCreditNoteDets[this.data.orderItemIndex] = form.value;
  //     }
  //     this.dialogRef.close();
  //   }
  // }

  // validateForm(formData: SellingCreditNoteDet) {

  //   this.isValid = true;
  //   if (formData.ItemId == 0 || formData.ItemId == null)
  //     this.isValid = false;
  //   else if (formData.Qty == 0 || formData.Qty == null)
  //     this.isValid = false;
  //   else if (formData.Price == null)
  //     this.isValid = false;
  //   // else if (formData.Qty > formData.AvailableQty)
  //   //   this.isValid = false;
  //   return this.isValid;

  // }

  // SaveAndAdd(form: NgForm) {

  //   if (this.validateForm(form.value)) {
  //     if (this.data.orderItemIndex == null) {
  //       this.servCreditNote.formData.SellingCreditNoteDets.push(form.value);
  //     }
  //     else {
  //       this.servCreditNote.formData.SellingCreditNoteDets[this.data.orderItemIndex] = form.value;
  //     }

  //     this.resetForm();
  //     this.selectedItem = new Item;
  //   }
  // }

}
