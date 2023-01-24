// import { ItemInputComponent } from './../item-input/item-input.component';
import { ItemPriceModel } from './../../shared/Models/item-price-model';
import { ItemPricesService } from './../../shared/Services/itemPrices.service';
import { ItemService } from './../../shared/Services/item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Item } from '../../shared/Models/item';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {



  // constructor(
  // //   @Inject(MAT_DIALOG_DATA) public data, public taxTypeServ:TaxTypeService,
  // //   public dialogRef: MatDialogRef<ItemLineComponent>, private servStockService: ServStockService
  //    public servSalInv: ItemPricesService){

  // }

  // ngOnInit() {

  //   let cells = document.querySelectorAll('td');
  //   cells.forEach(cell => {
  //   cell.addEventListener('click', () =>
  //     console.log("Row index: " + cell.closest('tr').rowIndex + " | Column index: " + cell.cellIndex));
  //   });

  // }
  // source: any = [
  //   { a: '3', b: '3' },
  //   { a: '4', b: '4' },
  //   { a: '5', b: '5' }
  // ];

  // configs: any = {
  //   rows: 'a',
  //   columns: 'b'
  // };



  formData: ItemPriceModel;
  show:boolean=true;
  isEnabled: boolean = true;
  itemslist: ItemPriceModel[];

  selectedItem: Item;
  range
  ItemName = "";

  isValid: boolean = true;


  constructor( private toastr: ToastrService ,private dialog: MatDialog, private router: Router,
    // @Inject(MAT_DIALOG_DATA) public data
    // ,public dialogRef: MatDialogRef<ItemLineComponent>
    public datepipe: DatePipe ,
    public currentRoute: ActivatedRoute,
     public servItem: ItemService) {

     }

  ngOnInit() {
    let InvId = this.currentRoute.snapshot.paramMap.get('id')

    this.resetForm();

    if (InvId != null)
    this.populateForm(parseInt(InvId));
  }

  // change(){
  //   this.show = !this.show;
  // }

  populateForm(InvId: number) {


    this.servItem.getItemWPriceById(InvId).subscribe(res =>
      {
        this.servItem.formData = res;

        this.itemslist = res.itemPrices;

        console.log(res,"res")

        console.log( this.itemslist," this.itemslist")


        this.range = new Array(Math.floor(res.columns_Count)).fill(0).map((i,x) => (x * res.opening_Step) + res.opening_StartValue);
        console.log(this.range,'r');

        // this.imageUrl = this.servItem.formData.ComplainImage;

      } );





  }

  download(){

    window.open('https://files.fm/u/j9e2jczmv', '_blank');

  }

  onChange(value, field) {
    console.log(field.item_Price_ID ,"field.price_Col_2")
    console.log(value ,"value")
    this.itemslist[field.item_Price_ID].price_Col_2 = value;
  }

  save(value:any){

    console.log(value,'value')
    this.itemslist.push(value);
    console.log(this.itemslist,'this.itemslist2')

  }



  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    // if (this.data.orderItemIndex == null) {
      this.servItem.formData = {
        // item_Price_ID: null,
        // item_ID:null,
        // item_Price_Width:null,
        // price_Col_1:null,
        // price_Col_2:null,
        // price_Col_3:null,
        // price_Col_4:null,
        // price_Col_5:null,
        // price_Col_6:null,
        // price_Col_7:null,
        // price_Col_8:null,
        // price_Col_9:null,
        // price_Col_10:null,
        // price_Col_11:null,
        // price_Col_12:null,
        // price_Col_13:null,
        // price_Col_14:null,
        // price_Col_15:null,
        // price_Col_16:null,
        // price_Col_17:null,
        // price_Col_18:null,
        // price_Col_19:null,
        // price_Col_20:null,
        // price_Col_21:null,
        // price_Col_22:null,
        // price_Col_23:null,
        // price_Col_24:null,
        // price_Col_25:null,
        // price_Col_26:null,
        // price_Col_27:null,
        // price_Col_28:null,
        // price_Col_29:null,
        // price_Col_30:null,


        item_ID :-1,
        item_Name :'',
        item_Description  :'',
        item_ImageURL  :'',
        item_ImageFile:'',
        item_Enabled :true,
        rows_Count :null,
        columns_Count :null,
        opening_StartValue :null,
        opening_Step :null,
        itemPrices:[],
        // entryUser :'',
        // entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        isSelected:false,
      }
    }
    // else {
    //   this.formData = Object.assign({}, this.servItem.formData.itemPrices[this.data.orderItemIndex]);

    // }

  // }


  // UpdateQty() {
  //   if (this.stateCtrl.value != '') {
  //     this.selectedItem = this.stateCtrl.value;
  //     this.formData.TaxTypeID = this.selectedItem.TaxTypeID;
  //     // this.formData. = this.selectedItem.ItemName;



  //     // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
  //     //   res => {
  //     //     this.storeItemsStock = res;
  //     //     if (this.storeItemsStock[0] == undefined)
  //     //       this.formData.AvailableQty = 0;
  //     //     else
  //     //       this.formData.AvailableQty = this.storeItemsStock[0].Qty;
  //     //     //setTimeout(() => this.inputEl.nativeElement.focus());
  //     //     //this.inputEl.nativeElement.focus();
  //     //     //console.log(this.inputEl.nativeElement);
  //     //     //this.txtArea.find((item, idx) => {
  //     //     //  return idx === 0;
  //     //     //}).nativeElement.focus();


  //     //   });

  //   }

  // }


  // onSubmit(form: NgForm) {
  //   // if (this.validateForm(form.value)) {
  //   //   if (this.data.orderItemIndex == null) {
  //   //     this.servItem.formData.itemPrices.push(form.value);
  //   //   }
  //   //   else {
  //   //     this.servItem.formData.itemPrices[this.data.orderItemIndex] = form.value;
  //   //   }
  //   //   // this.dialogRef.close();
  //   // }
  // }


  getId(){
    this.router.navigate(["/PIExcel/" + this.servItem.formData.item_ID])
  }

  onSubmit(form: NgForm) {

    console.log(form.value , 'fv')
    // this.servItem.formData.itemPrices.push(form.value);

    if (this.validateForm()) {
        console.log(this.servItem.formData ,'this.AdsServ.formData ');

        this.servItem.putItemPrices().subscribe(
          res => {
            this.showSuccess();
            this.resetForm();
            this.isEnabled = true;
            this.router.navigate(['/ChangeItemPrice']);


          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
    }
  }




  showSuccess() {
    this.toastr.success('تم تحديث اسعارالصنف', 'الاصناف');
  }

  showError() {
    this.toastr.error('خطأ فى تحديث اسعار الصنف', 'الاصناف');
  }


  // validateFormm(formData: ItemPriceModel) {

  //   this.isValid = true;
  //   if ( formData.item_Price_Width == null)
  //     this.isValid = false;

  //   else if ( formData.price_Col_1 == null)
  //     this.isValid = false;

  //   else if ( formData.price_Col_2 == null)
  //     this.isValid = false;

  //   else if ( formData.price_Col_3 == null)
  //   this.isValid = false;

  //   else if ( formData.price_Col_4 == null)
  //     this.isValid = false;

  //   else if ( formData.price_Col_5 == null)
  //   this.isValid = false;
  //   // else if (formData.TaxTypeRate == 0 || formData.TaxTypeRate == null)
  //   //   this.isValid = false;
  //   return this.isValid;

  // }

  validateForm() {
    this.isValid = true;
    // if (this.servItem.formData.UnitId == null || this.servItem.formData.UnitId == 0)
    //   this.isValid = false;
      // if (this.servItem.formData.GroupID == null || this.servItem.formData.GroupID == 0)
      // this.isValid = false;
     if (this.servItem.formData.item_Name == null)
      this.isValid = false;
    //   else if (this.servItem.formData.ItemBarCode == null)
    //   this.isValid = false;
    // else if (this.servItem.formData.ItemSalePrice == null || this.servItem.formData.ItemSalePrice == 0)
    //   this.isValid = false;
    return this.isValid;
  }


  createRange(number) {
    return new Array(number - 0).fill(0).map((d, i) => i + 0);

   }
   submitted = false;


   IncreaseValue(){

     // let r = new Array(this.servItem.formData.columns_Count - 0).fill(0).map((d,i) => i + this.servItem.formData.opening_StartValue);
     // console.log(r,'r');

     // console.log(Array.from({ length: this.servItem.formData.columns_Count }).reduce((x, y, i, a) => (a.fill(i, i, i + 1), a), []))


     let start = 0;
     let end = 100;
     let step = 10;
     let arrayLength = Math.floor(((end - this.servItem.formData.opening_StartValue) / this.servItem.formData.opening_Step)) + 1;
     // console.log(arrayLength)
     // let range = new Array(arrayLength).map(x => (x * step) + start);

     this.range = new Array(Math.floor(this.servItem.formData.columns_Count)).fill(0).map((i,x) => (x * this.servItem.formData.opening_Step) + this.servItem.formData.opening_StartValue);
     console.log(this.range.count,'s');

   }

  // SaveAndAdd(form: NgForm) {

  //   if (this.validateForm(form.value)) {
  //     if (this.data.orderItemIndex == null) {
  //       this.servSalInv.formData.ItemTaxTypes.push(form.value);
  //     }
  //     else {
  //       this.servSalInv.formData.ItemTaxTypes[this.data.orderItemIndex] = form.value;
  //     }

  //     this.resetForm();
  //     this.selectedItem = new TaxType;
  //   }
  // }
  // @ViewChildren("Qty") Qty: QueryList<ElementRef>;


  // formData: ItemTaxTypes;
  // // itemslist: Item[];
  // selectedItem: TaxType;
  // TaxTypeslist:TaxType[];
  // TaxTypeName = "";
  // // StoreId: number;
  // stateCtrl = new FormControl();
  // filteredStates: Observable<TaxType[]>;

  // isValid: boolean = true;

  // // storeItemsStock: Stock[];

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data, public taxtypeServ:TaxTypeService,
  //   public dialogRef: MatDialogRef<ItemLineComponent>, private servStockService: ServStockService
  //   , private ItemServ: ItemService) {

  //    }

  // // ngOnInit() {
  // //   // this.StoreId = this.data.StoreId;
  // //   this.getItems();

  // //   this.resetForm();

  // // }

  // // resetForm(form?: NgForm) {
  // //   if (form != null)
  // //     form.form.reset();


  // //     this.formData = {
  // //       ItemsTaxTypeId:null,
  // //       ItemID:null,
  // //       TaxTypeID:null,
  // //       TaxTypeRate:null,
  // //       TaxTypeAmount:null,
  // //     }



  // // }

  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();

  //   if (this.data.orderItemIndex == null) {

  //     this.formData = {
  //       ItemsTaxTypeId:null,
  //       ItemID:this.data.ItemID,
  //       TaxTypeID:null,
  //       TaxTypeName:'',
  //       TaxTypeRate:0,
  //       TaxTypeAmount:0,
  //       TaxTypeCalcWayId:null,
  //       // TaxType:[],
  //       // Item:[]
  //     }
  //   }
  //   else {
  //     this.formData = Object.assign({}, this.ItemServ.formData.ItemTaxTypes[this.data.orderItemIndex]);
  //     this.taxtypeServ.getTaxTypes().subscribe((data: any) => {
  //       this.TaxTypeslist = data;
  //       this.selectedItem =  this.TaxTypeslist.filter(x => x.TaxTypeID == this.formData.TaxTypeID)[0] ;


  //       // this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
  //       //   res => {
  //       //     this.storeItemsStock = res;
  //       //     if (this.storeItemsStock[0] == undefined)
  //       //       this.formData.AvailableQty = 0;
  //       //     else
  //       //       this.formData.AvailableQty = this.storeItemsStock[0].Qty + this.formData.Qty;
  //       //   });


  //       // this.formData.AvailableQty
  //     },
  //       (err: HttpErrorResponse) => {
  //       });
  //   }

  // }

  // getItems() {
  //   this.taxtypeServ.getTaxTypes().subscribe((data: any) => {
  //     this.TaxTypeslist = data;
  //     this.filteredStates = this.stateCtrl.valueChanges
  //       .pipe(
  //         startWith(''),
  //         map(value => typeof value === 'string' ? value : value.TaxTypeName),
  //         map(state => state ? this._filterStates(state) : this.TaxTypeslist.slice())
  //       );
  //   },
  //     (err: HttpErrorResponse) => {
  //     });
  // }

  // private _filterStates(value: string): TaxType[] {
  //   const filterValue = value.toLowerCase();
  //   return this.TaxTypeslist.filter(state => state.TaxTypeName.toLowerCase().indexOf(filterValue) >= 0 );
  // }

  // displayFn(Item?: TaxType): string | undefined {
  //   return Item ? Item.TaxTypeName : undefined;
  // }

  // UpdateQty() {
  //   if (this.stateCtrl.value != '') {
  //     this.selectedItem = this.stateCtrl.value;
  //     // this.formData.TaxTypeAmount = this.selectedItem.;
  //     this.formData.TaxTypeID = this.selectedItem.TaxTypeID;
  //     this.formData.TaxTypeName = this.selectedItem.TaxTypeName;

  //     // this.formData.TaxTypeRate = this.selectedItem.
  //   }

  //   // this.calcItemsAmount();

  // }

  // calcItemsAmount() {

  //   this.formData.TaxTypeAmount = parseFloat((this.formData.TaxTypeRate * this.ItemServ.formData.ItemSalePrice / 100).toFixed(2));
  //   console.log( this.formData.TaxTypeAmount,' this.formData.TaxTypeAmount')

  // }

  // onSubmit(form: NgForm) {
  //   if (this.validateForm(form.value)) {
  //     console.log('dd')
  //     if (this.data.orderItemIndex == null) {


  //       this.ItemServ.formData.ItemTaxTypes.push(form.value);
  //     }
  //     else {
  //       console.log('d3d')

  //       this.ItemServ.formData.ItemTaxTypes[this.data.orderItemIndex] = form.value;
  //     }
  //     this.dialogRef.close();
  //   }
  // }

  // validateForm(formData: ItemTaxTypes) {
  //   this.isValid = true;

  //   if (formData.TaxTypeID ==  0 || formData.TaxTypeID == null)
  //     this.isValid = false;

  //   return this.isValid;


  // }

  // SaveAndAdd(form: NgForm) {

  //   if (this.validateForm(form.value)) {
  //     if (this.data.orderItemIndex == null) {
  //       console.log(form.value,'d2d')
  //       this.ItemServ.formData.ItemTaxTypes.push(form.value);

  //     }
  //     else {
  //       console.log('d33d')

  //       this.ItemServ.formData.ItemTaxTypes[this.data.orderItemIndex] = form.value;
  //     }

  //     this.resetForm();
  //     this.selectedItem = new TaxType;
  //   }
  // }

  // // // getItems() {
  // // //   this.servStockService.getItems().subscribe((data: any) => {
  // // //     this.itemslist = data;
  // // //     this.filteredStates = this.stateCtrl.valueChanges
  // // //       .pipe(
  // // //         startWith(''),
  // // //         map(value => typeof value === 'string' ? value : value.ItemName),
  // // //         map(state => state ? this._filterStates(state) : this.itemslist.slice())
  // // //       );
  // // //   },
  // // //     (err: HttpErrorResponse) => {
  // // //     });
  // // // }

  // // // private _filterStates(value: string): Item[] {
  // // //   const filterValue = value.toLowerCase();
  // // //   return this.itemslist.filter(state => state.ItemName.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote1.toLowerCase().indexOf(filterValue) >= 0 || state.ItemNote2.toLowerCase().indexOf(filterValue) >= 0);
  // // // }

  // // // displayFn(Item?: Item): string | undefined {
  // // //   return Item ? Item.ItemName : undefined;
  // // // }

  // // // UpdateQty() {
  // // //   if (this.stateCtrl.value != '') {
  // // //     this.selectedItem = this.stateCtrl.value;
  // // //     this.formData.ItemId = this.selectedItem.ItemID;
  // // //     this.formData.ItemName = this.selectedItem.ItemName;
  // // //     this.formData.Price = this.selectedItem.ItemSalePrice;
  // // //     this.formData.UnitId = this.selectedItem.UnitId
  // // //     this.formData.UnitName = this.selectedItem.UnitName;
  // // //     this.formData.ItemNO = this.selectedItem.ItemNO.toString();
  // // //     this.formData.CompanyName = this.selectedItem.CompanyName;


  // // //     this.formData.ItemSaleTaxRatio = this.selectedItem.ItmTaxRatio;

  // // //     // this.calcDiscValue();
  // // //     //this.formData.DiscV =  this.formData.DISC / this.formData.Qty;


  // // //     this.formData.ItmSaleTax = this.formData.ItemSaleTaxRatio * this.formData.Price / 100 ;
  // // //     this.formData.DetTaxSal = this.formData.ItmSaleTax * 0;
  // // //     this.formData.DiscV =  this.formData.DiscV


  // // //     console.log(this.formData.DiscV , "this.formData.DiscV");
  // // //     // this.formData.DiscRatio =  parseFloat((this.formData.DiscRatio / this.formData.Tot * 100).toFixed(2));

  // // //     this.servStockService.getStockItems_By_ItemId(this.StoreId, this.selectedItem.ItemID, false).subscribe(
  // // //       res => {
  // // //         this.storeItemsStock = res;
  // // //         if (this.storeItemsStock[0] == undefined)
  // // //           this.formData.AvailableQty = 0;
  // // //         else
  // // //           this.formData.AvailableQty = this.storeItemsStock[0].Qty;
  // // //         //setTimeout(() => this.inputEl.nativeElement.focus());
  // // //         //this.inputEl.nativeElement.focus();
  // // //         //console.log(this.inputEl.nativeElement);
  // // //         //this.txtArea.find((item, idx) => {
  // // //         //  return idx === 0;
  // // //         //}).nativeElement.focus();


  // // //       });

  // // //   }
  // // //   this.UpdateTotal();
  // // // }

  // // // UpdateTotal() {


  // // //   console.log(this.formData.Price);
  // // //   if ( this.formData.Price === undefined || this.formData.Price == null || this.formData.Price.toString().length <= 0 )
  // // //     this.formData.Price = 0;

  // // //   this.formData.Tot = parseFloat((this.formData.Price * this.formData.Qty).toFixed(4));

  // // //   this.formData.ItmSaleTax = parseFloat((this.formData.ItemSaleTaxRatio * (this.formData.Price - this.formData.DiscV ) / 100).toFixed(4));
  // // //   this.formData.DetTaxSal = parseFloat((this.formData.ItmSaleTax * this.formData.Qty).toFixed(4));
  // // //   this.formData.DISC = parseFloat((this.formData.Tot * this.formData.DiscRatio / 100).toFixed(4));
  // // //   // this.formData.DiscV = parseFloat(( this.formData.DISC / this.formData.Qty).toFixed(4))
  // // //   this.calcDiscValue()
  // // // }

  // // // calcDiscValue() {
  // // //   this.formData.DISC = parseFloat((this.formData.Tot * this.formData.DiscRatio / 100).toFixed(2));

  // // //   console.log(this.formData.DISC  ,'this.formData.DISC ')
  // // //   // this.formData.SellingVal = parseFloat((this.formData.Tot - this.formData.DISC + this.formData.DetTaxSal).toFixed(2));
  // // // }

  // // // calcDiscRatio() {
  // // //   this.formData.DiscRatio = parseFloat((this.formData.DiscRatio / this.formData.Tot * 100).toFixed(2));

  // // //   console.log( this.formData.DiscRatio  ,'this.formData.DiscRatio ')
  // // //   // this.formData.SellingVal = parseFloat((this.formData.Tot - this.formData.DISC  + this.formData.DetTaxSal).toFixed(2));

  // // // }


  // // // calcDiscValue() {


  // // //   this.formData.DISC = parseFloat((this.formData.Tot * this.formData.DiscRatio / 100).toFixed(2)); //8


  // // //   this.formData.DiscV = parseFloat(( this.formData.DISC / this.formData.Qty).toFixed(2)) //4


  // // //   this.UpdateTotal();
  // // //   // this.formData.ItmSaleTax = parseFloat((this.formData.ItemSaleTaxRatio * (this.formData.Price - this.formData.DiscV ) / 100).toFixed(2));  //2.24
  // // //   // this.formData.DetTaxSal = parseFloat((this.formData.ItmSaleTax * this.formData.Qty).toFixed(2)); //4.48
  // // //   // this.formData.SellingVal = parseFloat((this.formData.SellingTot - this.formData.SellingDisc + this.formData.SaleTax).toFixed(2));
  // // // }

  // // // calcDiscRatio() {

  // // //   this.formData.DiscRatio = parseFloat((this.formData.DiscRatio / this.formData.Tot * 100).toFixed(2));

  // // //   // this.formData.DiscRatio = Math.floor(this.formData.DiscRatio / this.formData.Tot * 100);
  // // //   // this.formData.SellingVal = parseFloat((this.formData.SellingTot - this.formData.SellingDisc  + this.formData.SaleTax).toFixed(2));

  // // // }


}


