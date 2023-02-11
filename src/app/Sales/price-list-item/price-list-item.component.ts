import { ItemPriceModel } from './../../shared/Models/item-price-model';
import { ItemService } from 'src/app/shared/Services/item.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { GetPriceListItemsViewModel } from './../../shared/Models/price-lists';
import { Item } from 'src/app/shared/Models/item';
import { PriceLists } from 'src/app/shared/Models/price-lists';
import { Unit } from 'src/app/shared/Models/unit';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { UnitService } from 'src/app/shared/Services/unit.service';
import { Stock } from 'src/app/shared/Models/Stock';


@Component({
  selector: 'app-price-list-item',
  templateUrl: './price-list-item.component.html',
  styleUrls: ['./price-list-item.component.css']
})
export class PriceListItemComponent implements OnInit {

  @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  formData: GetPriceListItemsViewModel;
  range;
  column_count:number;
  opening_Step:number;
  opening_StartValue:number;
  itemslist: Item[];
  itemslist2: Item[];

  selectedItem: Item;
  val: number;
  // meterP:number=0;
  ItemName = "";
  StoreId: number;
  stateCtrl = new FormControl();
  filteredStates: Observable<Item[]>;
  parentNoderowIndex:number;
  isValid: boolean = true;

  storeItemsStock: Stock[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PriceListItemComponent>, private servStockService: ServStockService
    , private servSalInv: PriceListsService , public ItemServ:ItemService) {

     }

  ngOnInit() {
    // this.StoreId = this.data.StoreId;
    this.getItems();
    this.resetForm();

  }

  select(){

    // let cells = document.querySelectorAll('td');
    // cells.forEach(cell => {
    // cell.addEventListener('click', function() {
    //   cell.style.backgroundColor = 'rgb(233 78 78)';
    //   console.log("clicked cell at: " + this.cellIndex + ", " + this.parentNode.rowIndex);
    //   // console.log("Row index: " + (cell.closest('tr').rowIndex) + " | Column index: " + (cell.cellIndex) + " | Cell=" + (cell.innerText));
    //   localStorage.setItem('cell.innerText' , cell.innerText)
    //       }, false);
    // });

    document.querySelectorAll('#table td ')
    .forEach(e => e.addEventListener("click", function() {
        // Here, `this` refers to the element the event was hooked on
        this.style.backgroundColor = 'rgb(233 78 78)';
        console.log("clicked cell at: " + this.cellIndex + ", " + this.parentNode.rowIndex + ',' + this.innerText);

          //  localStorage.setItem('item_Price_Id' ,  this.itemslist2[this.parentNode.rowIndex - 2].item_Price_ID)
          //  console.log(this.itemslist2[this.parentNode.rowIndex - 2].item_Price_ID)

           localStorage.setItem('cell.innerText' , this.innerText)
           localStorage.setItem('cellIndex' , this.cellIndex)
           localStorage.setItem('this.parentNode.rowIndex' , this.parentNode.rowIndex)
    }));

    // this.formData.item_Price_Value =  +localStorage.getItem('cell.innerText')
    this.formData.item_Price_Value_Curr =  +localStorage.getItem('cell.innerText')
    this.formData.item_Price_Col =  +localStorage.getItem('cellIndex')
    this.parentNoderowIndex  = +localStorage.getItem('this.parentNode.rowIndex')
    // this.formData.item_Price_ID =  +localStorage.getItem('item_Price_Id')
    console.log(this.range[this.formData.item_Price_Col - 1])
    console.log(this.itemslist2[this.parentNoderowIndex - 2])
    let itemslist3 = (this.itemslist2[this.parentNoderowIndex - 2])
    console.log(itemslist3)





    console.log( this.formData.item_Price_Value_Curr," this.formData.item_Price_Value_Curr")
    console.log( this.formData.item_Price_Col," this.formData.item_Price_Col")
    // console.log( this.formData.item_Price_ID," this.formData.item_Price_ID")


    if(this.formData.item_Price_Value_Curr && this.formData.item_Price_Col ){
      return true;
    }

  }

  getItemPrice(id,width){
    this.formData.item_Price_ID = id;
    this.formData.item_Total_Area = ((width * this.range[this.formData.item_Price_Col - 1] ) / 10000);
    console.log(width,this.range[this.formData.item_Price_Col - 1] )
    console.log((this.formData.item_Total_Area / 10000))
  console.log(id, "idnnn  ")

  this.UpdateTotal();
  }


