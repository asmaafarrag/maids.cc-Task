import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { HttpErrorResponse } from '@angular/common/http';
// import { DatePipe } from '@angular/common'

// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';


// import { SellingCreditNoteDet } from 'src/app/shared/Models/SellingCreditNotes';
// import { Customer } from '../../shared/Models/customer.model';

// import { ServStockService } from '../../shared/Services/serv-stock.service'

// import { SellingCreditNoteService } from 'src/app/shared/Services/selling-credit-note.service';
// import { CreditNoteComponent } from '../credit-note/credit-note.component';
// import { ToastrService } from 'ngx-toastr';

// import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
// import { SalesSaleInvService } from 'src/app/shared/Services/sales-sale-inv.service';


// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';


// import { Alignment } from 'pdfmake/interfaces';
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
// import { Branch } from 'src/app/shared/Models/branch';
// import { BranchService } from 'src/app/shared/Services/branch.service';



@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

//   customerslist: Customer[];
//   sellinglist:SalesSaleInv[];
//   branchlist:Branch[];

//   selectedCustomer: Customer;
//   selectedSelling:SalesSaleInv;

//   isValid: boolean = true;
//   isEnabled: boolean = true;

//   UserID: string;
//   UserType: string;
//   EmpID: string;


//   today: Date = new Date();
//   ItemsCount: number = 0;
//   alignmentCenter: Alignment = 'center';
//   alignmentRight: Alignment = 'right';
//   alignmentLeft: Alignment = 'left'

//   constructor(private servStockService: ServStockService, public servCreditNote: SellingCreditNoteService , public SellingServ :SalesSaleInvService
//     ,public BranchServ:BranchService , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
//     this.UserType = localStorage.getItem('UserType');
//     this.UserID = localStorage.getItem('lUsr');
//     this.EmpID = localStorage.getItem('EmpID');
//   }



  ngOnInit() {
//     let saleInvId = this.currentRoute.snapshot.paramMap.get('id')

//     this.getCustomers();
//     this.getBranches();
//     // this.getSellings();
//     console.log(this.sellinglist);
//     this.resetForm();

//     if (saleInvId != null)
//       this.populateForm(parseInt(saleInvId));


//     //today.setDate(today.getDate() - 30);
//     //this.fromDate.patchValue(today);
  }

//   populateForm(saleInvId: number) {
//     this.servCreditNote.getSellingCreditNotesById(saleInvId).subscribe(res => {
//       this.servCreditNote.formData = res;

//       this.selectedCustomer = new Customer();
//       this.selectedCustomer.CustomerID = this.servCreditNote.formData.CustomerID;
//       this.selectedCustomer.CustomerName = this.servCreditNote.formData.CustomerName;

//       this.calcItemsQty();
//       if (this.UserType.toUpperCase() != 'ADMIN') {
//         this.isEnabled = false;
//       }
//       //  var datePipe = new DatePipe("en-US");
//       //let formatedyear = datePipe.transform(this.servCreditNote.formData.SellingDate, 'yyyy-MM-dd');
//       //this.servCreditNote.formData.SellingDate = formatedyear;
//       //this.servCreditNote.formData.saleInvItems = res.saleInvItems
//     });
//   }



//   getCustomers() {
//     // if (this.UserType.toUpperCase() == 'ADMIN') {
//       this.servStockService.getCustomers().subscribe(res => this.customerslist = res);

//     // }
//     // else {
//     //   this.servStockService.GetCustomersByEmpId(this.EmpID).subscribe(res => this.customerslist = res);
//     // }
//   }

//   getBranches() {
//     this.BranchServ.getBranchs().subscribe(res => this.branchlist = res);
//   }

//   // getSellings() {
//   //   this.SellingServ.getSaleInvss().subscribe(res => this.sellinglist = res);
//   // }




