import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';
import { DatePipe } from '@angular/common';
import { ItemPriceModel } from 'src/app/shared/Models/item-price-model';
import * as moment from 'moment';
@Component({
  selector: 'app-change-item-price',
  templateUrl: './change-item-price.component.html',
  styleUrls: ['./change-item-price.component.css']
})
export class ChangeItemPriceComponent implements OnInit {

  term: string;

  ItemsList: Item[];
  // ItemsListS: ItemPriceModel[];

  // today = new Date();
  // endDate = new Date(new Date().setDate(new Date().getDate() + 7));

  currentIndex = -1;
  page: number = 0;
  count: number = 0;
  pageSize: number = 100000;
  pageSizes = [10, 20, 30,40,50];
  title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;
  // flag:boolean= false;

  // diff:number

  constructor(public ItemServ: ItemService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute , public datepipe: DatePipe) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {

  //       this.getItems();

  //     }
  //   });
  }
  ngOnInit() {
  //   let pageNo = localStorage.getItem("itemspage")
  //   this.page=+pageNo
  //   this.resetForm();


  this.getItems();






  //   // let num = 3266.5390
  //   // console.log(num.toFixed(1) , 'm') // answer will be 3266.54// 2.- round "original" to 1 decimal

  //   // var original=28.413
  //   // var result = Math.ceil(original * 10) / 10  //returns 28.5
  //   // console.log(result , 'n')

  }

  ApplyChangePrice(id:number , itemSalePrice:number, ratio:number){
  //   console.log(id , ratio , itemSalePrice ,'id' )

  //   // this.ItemServ.formData.itemupdateprice = this.ItemServ.formData.ItemSalePrice + (ratio *  this.ItemServ.formData.ItemSalePrice /100 );
  //   this.ItemServ.formData.itemupdateprice = parseFloat(( itemSalePrice + (ratio *  itemSalePrice / 100 )).toFixed(2));
  //   // this.ItemServ.formData.UpdatePriceDate =  this.ItemServ.formData.UpdatePriceDate;
  //   // console.log(this.ItemServ.formData.itemupdateprice ,'this.ItemServ.formData.itemupdateprice' )

  }

  // numDaysBetweenDates(startDate, endDate) {
  //   let millisecondsPerDay = 24 * 60 * 60 * 1000;
  //   return (endDate - startDate) / millisecondsPerDay;
  // }

  ApplyAllChangePrice(ratio:number){

  //   for (var product of this.ItemsList) {
  //     // console.log(ratio,'ratio')
  //     // console.log(this.ItemsList,'  this.ItemsList')
  //     // console.log(product.ItemSalePrice ,'this.ItemServ.formData.ItemSalePrice')

  //     product.itemupdateprice =  parseFloat((  product.ItemSalePrice + ( ratio *  product.ItemSalePrice / 100 )).toFixed(2));
  //     product.itemupdateprice = Math.ceil(product.itemupdateprice * 10) / 10;
  //     // this.ItemsList.forEach( res =>
  //     //   {
  //     //     this.ItemServ.formData.UpdatePriceDate= product.UpdatePriceDate;
  //     //    console.log(this.ItemServ.formData.UpdatePriceDate,' this.ItemServ.formData.UpdatePriceDate ')
  //     //    var date1 = new Date(this.ItemServ.formData.UpdatePriceDate);
  //     //    var date2 = new Date("07/30/2019");
  //     //    var Time = this.today.getTime() - date1. getTime();
  //     //    var Days = Time / (1000 * 3600 * 24); //Diference in Days.
  //     //    console.log(date1 , 'date1')

  //     //    console.log(Days , 'm')

  //     //   })

  //     // this.ItemServ.formData.itemupdateprice = product.itemupdateprice;
  //     // this.ItemServ.formData.ItemID = product.ItemID;
  //     // this.ItemServ.formData.ItemName = product.ItemName;
  //     // this.ItemServ.formData.ItemSalePrice = product.ItemSalePrice;
  //     // this.ItemServ.formData.UnitId = product.UnitId;
  //     // this.ItemServ.formData.TaxTypeID = product.TaxTypeID;
  //     // this.ItemServ.formData.codeType = product.codeType;
  //     // this.ItemServ.formData.GroupID = product.GroupID;
  //     // this.ItemServ.formData.GS1Code = product.GS1Code;
  //     // this.ItemServ.formData.EGSCode = product.EGSCode;
  //     // this.ItemServ.formData.ItemTaxTypes = product.ItemTaxTypes;
  //     // console.log(  product.itemupdateprice ,'  product.itemupdateprice ')

  //     // console.log( this.ItemServ.formData.itemupdateprice , ' this.ItemServ.formData.itemupdateprice')

  //     // var testDate  = new Date(this.ItemServ.formData.UpdatePriceDate);
  //     // testDate.setDate(testDate.getDate() + 7);
  //     // let latest_date = this.datepipe.transform(testDate, 'yyyy-MM-dd');
  //     // console.log(testDate,'testDate')

  //     // console.log(this.ItemServ.formData.UpdatePriceDate , 'this.ItemServ.formData.UpdatePriceDate')

  //     // console.log(latest_date,'latest_date')

  //   //   if ( latest_date >= this.ItemServ.formData.UpdatePriceDate.toString() ){
  //   //     console.log(this.ItemServ.formData.UpdatePriceDate , 'this.ItemServ.formData.UpdatePriceDate')

  //   //     console.log(latest_date,'latest_date')

  //   //      this.flag = true
  //   //   }
  //   //   else {

  //   //     this.flag = false
  //   //   }

  //   // console.log(this.flag , 'flag')

  //   }


  }