  setSelectedBranch(res) {
    this.selectedItem= res
    // console.log( this.selectedItem)

    this.formData.priceListItem_Name = this.selectedItem.item_Name;
    this.formData.item_ID = this.selectedItem.item_ID;
    this.getItemTable();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    if (this.data.orderItemIndex == null) {

      this.formData = {
        item_Price_ID :null,
        item_Price_Col  :null,
        item_ID :null,
        priceListItem_Name :'',
        item_Price_Value_Curr :null,
        item_Price_Value   :null,
        item_Total_Area  :null,
        item_Total_Price  :null,
        item_Price_Value_PerMeter:0,
        item_Total_Tax  :0.15,
        item_SubTotal  :null,

      }
    }
    // else {
    //   this.formData = Object.assign({}, this.servSalInv.formData.priceListItems[this.data.orderItemIndex]);


    //   this.selectedItem =  this.itemslist.filter(x => x.item_ID == this.formData.item_ID)[0] ;
    //   console.log(this.selectedItem)
    //   this.getItemTable();

    //   // this.ItemServ.getItemWPriceById( this.formData.item_ID).subscribe((data: any) => {
    //   //   this.itemslist = data;
    //   //   console.log(data , "data")

    //   //   // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
    //   //   //   res => {
    //   //   //     this.storeItemsStock = res;
    //   //   //     if (this.storeItemsStock[0] == undefined)
    //   //   //       this.formData.AvailableQty = 0;
    //   //   //     else
    //   //   //       this.formData.AvailableQty = this.storeItemsStock[0].Qty + this.formData.Qty;
    //   //   //   });


    //   //   // this.formData.AvailableQty
    //   // },
    //     (err: HttpErrorResponse) => {
    //     };
    // }

    else {
      this.formData = Object.assign({}, this.servSalInv.formData.priceListItems[this.data.orderItemIndex]);
      this.servStockService.getItems().subscribe((data: any) => {
        this.itemslist = data;

        this.selectedItem =  this.itemslist.filter(x => x.item_ID == this.formData.item_ID)[0];

        console.log(  this.selectedItem ,"this.selectedItem")
        // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
        //   res => {
        //     this.storeItemsStock = res;
        //     if (this.storeItemsStock[0] == undefined)
        //       this.formData.AvailableQty = 0;
        //     else
        //       this.formData.AvailableQty = this.storeItemsStock[0].Qty + this.formData.Qty;
        //   });


        // this.formData.AvailableQty

        this.ItemServ.getItemWPriceById(this.selectedItem.item_ID).subscribe((data: any) => {
          this.itemslist2 = data.itemPrices;
          console.log(this.itemslist2 , "this.itemslist2")
          this.column_count = data.columns_Count;
          this.opening_Step= data.opening_Step;
          this.opening_StartValue = data.opening_StartValue;
          // this.formData.item_Price_ID = data.item_Price_ID;
          // console.log(data , "data")
          // console.log(this.itemslist2 , "this.itemslist2")
          // console.log( this.formData.item_Price_ID , " this.item_Price_ID")

          this.selectedItem =  this.itemslist.filter(x => x.item_ID == this.formData.item_ID)[0] ;


          this.IncreaseValue();
        });
      },
        (err: HttpErrorResponse) => {
        });
    }

  }