//   resetForm(form?: NgForm) {
//     if (form != null)
//       form.form.reset();
//     this.servCreditNote.formData = {
//       SellingCreditNoteId:-1,
//       SellingCreditNoteDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
//       CustomerID:0,
//       CustomerName : '',
//       SellingNo: null,
//       SellingId:null,
//       SellingCreditNoteTotalItemsAmount:null,
//       SellingCreditNoteTotalItemsDiscount:null,
//       SellingCreditNoteTotalAmount:null,
//       SellingCreditNoteNetAmount:null,
//       SellingCreditNoteTotalTax:null,
//       SellingCreditNoteNotes:'',
//       BranchId:null,
//       EnterpriseId:null,
//       SellingCreditNoteDets :[],
//     }

//     this.servCreditNote.formData.SellingCreditNoteDets = [];
//     console.log(this.servCreditNote.formData);
//     // this.servCreditNote.GetMaxSellingsNo().subscribe(res => {
//     //   this.servCreditNote.formData.SellingNo = res;
//     // }
//     //);


//   }

//   AddOrEditSalInvItems(orderItemIndex, SellingIdd) {
//     if (this.validateForPopUp()) {
//       const dialogConfig = new MatDialogConfig();
//       dialogConfig.autoFocus = true;
//       dialogConfig.disableClose = true;
//       dialogConfig.width = "100%";
//      // var StoreId = this.servCreditNote.formData.StoreId;
//       dialogConfig.data = { orderItemIndex, SellingIdd};
//       this.dialog.open(CreditNoteComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
//     }
//   }

//   onDeleteSalInvItems(SerNo: number, i: number) {
//     this.servCreditNote.formData.SellingCreditNoteDets.splice(i, 1);
//     this.calcGrandTotal();
//     this.calcItemsQty();
//   }

//   calcItemsQty() {
//     let sum: number = 0;
//     this.servCreditNote.formData.SellingCreditNoteDets.forEach(a => sum += parseInt(a.Qty.toString()));
//     this.ItemsCount = sum;
//   }

//   calcDiscValue() {
//   //  this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalAmount * this.servCreditNote.formData.SellingDiscRatio / 100).toFixed(2));
//     this.servCreditNote.formData.SellingCreditNoteNetAmount = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalAmount - this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount).toFixed(2));
//   }

//   // calcDiscRatio() {
//   //   this.servCreditNote.formData.SellingDiscRatio = parseFloat((this.servCreditNote.formData.SellingDiscRatio / this.servCreditNote.formData.SellingCreditNoteTotalAmount * 100).toFixed(2));
//   //   this.servCreditNote.formData.SellingCreditNoteNetAmount = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalAmount - this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount).toFixed(2));

//   // }

//   calcGrandTotal() {
//     this.servCreditNote.formData.SellingCreditNoteTotalAmount = this.servCreditNote.formData.SellingCreditNoteDets.reduce((prev, curr) => { return prev + curr.Tot }, 0);
//     this.servCreditNote.formData.SellingCreditNoteTotalAmount = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalAmount).toFixed(2));

//     this.servCreditNote.formData.SellingCreditNoteTotalTax = this.servCreditNote.formData.SellingCreditNoteDets.reduce((prev, curr) => { return prev + curr.DetTaxSal }, 0);
//     this.servCreditNote.formData.SellingCreditNoteTotalTax = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalTax).toFixed(2));

//     this.servCreditNote.formData.SellingCreditNoteNetAmount = parseFloat((this.servCreditNote.formData.SellingCreditNoteNetAmount - this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount + this.servCreditNote.formData.SellingCreditNoteTotalTax ).toFixed(2));

//     this.servCreditNote.formData.SellingCreditNoteNetAmount = parseFloat((this.servCreditNote.formData.SellingCreditNoteTotalAmount - this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount).toFixed(2));

//   }

//   onSubmit(form: NgForm) {
//     if (this.validateForm()) {
//       this.isEnabled = false;
//       if (this.servCreditNote.formData.SellingCreditNoteId == -1) {
//         this.servCreditNote.postSellingCreditNote().subscribe(
//           res => {
//             this.showSuccess();
//             this.generatePdf();
//             this.resetForm();
//             this.isEnabled = true;
//           },
//           err => { console.log(err); this.showError(); this.isEnabled = true; }
//         )
//       }
//       else {
//         this.servCreditNote.postSellingCreditNote().subscribe(
//           res => {
//             this.showSuccess();
//             this.generatePdf();
//             //this.resetForm();
//             this.isEnabled = true;
//           },
//           err => { console.log(err); this.showError(); this.isEnabled = true; }
//         )
//       }