  putChange(itemId:number){

   console.log(itemId,"itemId")
   this.router.navigate(['/Item/edit/' + itemId]);


  //   console.log(this.ItemsList , '8')



  //   this.ItemServ.putItemPriceList(this.ItemsList).subscribe(
  //     res => {
  //       console.log(res,'res')
  //       this.showSuccess();
  //       this.getItems();
  //       // this.resetForm();

  //     },

  //     err => { console.log(err); this.showError(); }
  //   )

  //   console.log(this.ItemsList , '9')
  }


  getItems() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

      this.ItemServ.getItemsList(params).subscribe(res => {
        this.ItemsList = res.data;
        this.count = res.recordsTotal;
      },
        err => { console.log(err); });
  }

  // getItems() {


  //   const params = this.getRequestParams(this.term, this.page, this.pageSize);

  //     this.ItemServ.getItemsPriceList(params).subscribe(res => {

  //       const { TotalRecords, Data } = res;
  //       this.ItemsList = res;

  //        this.ItemsList.filter( res =>{
  //         console.log(res , ' res')
  //          var given = moment(res.UpdatePriceDate, "YYYY-MM-DD");
  //          var current = moment().startOf('day');

  //          this.diff =  Math.floor( moment.duration(current.diff(given)).asDays() / 86400000);
  //          console.log(  this.diff , 'diff')

  //           if(this.diff >= 0 && this.diff < 8 ){
  //             this.flag = true

  //           }
  //           else if(this.diff == NaN || this.diff > 7){

  //             this.flag = false
  //           }

  //           // console.log(arr , 'arr')
  //       }

  //         // if(+res.UpdatePriceDate != null  && res.UpdatePriceDate != '' && +res.UpdatePriceDate != undefined){

  //         //   var given = moment(res.UpdatePriceDate, "YYYY-MM-DD");
  //         //   var current = moment().startOf('day');

  //         //   //Difference in number of days
  //         //   // moment.duration(current.diff(given)).asDays();
  //         //   // console.log(  moment.duration(current.diff(given)).asDays() , 'n')

  //         //   if(given != null  && given != undefined ){

  //         //     this.diff =  Math.floor( moment.duration(current.diff(given)).asDays() / 86400000);
  //         //     console.log(  this.diff , 'diff')


  //         //     if(this.diff >= 0 && this.diff < 8 ){
  //         //       this.flag = true

  //         //     }
  //         //     else if(this.diff == NaN || this.diff > 7){

  //         //       this.flag = false
  //         //     }

  //         //    console.log(  this.flag , ' this.flag ')

  //         //   }

  //         // }
  //         // console.log(  res, ' res.UpdatePriceDate')
  //       )






  //       // this.ItemsListS =  this.ItemsList
  //       this.count = this.ItemsList.length;
  //       console.log( this.count , 'this.count')
  //       console.log( res , 'this.res')


  //     },
  //       err => { console.log(err); });
  // }

  // showSuccess() {
  //   this.toastr.success('تم حفظ الصنف', 'الاصناف');
  // }

  // showError() {
  //   this.toastr.error('خطأ فى حفظ الصنف', 'الاصناف');
  // }




  // // nextweek(){
  // //   var today = new Date();
  // //   var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
  // //   console.log(nextweek , 'nextweek')
  // //   return nextweek;
  // // }



  // resetForm(form?: NgForm) {
  //     if (form != null)
  //       form.form.reset();
  //     this.ItemServ.formData = {
  //       ItemID: -1,
  //       ItemNO: null,
  //       ItemName: '',
  //       ItemSalePrice: null,
  //       DollarPrice:null,
  //       UnitId: null,
  //       UnitName: '',
  //       ItemNote1: '',
  //       ItemNote2: '',
  //       CompanyName: '',
  //       AvailableQty: null,
  //       GroupID:null,
  //       ItmTaxRatio:null,
  //       TaxTypeID:null,
  //       GS1Code :'',
  //       EGSCode :'',
  //       RequestId :'',
  //       codeType:'',
  //       parentCode:'',
  //       activeFrom:'',
  //       activeTo:'',
  //       UpdatePriceDate:'',
  //       itemupdateRatioprice:0,
  //       itemupdateprice:null,
  //       ItemTaxTypes:[],
  //     // isSelected :false,

  //     }

  //     this.ItemServ.GetMaxItemNo().subscribe(res =>
  //      {
  //        this.ItemServ.formData.ItemNO = res ;
  //      }


  //      );
  // }

  // openForEdit(itemId: number) {
  //   this.router.navigate(['/Items/edit/' + itemId]);
  // }

  // onOrderDelete(ItemIndex: number, ItemId: number) {
  //   if (confirm("هل انت متأكد من حذف هذا الصنف")) {
  //     this.ItemServ.deleteItem(ItemId).subscribe(
  //       res => {
  //         this.showDeleted();
  //         this.ItemsList.splice(ItemIndex, 1);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }


  // showDeleted() {
  //   this.toastr.info('تم حذف الصنف', 'الاصناف');
  // }



  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params['SearchString'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  // handlePageChange(event) {
  //   this.page = event;
  //   localStorage.setItem( "itemspage", event)
  //   this.getItems();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getItems();
  // }
}
