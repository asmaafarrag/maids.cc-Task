import { Item } from './../shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';
import { ItemPriceModel } from 'src/app/shared/Models/item-price-model';
import { ExcelService } from './../shared/Services/excel/excel.service';
import { SalesSaleInvService } from './../shared/Services/sales-sale-inv.service';
import { SalesSaleInv , SalesSaleInvDet} from './../shared/Models/sales-sale-inv';
import * as XLSX from 'xlsx';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-invoice-excel',
  templateUrl: './invoice-excel.component.html',
  styleUrls: ['./invoice-excel.component.css']
})
export class InvoiceExcelComponent implements OnInit {


  data:  ItemPriceModel[];
  ItemList:ItemPriceModel[];
  itemslist:ItemPriceModel[];
  Loadend:boolean=false;
  dataSheet = new Subject();
  UserID: string;
  UserType: string;
  EmpID: string;
  y :number = 1 ;
  list : Item[] = []
  isEnabled: boolean = true;
  itemID:number;
  item_Price_ID
  item_PriceList=[]
  constructor(private toastr: ToastrService,private ExcelServ: ExcelService , public ItemServ: ItemService,
    public datepipe: DatePipe , public router:Router ,  public currentRoute: ActivatedRoute) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
    this.EmpID = localStorage.getItem('EmpID');

