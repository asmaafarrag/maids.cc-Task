import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith , filter  } from 'rxjs/operators';

import { TransBetStoreDet } from 'src/app/shared/Models/trans-bet-stores';
import { Stock } from 'src/app/shared/Models/Stock';
import { TransBetStoresService } from 'src/app/shared/Services/trans-bet-stores.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-trans-bet-stores-items',
  templateUrl: './trans-bet-stores-items.component.html',
  styleUrls: ['./trans-bet-stores-items.component.css']
})
export class TransBetStoresItemsComponent implements OnInit {

  @ViewChildren("Qty") Qty:QueryList<ElementRef>;

  formData: TransBetStoreDet;
  itemslist: Item[];
  selectedItem: Item;

  ItemName = "";
  StoreId : number;
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;

  isValid: boolean = true;

  storeItemsStock : Stock[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TransBetStoresItemsComponent>,private servStockService: ServStockService
    , private TransBetStoresServ: TransBetStoresService) { }

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
        TBSID: this.data.TBSID,
        ItemId: null,
        ItemName: '',
        Price: null,
        Qty: 0,
        AvailableQty: 0,
        UnitId: null,
        UnitName: '',
        Tot: 0
      }
    }
    else
    {
      this.formData = Object.assign({}, this.TransBetStoresServ.formData.transBetStoreDet[this.data.orderItemIndex]);
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
      //this.formData.ItemNO = this.selectedItem.ItemNO.toString();

      this.servStockService.getStockItems_By_ItemId(this.StoreId,this.selectedItem.ItemID,false).subscribe(
        res=> {
          this.storeItemsStock = res;
          this.formData.AvailableQty = this.storeItemsStock[0].Qty; 
         
          //setTimeout(() => this.inputEl.nativeElement.focus());
          //this.inputEl.nativeElement.focus();
          //console.log(this.inputEl.nativeElement);
          //this.txtArea.find((item, idx) => {
          //  return idx === 0;
          //}).nativeElement.focus();
        
         
        }) ;   
       
    }
   
    this.UpdateTotal();
  }

  UpdateTotal() {
    //this.formData.Tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
      this.TransBetStoresServ.formData.transBetStoreDet.push(form.value);
      }
      else
      {
        this.TransBetStoresServ.formData.transBetStoreDet[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: TransBetStoreDet) {
    this.isValid = true;
    if (formData.ItemId == 0 || formData.ItemId == null)
      this.isValid = false;
    else if (formData.Qty == 0 || formData.Qty == null)
      this.isValid = false;
      else if (formData.Qty > formData.AvailableQty)
      this.isValid = false;

   
    return this.isValid;

  }

  SaveAndAdd(form: NgForm){
    console.log('aa')
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.TransBetStoresServ.formData.transBetStoreDet.push(form.value);
        }
        else
        {
          this.TransBetStoresServ.formData.transBetStoreDet[this.data.orderItemIndex] = form.value;
        }
      
      this.resetForm();
      this.selectedItem = new Item;
    }
  }


}