//     }
//   }


//   showSuccess() {
//     this.toastr.success('تم حفظ الفاتورة', 'فاتورة مبيعات');
//   }

//   showError() {
//     this.toastr.error('خطأ فى حفظ الفاتورة', 'فاتورة مبيعات');
//   }



//   validateForm() {
//     this.isValid = true;
//     if (this.servCreditNote.formData.CustomerID == null || this.servCreditNote.formData.CustomerID == 0)
//       this.isValid = false;

//     else if (this.servCreditNote.formData.SellingCreditNoteDets.length == 0)
//       this.isValid = false;
//     // else if (this.servCreditNote.formData.SellingType == null || this.servCreditNote.formData.SellingType == '')
//     //   this.isValid = false;


//     return this.isValid;
//   }

//   validateForPopUp() {
//     this.isValid = true;
//     if (this.servCreditNote.formData.CustomerID == null || this.servCreditNote.formData.CustomerID == 0)
//       this.isValid = false;

//     // else if (this.servCreditNote.formData.SellingType == null || this.servCreditNote.formData.SellingType == '')
//     //   this.isValid = false;
//     return this.isValid;
//   }

//   setSelectedCustomer(cust) {
//     this.selectedCustomer = this.customerslist.find(x => x.CustomerID == cust);
//         this.isValid = true;

//   }

//   setSelectedSelling(selling) {
//     this.selectedSelling = selling;

//   }

//   generatePdf() {
//     //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
//     const documentDefinition = this.getDocumentDefinition();
//     //var sum = this.servCreditNote.saleInvItems.reduce((acc, cur) => acc + cur.Qty, 0);
//     //console.log(sum)


//     //  pdfMake.createPdf(documentDefinition).print();

//     // this adds our base64 encoded data to the existing 'virtual file system'
//     pdfFonts.pdfMake.vfs['GnuMICR_b64'] = strGnuMICR

//     // you're going to wipe out the standard stuff when you create this
//     // variable, so we need to add the stock Roboto fonts back in. I
//     // set all fonts to the same thing, as "italic MICR" would be silly.

//     pdfMake.createPdf(
//       documentDefinition,
//       {},
//       {
//         // Default font should still be available
//         Roboto: {
//           normal: 'Roboto-Regular.ttf',
//           bold: 'Roboto-Medium.ttf',
//           italics: 'Roboto-Italic.ttf',
//           bolditalics: 'Roboto-Italic.ttf'
//         },
//         // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
//         GnuMICR: {
//           normal: 'GnuMICR_b64',
//           bold: 'GnuMICR_b64',
//           italics: 'GnuMICR_b64',
//           bolditalics: 'GnuMICR_b64'
//         }
//       },
//       pdfFonts.pdfMake.vfs).print();
//   }


//   getDocumentDefinition() {
//     sessionStorage.setItem('resume', JSON.stringify(this.servCreditNote.formData));
//     return {
//       pageSize: {
//         width: 445,
//         height: 615
//       },
//       Margins: 0,
//       footer: (currentPage, pageCount) => {
//         return {
//           text: 'Powered by www.MiniCodeCo.com',
//           alignment: this.alignmentCenter,
//           fontSize: 6
//         }
//       },

//       content: [

//         {
//           text: ('فاتورة رقم ' + this.servCreditNote.formData.SellingNo.toString()).split(" ").reverse().join(" "),
//           style: 'header'
//         },
//         {

//           columns: [
//             {
//               // auto-sized columns have their widths based on their content
//               width: '*',
//               style: 'subheader',
//               text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
//               alignment: this.alignmentRight
//             },

//             {
//               // star-sized columns fill the remaining space
//               // if there's more than one star-column, available width is divided equally
//               width: 100,
//               text: '',
//               alignment: this.alignmentRight
//             },
//             {
//               // fixed width
//               width: 100,
//               style: 'subheader',
//               text: ('التاريخ / ' + this.servCreditNote.formData.SellingCreditNoteDate).split(" ").reverse().join(" ")
//             }
//           ],
//           // optional space between columns
//           columnGap: 10
//         },