    this.resetForm()
   }

  ngOnInit(): void {

    let InvId = this.currentRoute.snapshot.paramMap.get('id')
    this.itemID = +this.currentRoute.snapshot.paramMap.get('id')
    this.resetForm();

    if (InvId != null)
    this.populateForm(parseInt(InvId));
  }


  populateForm(InvId: number) {


    this.ItemServ.getItemWPriceById(InvId).subscribe(res =>
      {
        this.ItemServ.formData = res;

        this.itemslist = res.itemPrices;

        console.log(res,"res")

        console.log( this.itemslist," this.itemslist")



        this.itemslist.forEach((c) => {
          this.item_Price_ID =  c.item_Price_ID;
          this.item_PriceList.push(c.item_Price_ID)
          console.log( this.item_PriceList ," item_PriceList")
          console.log(this.item_Price_ID , "item_Price_ID")
        });

        // this.range = new Array(Math.floor(res.columns_Count)).fill(0).map((i,x) => (x * res.opening_Step) + res.opening_StartValue);
        // console.log(this.range,'r');

        // this.imageUrl = this.servItem.formData.ComplainImage;

      } );





  }


  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);

    // console.log(target ,"target")

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      // console.log(bstr , 'bstr');


      const wb: XLSX.WorkBook = XLSX.read(bstr,

        { type: 'binary' ,
          cellDates: true,
          cellNF: false,
          cellText: false,
          // dateNF: 'dd/mm/yyyy',
          raw: false
          // dateNF: 'dd/mmm/yyyy;@'
        });
      // console.log(wb.Workbook.Sheets.length , 'wb');



      // if (wb.Workbook.Sheets.length == 1)
      // {


      //   console.log("1")

      const wsname : string = wb.SheetNames[0];
      // console.log(wsname , 'Sheet');

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log(ws , "ws");

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 , raw: false,dateNF:'yyyy-mm-dd'}));

      // console.log(this.data);

      let x = this.data.slice(1);

      console.log(x);

      // console.log(x[0][1]);

      // for (var product of  x )
      // {
      //   // let i = 1;
      //   // console.log(product, "product")

      //   // console.log(product[i], "product")

      //   this.servSaleInv.formData.SellingNo = product[1];
      //   // this.servSaleInv.formData.SellingDate = product[2];
      //   this.servSaleInv.formData.CustomerID = product[2];
      //   this.servSaleInv.formData.BranchId = product[3];
      //   // this.servSaleInv.formData.StoreId = product[4];
      //   this.servSaleInv.formData.CurrId = product[4];


      //   this.servSaleInv.formData.SellingTot = product[5];
      //   this.servSaleInv.formData.SellingDisc = product[6];

      //   this.servSaleInv.formData.SaleTax = product[7];
      //   this.servSaleInv.formData.TaxGainCom = product[8];


      //   this.servSaleInv.formData.DiscValueExt = product[9];
      //   this.servSaleInv.formData.SellingVal = product[10];



      //   let sdt = new  SalesSaleInvDet;

      //     sdt.ItemId = product[11];
      //     sdt.ItemName = product[12];
      //     sdt.Qty = product[13];
      //     sdt.UnitId = product[14];
      //     sdt.Price = product[15];
      //     sdt.Tot = product[16];
      //     sdt.DISC = product[17];



      //     // console.log(  sdt, " sdt" );

      //     this.servSaleInv.formData.saleInvItems.push(sdt);
      //     // console.log(   this.servSaleInv.formData.SaleTax, "   this.servSaleInv.formData.SaleTax")
      //     // console.log(   this.servSaleInv.formData.CustomerID , "   this.servSaleInv.formData.CustomerID")

      //     // console.log(  this.servSaleInv.formData.saleInvItems, ' this.formData.SellingDetTaxTypes')
      // }


      var SellingNoCurr :string;
      let newInv : Item;
      let newsaleInvItems : ItemPriceModel[] = [];
      for (let i = 0 ; i < x.length ; i++){

        // if(i == 0)
        // {
        //   newInv = new Item;
        //   newsaleInvItems  = [];
        //   SellingNoCurr = x[i][1];
        // }
        // else
        // {
        //   if (SellingNoCurr != x[i][1] )
        //   {
        //     SellingNoCurr = x[i][1]

        //     newInv.itemPrices = newsaleInvItems;
        //     this.list.push(newInv);

        //     newInv = new Item;
        //     newsaleInvItems  = [];
        //   }
        // }
        // console.log(x.length , i , "x.length ")
        // console.log(x[0] , "x[0]")
        // let y =  1;

        // for (let y = 1 ; y > i ;)
        // {
        //  console.log("yes" , y , i)
        // this.y = i;

          // if(x[i][1] == x[this.y][1]){
            // i = --i;
            // // console.log(x[i][1] , x[++i][1] )
            // console.log("yes" ,i, this.y  )

          // newInv.SellingNo = x[i][1];
          //   console.log( this.servSaleInv.formData.SellingNo ," this.servSaleInv.formData.SellingNo")

          // // newInv.SellingDate  =  x[i][2].toISOString();
          // newInv.SellingDate = this.datepipe.transform(x[i][2], 'yyyy-MM-dd')
          //   console.log( this.servSaleInv.formData.SellingDate ," this.servSaleInv.formData.SellingDate")

          // newInv.CustomerID =  x[i][3];
          //   console.log( this.servSaleInv.formData.CustomerID ," this.servSaleInv.formData.CustomerID")

          // // newInv.BranchId =  x[i][4];
          // //   console.log( this.servSaleInv.formData.BranchId ," this.servSaleInv.formData.BranchId")

          // newInv.CurrId =  x[i][4];
          //   console.log( this.servSaleInv.formData.CurrId ," this.servSaleInv.formData.CurrId")


          // if ( x[i][5] == undefined || x[i][5] == null || x[i][5] == 'FALSE'  || x[i][5] == 'False'){

          //   newInv.HasTaxGainCom = false;
          //   console.log( this.servSaleInv.formData.HasTaxGainCom ," this.servSaleInv.formData.HasTaxGainCom")

          // }

          // else if ( x[i][5] == 'TRUE' || x[i][5] == 'True' || x[i][5] == 'true' ){
          //   newInv.HasTaxGainCom =  true;
          //   console.log( this.servSaleInv.formData.HasTaxGainCom ," this.servSaleInv.formData.HasTaxGainCom")

          // }

          // newInv.SellingTot = x[i][6];
          //   console.log( this.servSaleInv.formData.SellingTot ," this.servSaleInv.formData.SellingTot")

          // newInv.SellingDisc = x[i][7];
          //   console.log( this.servSaleInv.formData.SellingDisc ," this.servSaleInv.formData.SellingDisc")

          // newInv.SaleTax = x[i][8];
          //   console.log( this.servSaleInv.formData.SaleTax ," this.servSaleInv.formData.SaleTax")

          // newInv.TaxGainCom = x[i][9];
          //   console.log( this.servSaleInv.formData.TaxGainCom ," this.servSaleInv.formData.TaxGainCom")

          // newInv.DiscValueExt = x[i][10];
          //   console.log( this.servSaleInv.formData.DiscValueExt ," this.servSaleInv.formData.DiscValueExt")

          // newInv.SellingVal = x[i][11];
          //   console.log( this.servSaleInv.formData.SellingVal ," this.servSaleInv.formData.SellingVal")

            let sdt = new  ItemPriceModel;
            // ItemBarCode





                  sdt.item_ID = this.itemID;


                  sdt.item_Price_ID = this.item_PriceList[i]
                  console.log(   sdt.item_Price_ID ,"  sdt.item_Price_ID")

                  sdt.item_Price_Width = +x[i][1];
                  console.log(  sdt.item_Price_Width ,"  sdt.item_Price_Width")


                  sdt.price_Col_1 = +x[i][2];
                  console.log(  sdt.price_Col_1 ,"  sdt.price_Col_1")

                  sdt.price_Col_2 = +x[i][3];
                  console.log(  sdt.price_Col_2 ,"  sdt.price_Col_2")

                  sdt.price_Col_3 = +x[i][4];
                  console.log(  sdt.price_Col_3 ,"  sdt.price_Col_3")

                  sdt.price_Col_4 = +x[i][5];
                  console.log(  sdt.price_Col_4 ,"  sdt.price_Col_4")

                  sdt.price_Col_5 = +x[i][6];
                  console.log(  sdt.price_Col_5 ,"  sdt.price_Col_5")


                  sdt.price_Col_6 = +x[i][7];
                  console.log(  sdt.price_Col_6 ,"  sdt.price_Col_6")

                  sdt.price_Col_7 = +x[i][8];
                  console.log(  sdt.price_Col_7 ,"  sdt.price_Col_7")

                  sdt.price_Col_8 = +x[i][9];
                  console.log(  sdt.price_Col_8 ,"  sdt.price_Col_8")

                  sdt.price_Col_9 = +x[i][10];
                  console.log(  sdt.price_Col_9 ,"  sdt.price_Col_9")

                  sdt.price_Col_10 = +x[i][11];
                  console.log(  sdt.price_Col_10 ,"  sdt.price_Col_10")

                  sdt.price_Col_11 = +x[i][12];
                  console.log(  sdt.price_Col_11 ,"  sdt.price_Col_11")


                  sdt.price_Col_12 = +x[i][13];
                  console.log(  sdt.price_Col_12 ,"  sdt.price_Col_12")

                  sdt.price_Col_13 = +x[i][14];
                  console.log(  sdt.price_Col_13 ,"  sdt.price_Col_13")


                  sdt.price_Col_14 = +x[i][15];
                  console.log(  sdt.price_Col_14 ,"  sdt.price_Col_14")

                  sdt.price_Col_15 = +x[i][16];
                  console.log(  sdt.price_Col_15 ,"  sdt.price_Col_15")

                  sdt.price_Col_16 = +x[i][17];
                  console.log(  sdt.price_Col_16 ,"  sdt.price_Col_16")

                  sdt.price_Col_17 = +x[i][18];
                  console.log(  sdt.price_Col_17 ,"  sdt.price_Col_17")


                  sdt.price_Col_18 = +x[i][19];
                  console.log(  sdt.price_Col_18 ,"  sdt.price_Col_18")


                  sdt.price_Col_19 = +x[i][20];
                  console.log(  sdt.price_Col_19 ,"  sdt.price_Col_19")

                  sdt.price_Col_20 = +x[i][21];
                  console.log(  sdt.price_Col_20 ,"  sdt.price_Col_20")

                  sdt.price_Col_21 = +x[i][22];
                  console.log(  sdt.price_Col_21 ,"  sdt.price_Col_21")


                  sdt.price_Col_22 = +x[i][23];
                  console.log(  sdt.price_Col_22 ,"  sdt.price_Col_22")


                  // if(+x[i][4]){
                  //   sdt.price_Col_3 = +x[i][4];
                  //   console.log(  sdt.price_Col_3 ,"  sdt.price_Col_3")
                  // }

                  // else{
                  //   sdt.price_Col_3 = 0
                  // }


                  // if(+x[i][5]){
                  //   sdt.price_Col_4 = +x[i][5];
                  //   console.log(  sdt.price_Col_4 ,"  sdt.price_Col_4")
                  // }

                  // else{
                  //   sdt.price_Col_4 = 0
                  // }


                  // if(+x[i][6]){
                  //   sdt.price_Col_5 = +x[i][6];
                  //   console.log(  sdt.price_Col_5 ,"  sdt.price_Col_5")
                  // }

                  // else{
                  //   sdt.price_Col_5 = 0
                  // }



                  // if(+x[i][7]){
                  //   sdt.price_Col_6 = +x[i][7];
                  // console.log(  sdt.price_Col_6 ,"  sdt.price_Col_6")
                  // }

                  // else{
                  //   sdt.price_Col_6 = 0
                  // }


                  // if(+x[i][8]){
                  //   sdt.price_Col_7 = +x[i][8];
                  //   console.log(  sdt.price_Col_7 ,"  sdt.price_Col_7")
                  // }

                  // else{
                  //   sdt.price_Col_7 = 0
                  // }


                  // if(+x[i][9]){
                  //   sdt.price_Col_8 = +x[i][9];
                  //   console.log(  sdt.price_Col_8 ,"  sdt.price_Col_8")

                  // }

                  // else{
                  //   sdt.price_Col_8 = 0
                  // }





                  // if(+x[i][10]){
                  //   sdt.price_Col_9 = +x[i][10];
                  //   console.log(  sdt.price_Col_9 ,"  sdt.price_Col_9")

                  // }

                  // else{
                  //   sdt.price_Col_9 = 0
                  // }





                  // if(+x[i][11]){
                  //   sdt.price_Col_10 = +x[i][11];
                  // console.log(  sdt.price_Col_10 ,"  sdt.price_Col_10")

                  // }

                  // else{
                  //   sdt.price_Col_10 = 0
                  // }





                  // if(+x[i][12]){
                  //   sdt.price_Col_11 = +x[i][12];
                  //   console.log(  sdt.price_Col_11 ,"  sdt.price_Col_11")

                  // }

                  // else{
                  //   sdt.price_Col_11 = 0
                  // }






                  // if(+x[i][13]){
                  //   sdt.price_Col_12 = +x[i][13];
                  // console.log(  sdt.price_Col_12 ,"  sdt.price_Col_12")

                  // }

                  // else{
                  //   sdt.price_Col_12 = 0
                  // }



                  // if(+x[i][14]){
                  //   sdt.price_Col_13 = +x[i][14];
                  // console.log(  sdt.price_Col_13 ,"  sdt.price_Col_13")
                  // }

                  // else{
                  //   sdt.price_Col_13 = 0
                  // }




                  // if(+x[i][15]){
                  //   sdt.price_Col_14 = +x[i][15];
                  //   console.log(  sdt.price_Col_14 ,"  sdt.price_Col_14")

                  // }

                  // else{
                  //   sdt.price_Col_14 = 0
                  // }



                  // if(+x[i][16]){
                  //   sdt.price_Col_15 = +x[i][16];
                  //   console.log(  sdt.price_Col_15 ,"  sdt.price_Col_15")
                  // }

                  // else{
                  //   sdt.price_Col_15 = 0
                  // }


                  // if(+x[i][17]){
                  //   sdt.price_Col_16 = +x[i][17];
                  //   console.log(  sdt.price_Col_16 ,"  sdt.price_Col_16")
                  // }

                  // else{
                  //   sdt.price_Col_16 = 0
                  // }


                  // if(+x[i][18]){
                  //   sdt.price_Col_17 = +x[i][18];
                  //   console.log(  sdt.price_Col_17 ,"  sdt.price_Col_17")
                  // }

                  // else{
                  //   sdt.price_Col_17 = 0
                  // }


                  // if(+x[i][19]){
                  //   sdt.price_Col_18 = +x[i][19];
                  // console.log(  sdt.price_Col_18 ,"  sdt.price_Col_18")
                  // }

                  // else{
                  //   sdt.price_Col_18 = 0
                  // }


                  // if(+x[i][20]){
                  //   sdt.price_Col_19 = +x[i][20];
                  //   console.log(  sdt.price_Col_19 ,"  sdt.price_Col_19")

                  // }

                  // else{
                  //   sdt.price_Col_19 = 0
                  // }


                  // if(+x[i][21]){
                  //   sdt.price_Col_20 = +x[i][21];
                  //   console.log(  sdt.price_Col_20 ,"  sdt.price_Col_20")
                  // }

                  // else{
                  //   sdt.price_Col_20 = 0
                  // }



                  // if(+x[i][22]){
                  //   sdt.price_Col_21 = +x[i][22];
                  // console.log(  sdt.price_Col_21 ,"  sdt.price_Col_21")
                  // }

                  // else{
                  //   sdt.price_Col_21 = 0
                  // }



                  // if(+x[i][23]){
                  //   sdt.price_Col_22 = +x[i][23];
                  //   console.log(  sdt.price_Col_22 ,"  sdt.price_Col_22")
                  // }

                  // else{
                  //   sdt.price_Col_22 = 0
                  // }




                  // sdt.ItemName = x[i][13];
                  // console.log(  sdt.ItemName ,"  sdt.ItemName")

                  // sdt.Qty = x[i][7];
                  // console.log(  sdt.Qty ,"  sdt.Qty")

                  // // sdt.UnitId = x[i][15];
                  // // console.log(  sdt.UnitId ,"  sdt.UnitId")

                  // sdt.Price = x[i][8];
                  // console.log(  sdt.Price ,"  sdt.Price")

                  // // sdt.Tot = x[i][17];
                  // // console.log(  sdt.Tot ,"  sdt.Tot")

                  // sdt.DISC = x[i][9];
                  // console.log(  sdt.DISC ,"  sdt.DISC")


                  console.log(  sdt, " sdt" );
                  newsaleInvItems.push(sdt);
               //newInv.saleInvItems.push(sdt);
            //   if(i == 0)
            //   {
            //   SellingNoCurr = newInv.SellingNo;
            //     }
            //  else {
            //   if (SellingNoCurr != newInv.SellingNo  )
            //   {
            //     SellingNoCurr = newInv.SellingNo

            //     this.list.push(newInv);
            //   }
            //  }

          // }

          // else if(x[i][1] != x[this.y][1]  ) {


          //   console.log("NO" ,i, this.y  );

          //   this.servSaleInv.formData.SellingNo = x[i][1];
          //   console.log( this.servSaleInv.formData.SellingNo ," this.servSaleInv.formData.SellingNo")
          //   this.servSaleInv.formData.CustomerID =  x[i][2];
          //   console.log( this.servSaleInv.formData.CustomerID ," this.servSaleInv.formData.CustomerID")

          //   this.servSaleInv.formData.BranchId =  x[i][3];
          //   console.log( this.servSaleInv.formData.BranchId ," this.servSaleInv.formData.BranchId")

          //   this.servSaleInv.formData.CurrId =  x[i][4];
          //   console.log( this.servSaleInv.formData.CurrId ," this.servSaleInv.formData.CurrId")

          //   this.servSaleInv.formData.SellingTot = x[i][5];
          //   console.log( this.servSaleInv.formData.SellingTot ," this.servSaleInv.formData.SellingTot")

          //   this.servSaleInv.formData.SellingDisc = x[i][6];
          //   console.log( this.servSaleInv.formData.SellingDisc ," this.servSaleInv.formData.SellingDisc")

          //   this.servSaleInv.formData.SaleTax = x[i][7];
          //   console.log( this.servSaleInv.formData.SaleTax ," this.servSaleInv.formData.SaleTax")

          //   this.servSaleInv.formData.TaxGainCom = x[i][8];
          //   console.log( this.servSaleInv.formData.TaxGainCom ," this.servSaleInv.formData.TaxGainCom")

          //   this.servSaleInv.formData.DiscValueExt = x[i][9];
          //   console.log( this.servSaleInv.formData.DiscValueExt ," this.servSaleInv.formData.DiscValueExt")

          //   this.servSaleInv.formData.SellingVal = x[i][10];
          //   console.log( this.servSaleInv.formData.SellingVal ," this.servSaleInv.formData.SellingVal")

          //   let sdt = new  SalesSaleInvDet;

          //         sdt.ItemId = x[i][11];
          //         console.log(  sdt.ItemId ,"  sdt.ItemId")

          //         sdt.ItemName = x[i][12];
          //         console.log(  sdt.ItemName ,"  sdt.ItemName")

          //         sdt.Qty = x[i][13];
          //         console.log(  sdt.Qty ,"  sdt.Qty")

          //         sdt.UnitId = x[i][14];
          //         console.log(  sdt.UnitId ,"  sdt.UnitId")

          //         sdt.Price = x[i][15];
          //         console.log(  sdt.Price ,"  sdt.Price")

          //         sdt.Tot = x[i][16];
          //         console.log(  sdt.Tot ,"  sdt.Tot")

          //         sdt.DISC = x[i][17];
          //         console.log(  sdt.DISC ,"  sdt.DISC")

          //         console.log(this.y,"yy")

          //         if(this.y < x.length){

          //           this.y = this.y + 1;

          //           console.log(this.y,"yy")

          //         }


          //         console.log(  sdt, " sdt" );

          //         // if( this.servSaleInv.formData.saleInvItems == null){

          //           this.servSaleInv.formData.saleInvItems.push(sdt);

          //         //  }

          //        console.log(this.servSaleInv.formData ,"this.servSaleInv.formData")

          //        this.list.push( this.servSaleInv.formData);

          //        console.log(  this.list  ,"  this.list ")





          // }


        // }

      }

      // newInv.itemPrices

      this.ItemServ.formData.itemPrices = newsaleInvItems;
      // this.list.push(newInv);
      console.log( this.ItemServ.formData.itemPrices  , "newInv.itemPrices")
      // console.log( this.list , ' this.list')

    //  }




    };

    reader.readAsBinaryString(target.files[0]);

    reader.onloadend = (e) => {
      // this.keys = Object.keys(data[0]);
      // console.log(this.keys,'keys');

      this.dataSheet.next(this.data);
      this.Loadend=true;

    }
  }



  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.ItemServ.formData = {
      item_ID : this.itemID,
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

    this.ItemServ.formData.itemPrices = [];

    // this.servSaleInv.GetMaxSellingsNo().subscribe(res => {
    //   this.servSaleInv.formData.SellingNo = res ;

    //   console.log( this.servSaleInv.formData.SellingNo , 'this.servSaleInv.formData.SellingNo')

    // });


  }


  SendtoAPI()
  {
    console.log(this.ItemList,'in compnent');
    if(this.Loadend == true)
    {


      console.log( this.ItemServ.formData,' this.ItemServ.formData ')
      this.ItemServ.putItemPrices().subscribe(
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
    this.toastr.success('تم ارسال الاكسل', 'الاكسل');
  }

  showError() {
    this.toastr.error('خطأ فى ارسال الاكسل', 'الاكسل');
  }

  Clear(){
    // this.router.navigate(['/ImportClients'])
    this.data  = [];
    this.resetForm();
    this.Loadend=false;

  }

}