  getItems() {
    this.servStockService.getItems().subscribe((data: any) => {
        // console.log(data , "data")

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


  getItemTable(){
    this.ItemServ.getItemWPriceById(this.selectedItem.item_ID).subscribe((data: any) => {
      this.itemslist2 = data.itemPrices;

      this.column_count = data.columns_Count;
      this.opening_Step= data.opening_Step;
      this.opening_StartValue = data.opening_StartValue;

      // console.log(data , "data")
      // console.log(this.itemslist2 , "this.itemslist2")
      // console.log( this.column_count , " this.column_count")

      this.selectedItem =  this.itemslist.filter(x => x.item_ID == this.formData.item_ID)[0] ;


      this.IncreaseValue();
    },

    (err: HttpErrorResponse) => {
    });
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
      this.formData.item_ID = this.selectedItem.item_ID;
      this.formData.priceListItem_Name = this.selectedItem.item_Name;

      console.log(  this.formData.item_ID , this.formData.priceListItem_Name ,"two")
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
    this.getItemTable();
    // this.UpdateTotal();
  }

  UpdateTotal() {
    // console.log(this.formData.item_Price_Value);
    if ( this.formData.item_Price_Value_Curr === undefined || this.formData.item_Price_Value_Curr == null || this.formData.item_Price_Value_Curr.toString().length <= 0 )
      this.formData.item_Price_Value_Curr = 0;

    this.formData.item_Price_Value = parseFloat(( (this.formData.item_Price_Value_Curr * this.servSalInv.formData.exchangeRate ) - ( (this.formData.item_Price_Value_Curr * this.servSalInv.formData.exchangeRate ) * this.servSalInv.formData.priceList_DiscountRate / 100 )).toFixed(2));


    this.formData.item_Total_Price = parseFloat((this.formData.item_Price_Value  ).toFixed(2));

    // this.meterP =  (this.formData.item_Total_Area / this.formData.item_Price_Value);
    // console.log( this.meterP)
    this.formData.item_Total_Tax = parseFloat(( this.formData.item_Total_Price * 0.15 ).toFixed(2))

    // let t = parseFloat(( this.formData.item_Price_Value * this.formData.item_Total_Tax ).toFixed(2))

    this.formData.item_SubTotal =  parseFloat((this.formData.item_Total_Price  + this.formData.item_Total_Tax ).toFixed(2));


    this.formData.item_Price_Value_PerMeter = parseFloat((  this.formData.item_Total_Price  / this.formData.item_Total_Area).toFixed(2));

    console.log( this.formData.item_Price_Value_PerMeter ," this.formData.item_Price_Value_PerMeter")

  }




  onSubmit(form: NgForm) {
    // console.log(form.value ,"form.value")
    let re =  this.select();

    console.log(re,"re")

    if(re == true){

      // this.UpdateTotal();

      if (this.validateForm(form.value)) {

        console.log("valid")
        if (this.data.orderItemIndex == null) {
          this.servSalInv.formData.priceListItems.push(form.value);
          localStorage.removeItem('cell.innerText')
          localStorage.removeItem('cellIndex')

        }
        else {
          this.servSalInv.formData.priceListItems[this.data.orderItemIndex] = form.value;
          console.log(this.servSalInv.formData , "put")
          localStorage.removeItem('cell.innerText')
          localStorage.removeItem('cellIndex')

        }
        this.dialogRef.close();
      }
    }
  }

  validateForm(formData: GetPriceListItemsViewModel) {

    this.isValid = true;
    if (formData.item_Price_Value_Curr == 0 || formData.item_Price_Value_Curr == null)
      this.isValid = false;
    else if (formData.priceListItem_Name == '' || formData.priceListItem_Name == null)
      this.isValid = false;
    // else if (formData.item_Price_Value_Curr == 0 || formData.item_Price_Value_Curr == null)
    //   this.isValid = false;
    else if (formData.item_Price_Col == null)
      this.isValid = false;
    // else if (formData.item_Total_Area == null)
    //   this.isValid = false;
    // else if (formData.Qty > formData.AvailableQty)
    //   this.isValid = false;
    return this.isValid;

  }

  SaveAndAdd(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.servSalInv.formData.priceListItems.push(form.value);
      }
      else {
        this.servSalInv.formData.priceListItems[this.data.orderItemIndex] = form.value;
      }

      this.resetForm();
      this.selectedItem = new Item;
    }
  }


  createRange(number) {
    return new Array(number - 0).fill(0).map((d, i) => i + 0);

   }
   submitted = false;


   IncreaseValue(){

    //  // let r = new Array(this.servItem.formData.columns_Count - 0).fill(0).map((d,i) => i + this.servItem.formData.opening_StartValue);
    //  // console.log(r,'r');
    //  // console.log(Array.from({ length: this.servItem.formData.columns_Count }).reduce((x, y, i, a) => (a.fill(i, i, i + 1), a), []))
    //  let start = 0;
    //  let end = 100;
    //  let step = 10;
    // //  let arrayLength = Math.floor(((end - this.ItemServ.formData.opening_StartValue) / this.ItemServ.formData.opening_Step)) + 1;
    //  // console.log(arrayLength)
    //  // let range = new Array(arrayLength).map(x => (x * step) + start);

     this.range = new Array(Math.floor( this.column_count)).fill(0).map((i,x) => (x * this.opening_Step) + this.opening_StartValue);
    //  console.log(this.range,'r');

   }



}