//         {
//           text: 'الاصناف',
//           style: 'header'
//         },
//         this.getEducationObject(this.servCreditNote.formData.SellingCreditNoteDets),
//         {
//           text: '  ',
//           style: 'subheader',
//           alignment: this.alignmentRight
//         },
//         //{
//         //  text: ('إجمالى الفاتورة  ' + this.servCreditNote.formData.SellingTot.toString()).split(" ").reverse().join(" "),
//         //  style: 'subheader',
//         //  alignment: this.alignmentLeft
//         //},
//         //{
//         //  text: ('خصم ' + this.servCreditNote.formData.SellingDisc.toString()).split(" ").reverse().join(" "),
//         //  style: 'subheader',
//         //  alignment: this.alignmentLeft
//         //},
//         //{
//         //  text: ('الاجمالى النهائى ' + this.servCreditNote.formData.SellingVal.toString()).split(" ").reverse().join(" "),
//         //  style: 'subheader',
//         //  alignment: this.alignmentLeft
//         //},

//         {
//           layout: {
//             fillColor: function (rowIndex, node, columnIndex) {
//               return (rowIndex === 2) ? '#c2dec2' : null;
//             }

//           },
//           table: {
//             headerRows: 3,
//             widths: [40, '*', 40, '*'],
//             body: [
//               [this.servCreditNote.formData.SellingCreditNoteTotalAmount, { text: ('اجمالى الفاتورة').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
//               [this.servCreditNote.formData.SellingCreditNoteTotalItemsDiscount, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
//               [this.servCreditNote.formData.SellingCreditNoteNetAmount, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
//             ]
//           }
//         }

//       ]
//       , styles: {
//         header: {
//           fontSize: 15,
//           bold: true,
//           margin: 0
//         },
//         subheader: {
//           fontSize: 12,
//           bold: true
//         },
//         quote: {
//           italics: true
//         },
//         small: {
//           fontSize: 8,
//         },

//       }

//       , defaultStyle: {
//         font: 'GnuMICR',
//         alignment: this.alignmentCenter
//       }
//     }

//   }

//   getExperienceObject(saleInvItems: SellingCreditNoteDet[]) {
//     const exs = [];
//     saleInvItems.forEach(Itm => {
//       exs.push(
//         [{
//           columns: [
//             [{
//               text: Itm.ItemName,
//               style: 'jobTitle'
//             },
//             // {
//             //   text: Itm.CompanyName,
//             // },
//             {
//               text: Itm.Qty.toString(),
//             },
//             {
//               text: Itm.Price.toString(),
//             },
//             {
//               text: Itm.Tot.toString(),
//             }
//             ]
//           ]
//         }]
//       );

//     });
//     return {
//       table: {
//         widths: ['*'],
//         headerRows: 1,
//         body: [
//           ...exs
//         ]
//       }
//     };
//   }

//   getEducationObject(saleInvItems: SellingCreditNoteDet[]) {
//     return {
//       layout: {
//         fillColor: function (rowIndex, node, columnIndex) {
//           return (rowIndex === 0) ? '#c2dec2' : (rowIndex % 2 === 0) ? '#ebebeb' : '#ffffff';
//         }

//       },
//       table: {
//         widths: [40, 25, 25, 60, '*'],
//         body: [
//           [{
//             text: 'الاجمالى',
//             style: 'tableHeader'
//           },
//           {
//             text: 'السعر',
//             style: 'tableHeader'
//           },
//           {
//             text: 'عدد',
//             style: 'tableHeader'
//           },
//           {
//             text: 'المنشأ',
//             style: 'tableHeader'
//           },
//           {
//             text: 'الصنف',
//             style: 'tableHeader'
//           },
//           ],
//           ...saleInvItems.map(ed => {
//             return [ed.Tot, ed.Price, ed.Qty, ed.ItemName];
//             //return [ed.Tot, ed.Price, ed.Qty, ed.ItemName.split(" ").reverse().join(" ")];
//           })
//         ]
//       }
//     };
//   }



}
