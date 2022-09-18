import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { Add, AddDet } from 'src/app/shared/Models/add';
import { Stock } from 'src/app/shared/Models/Stock';
import { AddService } from 'src/app/shared/Services/add.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-adds-items',
  templateUrl: './adds-items.component.html',
  styleUrls: ['./adds-items.component.css']
})
export class AddsItemsComponent implements OnInit {

  @ViewChildren("Qty") Qty: QueryList<ElementRef>;
 
  formData: AddDet;
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
    public dialogRef: MatDialogRef<AddsItemsComponent>, private servStockService: ServStockService
    , private addServ: AddService) { }

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
          AddID: this.data.SellingId,
          ItemId: null,
          ItemName: '',
          Price: null,
          Qty: null,
          UnitID: null,
          UnitName: '',
          DISC: 0,
          CostPrice: null,
          Tot: 0
        }
      }
      else {
        this.formData = Object.assign({}, this.addServ.formData.addDets[this.data.orderItemIndex]);
  
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
       // this.formData.ItemNO = this.selectedItem.ItemNO.toString();
       // this.formData.CompanyName = this.selectedItem.CompanyName;
  
      //  this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
      //    res => {
      //      this.storeItemsStock = res;
      //      if (this.storeItemsStock[0] == undefined)
      //        this.formData.AvailableQty = 0;
      //      else
      //        this.formData.AvailableQty = this.storeItemsStock[0].Qty;    
      //    });
  
      }
      this.UpdateTotal();
    }
  
    UpdateTotal() {
    
      if ( this.formData.Price === undefined || this.formData.Price == null || this.formData.Price.toString().length <= 0 )
        this.formData.Price = 0;
  
      this.formData.Tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(2));
    }
  
    onSubmit(form: NgForm) {
      if (this.validateForm(form.value)) {
        if (this.data.orderItemIndex == null) {
          this.addServ.formData.addDets.push(form.value);
        }
        else {
          this.addServ.formData.addDets[this.data.orderItemIndex] = form.value;
        }
        this.dialogRef.close();
      }
    }
  
    validateForm(formData: AddDet) {
  
      this.isValid = true;
      if (formData.ItemId == 0 || formData.ItemId == null)
        this.isValid = false;
      else if (formData.Qty == 0 || formData.Qty == null)
        this.isValid = false;
      else if (formData.Price == null)
        this.isValid = false;
      //else if (formData.Qty > formData.AvailableQty)
      //  this.isValid = false;
      return this.isValid;
  
    }
  
    SaveAndAdd(form: NgForm) {
  
      if (this.validateForm(form.value)) {
        if (this.data.orderItemIndex == null) {
          this.addServ.formData.addDets.push(form.value);
        }
        else {
          this.addServ.formData.addDets[this.data.orderItemIndex] = form.value;
        }
  
        this.resetForm();
        this.selectedItem = new Item;
      }
    }
  
  }
  