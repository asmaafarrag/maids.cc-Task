import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { SalesSaleInv, SalesSaleInvDet } from '../../shared/Models/sales-sale-inv';

import { Item } from '../../shared/Models/item';
import { Customer } from '../../shared/Models/customer.model';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { SalesSaleInvService } from '../../shared/Services/sales-sale-inv.service'
import { InvoiceLineComponent } from '../invoice-line/invoice-line.component';
import { ToastrService } from 'ngx-toastr';

import { DomSanitizer } from '@angular/platform-browser';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { Branch } from 'src/app/shared/Models/branch';
import { BranchService } from 'src/app/shared/Services/branch.service';
import { Treasury } from 'src/app/shared/Models/treasury';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';
import { Store } from 'src/app/shared/Models/Store';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  // itemslist: Item[];
  // branchlist: Branch[];
  // customerslist: Customer[];
  // treasurylist: Treasury[];

  // selectedItem: Item;
  // selectedCustomer: Customer;
  // selectedBranch: Branch;
  // isValid: boolean = true;
  // custUnderCreditLimit: Boolean = false;
  // isEnabled: boolean = true;
  // storeslist:Store[];
  // UserID: string;
  // UserType: string;
  // EmpID: string;


  // today: Date = new Date();
  // ItemsCount: number = 0;
  // alignmentCenter: Alignment = 'center';
  // alignmentRight: Alignment = 'right';
  // alignmentLeft: Alignment = 'left'

  // qrdata = 'http://einvoice.minicodeco.com//Invoice/edit/'; //code
  // fileUrl;

  // constructor(private servStockService: ServStockService, public servSaleInv: SalesSaleInvService, public BranchServ: BranchService
  //   , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router
  //   , private sanitizer: DomSanitizer  , private treasuryServ: TreasuryService) {
  //   this.UserType = localStorage.getItem('UserType');
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.EmpID = localStorage.getItem('EmpID');
  // }



  ngOnInit() {
    // let saleInvId = this.currentRoute.snapshot.paramMap.get('id')

    // this.getCustomers();
    // this.getBranch();
    // this.getStores();
    // this.getTreasury();
    // this.resetForm();

    // if (saleInvId != null) {
    //   this.populateForm(parseInt(saleInvId));

    //   // this.myAngularxQrCode = 'Your QR code data string';
    //   this.qrdata = 'http://einvoice.minicodeco.com/Invoice/edit/' + saleInvId;
    //   const data = 'QR'; // txt
    //   const blob = new Blob([data], { type: 'application/octet-stream' });

    //   // saves the text from qr
    //   this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //     window.URL.createObjectURL(blob)
    //   );
    // }
    // //today.setDate(today.getDate() - 30);
    // //this.fromDate.patchValue(today);
  }



  // getCustomers() {
  //     this.servStockService.getCustomers().subscribe(res => this.customerslist = res);

  // }



  // getStores() {
  //     this.servStockService.getStores().subscribe(res => this.storeslist = res);


  // }


  // getBranch() {
  //   this.BranchServ.getBranchs().subscribe(res => this.branchlist = res);
  // }

  // getTreasury() {

  //     this.treasuryServ.getTreasurys().subscribe(res => this.treasurylist = res);

  // }

  // // saveAsImage(parent) {
  // //   // fetches base 64 date from image
  // //   const parentElement = parent.el.nativeElement.querySelector('img').src;

  // //   // converts base 64 encoded image to blobData
  // //   let blobData = this.convertBase64ToBlob(parentElement);

  // //   // saves as image
  // //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  // //     //IE
  // //     window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
  // //   } else {
  // //     // chrome
  // //     const blob = new Blob([blobData], { type: 'image/png' });
  // //     const url = window.URL.createObjectURL(blob);
  // //     // window.open(url);
  // //     const link = document.createElement('a');
  // //     link.href = url;
  // //     link.download = 'Qrcode';
  // //     link.click();
  // //   }
  // // }

  // private convertBase64ToBlob(Base64Image: any) {
  //   // SPLIT INTO TWO PARTS
  //   const parts = Base64Image.split(';base64,');
  //   // HOLD THE CONTENT TYPE
  //   const imageType = parts[0].split(':')[1];
  //   // DECODE BASE64 STRING
  //   const decodedData = window.atob(parts[1]);
  //   // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  //   const uInt8Array = new Uint8Array(decodedData.length);
  //   // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  //   for (let i = 0; i < decodedData.length; ++i) {
  //     uInt8Array[i] = decodedData.charCodeAt(i);
  //   }
  //   // RETURN BLOB IMAGE AFTER CONVERSION
  //   return new Blob([uInt8Array], { type: imageType });
  // }


  // populateForm(saleInvId: number) {
  //   this.servSaleInv.getSaleInvById(saleInvId).subscribe(res => {
  //     this.servSaleInv.formData = res;

  //     this.selectedCustomer = new Customer();
  //     this.selectedCustomer.CustomerID = this.servSaleInv.formData.CustomerID;
  //     this.selectedCustomer.CustomerName = this.servSaleInv.formData.CustomerName;

  //     this.calcItemsQty();
  //     if (this.UserType.toUpperCase() != 'ADMIN') {
  //       this.isEnabled = false;
  //     }
  //     //  var datePipe = new DatePipe("en-US");
  //     //let formatedyear = datePipe.transform(this.servSaleInv.formData.SellingDate, 'yyyy-MM-dd');
  //     //this.servSaleInv.formData.SellingDate = formatedyear;
  //     //this.servSaleInv.formData.saleInvItems = res.saleInvItems
  //   });
  // }






  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();
  //   this.servSaleInv.formData = {
  //     SellingId: -1,
  //     SellingName: '',
  //     SellingVal: 0,
  //     SellingDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
  //     SellingNotes: '',
  //     SellingType: '',
  //     CustomerID: 0,
  //     CustomerName: '',
  //     PaidVal: 0,
  //     RemainVal: 0,
  //     SellingDiscRatio: 0,
  //     SellingDisc: 0,
  //     SellingTot: 0,
  //     SellType: '1',
  //     StoreId: 0,
  //     StoreName: '',
  //     SellingNo: null,
  //     TreasuryId: null,
  //     AgentId: 1,
  //     EntryUserId: Number(this.UserID),
  //     EntryUserDate: '',
  //     saleInvItems: [],
  //     isSelected: false,
  //     uuid: '',
  //     longId: '',
  //     BranchId: null,
  //     BranchName: '',
  //     SaleTaxRatio: null,
  //     SaleTax: null,
  //     TotWithoutTax: null
  //   }

  //   this.servSaleInv.formData.saleInvItems = [];
  //   this.servSaleInv.GetMaxSellingsNo().subscribe(res => {
  //     this.servSaleInv.formData.SellingNo = res;

  //   }
  //   );


  // }

  // AddOrEditSalInvItems(orderItemIndex, SellingId) {
  //   if (this.validateForPopUp()) {
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.disableClose = true;
  //     dialogConfig.width = "100%";
  //     var StoreId = this.servSaleInv.formData.StoreId;
  //     dialogConfig.data = { orderItemIndex, SellingId, StoreId };
  //     this.dialog.open(InvoiceLineComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
  //   }
  // }

  // onDeleteSalInvItems(SerNo: number, i: number) {
  //   this.servSaleInv.formData.saleInvItems.splice(i, 1);
  //   this.calcGrandTotal();
  //   this.calcItemsQty();
  // }

  // calcItemsQty() {
  //   let sum: number = 0;
  //   this.servSaleInv.formData.saleInvItems.forEach(a => sum += parseInt(a.Qty.toString()));
  //   this.ItemsCount = sum;
  // }

  // calcDiscValue() {
  //   this.servSaleInv.formData.SellingDisc = parseFloat((this.servSaleInv.formData.SellingTot * this.servSaleInv.formData.SellingDiscRatio / 100).toFixed(2));
  //   this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));
  // }

  // calcDiscRatio() {
  //   this.servSaleInv.formData.SellingDiscRatio = parseFloat((this.servSaleInv.formData.SellingDiscRatio / this.servSaleInv.formData.SellingTot * 100).toFixed(2));
  //   this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));

  // }

  // calcGrandTotal() {
  //   this.servSaleInv.formData.SellingTot = this.servSaleInv.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.Tot }, 0);
  //   this.servSaleInv.formData.SellingTot = parseFloat((this.servSaleInv.formData.SellingTot).toFixed(2));

  //   this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));

  // }

  // onSubmit(form: NgForm) {
  //   if (this.validateForm()) {
  //     this.isEnabled = false;
  //     if (this.servSaleInv.formData.SellingId == -1) {
  //       this.servSaleInv.postSaleInv().subscribe(
  //         res => {
  //           this.showSuccess();
  //           // this.generatePdf();
  //           this.resetForm();
  //           this.isEnabled = true;
  //         },
  //         err => { console.log(err); this.showError(); this.isEnabled = true; }
  //       )
  //     }
  //     else {
  //       this.servSaleInv.putSaleInv().subscribe(
  //         res => {
  //           this.showSuccess();
  //           // this.generatePdf();
  //           //this.resetForm();
  //           this.isEnabled = true;
  //         },
  //         err => { console.log(err); this.showError(); this.isEnabled = true; }
  //       )
  //     }

  //   }
  // }


  // showSuccess() {
  //   this.toastr.success('تم حفظ الفاتورة', 'فاتورة مبيعات');
  // }

  // showError() {
  //   this.toastr.error('خطأ فى حفظ الفاتورة', 'فاتورة مبيعات');
  // }



  // validateForm() {
  //   this.isValid = true;
  //   if (this.servSaleInv.formData.CustomerID == null || this.servSaleInv.formData.CustomerID == 0)
  //     this.isValid = false;

  //   else if (this.servSaleInv.formData.saleInvItems.length == 0)
  //     this.isValid = false;
  //   else if (this.servSaleInv.formData.SellingType == null || this.servSaleInv.formData.SellingType == '')
  //     this.isValid = false;


  //   return this.isValid;
  // }

  // validateForPopUp() {
  //   this.isValid = true;
  //   if (this.servSaleInv.formData.CustomerID == null || this.servSaleInv.formData.CustomerID == 0)
  //     this.isValid = false;

  //   else if (this.servSaleInv.formData.SellingType == null || this.servSaleInv.formData.SellingType == '')
  //     this.isValid = false;
  //   return this.isValid;
  // }

  // setSelectedCustomer(cust) {
  //   this.selectedCustomer = this.customerslist.find(x => x.customerID == cust);


  //   this.servSaleInv.IsUnderCreditLimit(this.servSaleInv.formData.CustomerID).subscribe(res => {
  //     this.custUnderCreditLimit = res;
  //     if (!this.custUnderCreditLimit) {
  //       this.toastr.error('العميل تعدى حد الائتمان', 'فاتورة مبيعات');
  //       this.isValid = false;
  //     }
  //     else {
  //       this.isValid = true;
  //     }
  //   });

  // }


  // setSelectedBranch(res) {
  //   this.selectedBranch = res;
  // }



  // generatePdf() {
  //   //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   const documentDefinition = this.getDocumentDefinition();
  //   //var sum = this.servSaleInv.saleInvItems.reduce((acc, cur) => acc + cur.Qty, 0);
  //   //console.log(sum)


  //   //  pdfMake.createPdf(documentDefinition).print();

  //   // this adds our base64 encoded data to the existing 'virtual file system'
  //   pdfFonts.pdfMake.vfs['GnuMICR_b64'] = strGnuMICR

  //   // you're going to wipe out the standard stuff when you create this
  //   // variable, so we need to add the stock Roboto fonts back in. I
  //   // set all fonts to the same thing, as "italic MICR" would be silly.

  //   pdfMake.createPdf(
  //     documentDefinition,
  //     {},
  //     {
  //       // Default font should still be available
  //       Roboto: {
  //         normal: 'Roboto-Regular.ttf',
  //         bold: 'Roboto-Medium.ttf',
  //         italics: 'Roboto-Italic.ttf',
  //         bolditalics: 'Roboto-Italic.ttf'
  //       },
  //       // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
  //       GnuMICR: {
  //         normal: 'GnuMICR_b64',
  //         bold: 'GnuMICR_b64',
  //         italics: 'GnuMICR_b64',
  //         bolditalics: 'GnuMICR_b64'
  //       }
  //     },
  //     pdfFonts.pdfMake.vfs).print();
  // }


  // getDocumentDefinition() {
  //   sessionStorage.setItem('resume', JSON.stringify(this.servSaleInv.formData));
  //   return {
  //     pageSize: {
  //       width: 445,
  //       height: 615
  //     },
  //     Margins: 0,
  //     footer: (currentPage, pageCount) => {
  //       return {
  //         text: 'Powered by www.MiniCodeCo.com',
  //         alignment: this.alignmentCenter,
  //         fontSize: 6
  //       }
  //     },

  //     content: [

  //       {
  //         text: ('فاتورة رقم ' + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
  //         style: 'header'
  //       },
  //       {

  //         columns: [
  //           {
  //             // auto-sized columns have their widths based on their content
  //             width: '*',
  //             style: 'subheader',
  //             text: ('العميل / ' + this.selectedCustomer.customer_Name).split(" ").reverse().join(" "),
  //             alignment: this.alignmentRight
  //           },

  //           {
  //             // star-sized columns fill the remaining space
  //             // if there's more than one star-column, available width is divided equally
  //             width: 100,
  //             text: '',
  //             alignment: this.alignmentRight
  //           },
  //           {
  //             // fixed width
  //             width: 100,
  //             style: 'subheader',
  //             text: ('التاريخ / ' + this.servSaleInv.formData.SellingDate).split(" ").reverse().join(" ")
  //           }
  //         ],
  //         // optional space between columns
  //         columnGap: 10
  //       },

  //       {
  //         text: 'الاصناف',
  //         style: 'header'
  //       },
  //       this.getEducationObject(this.servSaleInv.formData.saleInvItems),
  //       {
  //         text: '  ',
  //         style: 'subheader',
  //         alignment: this.alignmentRight
  //       },
  //       //{
  //       //  text: ('إجمالى الفاتورة  ' + this.servSaleInv.formData.SellingTot.toString()).split(" ").reverse().join(" "),
  //       //  style: 'subheader',
  //       //  alignment: this.alignmentLeft
  //       //},
  //       //{
  //       //  text: ('خصم ' + this.servSaleInv.formData.SellingDisc.toString()).split(" ").reverse().join(" "),
  //       //  style: 'subheader',
  //       //  alignment: this.alignmentLeft
  //       //},
  //       //{
  //       //  text: ('الاجمالى النهائى ' + this.servSaleInv.formData.SellingVal.toString()).split(" ").reverse().join(" "),
  //       //  style: 'subheader',
  //       //  alignment: this.alignmentLeft
  //       //},

  //       {
  //         layout: {
  //           fillColor: function (rowIndex, node, columnIndex) {
  //             return (rowIndex === 2) ? '#c2dec2' : null;
  //           }

  //         },
  //         table: {
  //           headerRows: 3,
  //           widths: [40, '*', 40, '*'],
  //           body: [
  //             [this.servSaleInv.formData.SellingTot, { text: ('اجمالى الفاتورة').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
  //             [this.servSaleInv.formData.SellingDisc, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
  //             [this.servSaleInv.formData.SellingVal, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
  //           ]
  //         }
  //       }

  //     ]
  //     , styles: {
  //       header: {
  //         fontSize: 15,
  //         bold: true,
  //         margin: 0
  //       },
  //       subheader: {
  //         fontSize: 12,
  //         bold: true
  //       },
  //       quote: {
  //         italics: true
  //       },
  //       small: {
  //         fontSize: 8,
  //       },

  //     }

  //     , defaultStyle: {
  //       font: 'GnuMICR',
  //       alignment: this.alignmentCenter
  //     }
  //   }

  // }

  // getExperienceObject(saleInvItems: SalesSaleInvDet[]) {
  //   const exs = [];
  //   saleInvItems.forEach(Itm => {
  //     exs.push(
  //       [{
  //         columns: [
  //           [{
  //             text: Itm.ItemName,
  //             style: 'jobTitle'
  //           },
  //           {
  //             text: Itm.CompanyName,
  //           },
  //           {
  //             text: Itm.Qty.toString(),
  //           },
  //           {
  //             text: Itm.Price.toString(),
  //           },
  //           {
  //             text: Itm.Tot.toString(),
  //           }
  //           ]
  //         ]
  //       }]
  //     );

  //   });
  //   return {
  //     table: {
  //       widths: ['*'],
  //       headerRows: 1,
  //       body: [
  //         exs
  //       ]
  //     }
  //   };
  // }

  // getEducationObject(saleInvItems: SalesSaleInvDet[]) {
  //   return {
  //     layout: {
  //       fillColor: function (rowIndex, node, columnIndex) {
  //         return (rowIndex === 0) ? '#c2dec2' : (rowIndex % 2 === 0) ? '#ebebeb' : '#ffffff';
  //       }

  //     },
  //     table: {
  //       widths: [40, 25, 25, 60, '*'],
  //       body: [
  //         [{
  //           text: 'الاجمالى',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'السعر',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'عدد',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'المنشأ',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'الصنف',
  //           style: 'tableHeader'
  //         },
  //         ],
  //         saleInvItems.map(ed => {
  //           return [ed.Tot, ed.Price, ed.Qty, ed.CompanyName, ed.ItemName];
  //           //return [ed.Tot, ed.Price, ed.Qty, ed.ItemName.split(" ").reverse().join(" ")];
  //         })
  //       ]
  //     }
  //   };
  // }


}
