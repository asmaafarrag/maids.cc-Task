import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { SalesSaleInv, SalesSaleInvDet } from '../../shared/Models/sales-sale-inv';
import { Store } from '../../shared/Models/Store';
import { Item } from '../../shared/Models/item';
import { Customer } from '../../shared/Models/customer.model';
import { ServStockService } from '../../shared/Services/serv-stock.service'
import { SalesSaleInvService } from '../../shared/Services/sales-sale-inv.service'
import { SaleInvItemsComponent } from '../sale-inv-items/sale-inv-items.component';
import { ToastrService } from 'ngx-toastr';
import { Treasury } from '../../shared/Models/treasury';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import jspdf from 'jspdf';

@Component({
  selector: 'app-sale-invs',
  templateUrl: './sale-invs.component.html',
  styleUrls: ['./sale-invs.component.css']
})
export class SaleInvsComponent implements OnInit {

  storeslist: Store[];
  itemslist: Item[];
  customerslist: Customer[];
  selectedstore: Store;

  treasurylist: Treasury[];

  selectedItem: Item;
  selectedCustomer: Customer;

  isValid: boolean = true;
  isEnabled: boolean = true;

  UserID: string;
  UserType: string;
  EmpID: string;
  custUnderCreditLimit: Boolean = false;

  today: Date = new Date();
  ItemsCount: number = 0;
  alignmentCenter: Alignment = 'center';
  alignmentRight: Alignment = 'right';
  alignmentLeft: Alignment = 'left';

  
  

  constructor(private servStockService: ServStockService, public servSaleInv: SalesSaleInvService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router
    , private treasuryServ: TreasuryService) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
    this.EmpID = localStorage.getItem('EmpID');
  }



  ngOnInit() {
    let saleInvId = this.currentRoute.snapshot.paramMap.get('id')
    this.getStores();
    this.getCustomers();
    this.getTreasury();
    this.resetForm();
    // this.downloadPDF();



    this.selectedstore = new Store();
    this.selectedstore.StoreId = 1;

    if (saleInvId != null)
      this.populateForm(parseInt(saleInvId));
    else
      this.servSaleInv.GetMaxSellingsNo().subscribe(res => {
        this.servSaleInv.formData.SellingNo = res;
  
      });


    //today.setDate(today.getDate() - 30);
    //this.fromDate.patchValue(today);
  }


  // downloadPDF() {
  //   let tab = window.open();
  //   this.servSaleInv
  //     .downloadPDF()
  //     .subscribe(data => {
  //       const fileUrl = URL.createObjectURL(data);
  //       tab.location.href = fileUrl;
  //     });
  // }



  @ViewChild('htmlData', {static: false}) htmlData:ElementRef;

  //Open Pdf File
  openPDF(){
      let DATA = this.htmlData.nativeElement;
      let doc = new jspdf('p','pt', 'a4');

    doc.setProperties({
        title: "new Report"
    });
    doc.fromHTML(DATA.innerHTML,30 ,30);
    window.open(URL.createObjectURL(doc.output("blob")))
  }


  //Download Pdf File
downloadPDF(){
  let DATA = this.htmlData.nativeElement;
  let doc = new jspdf('p','pt', 'a4');

  let handleElement = {
    '#editor':function(element,renderer){
      return true;
    }
  };
  doc.fromHTML(DATA.innerHTML,15,15,{
    'width': 200,
    'elementHandlers': handleElement
  });

  doc.save('csvpdf.pdf');
}


  

  populateForm(saleInvId: number) {
    this.servSaleInv.getSaleInvById(saleInvId).subscribe(res => {
      this.servSaleInv.formData = res;

      this.selectedCustomer = new Customer();
      this.selectedCustomer.CustomerID = this.servSaleInv.formData.CustomerID;
      this.selectedCustomer.CustomerName = this.servSaleInv.formData.CustomerName;

      this.calcItemsQty();
      if (this.UserType.toUpperCase() != 'ADMIN') {
        this.isEnabled = false;
      }
      //  var datePipe = new DatePipe("en-US");
      //let formatedyear = datePipe.transform(this.servSaleInv.formData.SellingDate, 'yyyy-MM-dd');
      //this.servSaleInv.formData.SellingDate = formatedyear;
      //this.servSaleInv.formData.saleInvItems = res.saleInvItems
    });
  }
  

  getStores() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servStockService.getStores().subscribe(res => this.storeslist = res);
    }
    else {
      this.servStockService.getStoresByUser(this.UserID).subscribe(res => this.storeslist = res);
    }
  }

  getCustomers() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servStockService.getCustomers().subscribe(res => this.customerslist = res);
    }
    else {
      this.servStockService.GetCustomersByEmpId(this.EmpID).subscribe(res => this.customerslist = res);
    }
  }

  getTreasury() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.treasuryServ.getTreasurys().subscribe(res => this.treasurylist = res);
    }
    else {
      this.treasuryServ.getTreasurysByUser(this.UserID).subscribe(res => this.treasurylist = res);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.servSaleInv.formData = {
      SellingId: -1,
      SellingName: '',
      SellingVal: 0,
      SellingDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      SellingNotes: '',
      SellingType: '',
      CustomerID: 0,
      CustomerName: '',
      PaidVal: 0,
      RemainVal: 0,
      SellingDiscRatio: 0,
      SellingDisc: 0,
      SellingTot: 0,
      SellType: '1',
      StoreId: 0,
      StoreName: '',
      SellingNo: null,
      TreasuryId: null,
      AgentId: 1,
      EntryUserId: Number(this.UserID),
      EntryUserDate: '',
      saleInvItems: [],
       DiscRatioExt:0,
        DiscValueExt:0,
  
            
      TaxGainCom:0,
      TaxGainComRatio:null,

  
      // isSelected : boolean;
           uuid : '',
      longId : '',
      BranchId : null,
      BranchName :'',
  
      SaleTaxRatio:null,
        SaleTax:0,
  
  
      TotWithoutTax:null,
    }

    this.servSaleInv.formData.saleInvItems = [];
    // this.servSaleInv.GetMaxSellingsNo().subscribe(res => {
    //   this.servSaleInv.formData.SellingNo = res;

    // }
    // );


  }

  AddOrEditSalInvItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.servSaleInv.formData.StoreId;
      dialogConfig.data = { orderItemIndex, SellingId, StoreId };
      this.dialog.open(SaleInvItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.servSaleInv.formData.saleInvItems.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.servSaleInv.formData.saleInvItems.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }

  calcDiscValue() {
    this.servSaleInv.formData.SellingDisc = parseFloat((this.servSaleInv.formData.SellingTot * this.servSaleInv.formData.SellingDiscRatio / 100).toFixed(2));
    this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));
  }

  calcDiscRatio() {
    this.servSaleInv.formData.SellingDiscRatio = parseFloat((this.servSaleInv.formData.SellingDiscRatio / this.servSaleInv.formData.SellingTot * 100).toFixed(2));
    this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));

  }

  calcGrandTotal() {
    this.servSaleInv.formData.SellingTot = this.servSaleInv.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.Tot }, 0);
    this.servSaleInv.formData.SellingTot = parseFloat((this.servSaleInv.formData.SellingTot).toFixed(2));

    this.servSaleInv.formData.SellingVal = parseFloat((this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc).toFixed(2));

  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.servSaleInv.formData.SellingId == -1) {
        this.servSaleInv.postSaleInv().subscribe(
          res => {
            this.showSuccess();
            // this.generatePdf();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.servSaleInv.putSaleInv().subscribe(
          res => {
            this.showSuccess();
            // this.generatePdf();
            //this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ الفاتورة', 'فاتورة مبيعات');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ الفاتورة', 'فاتورة مبيعات');
  }



  validateForm() {
    this.isValid = true;
    if (this.servSaleInv.formData.CustomerID == null || this.servSaleInv.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.servSaleInv.formData.StoreId == null || this.servSaleInv.formData.StoreId == 0)
      this.isValid = false;
    else if (this.servSaleInv.formData.TreasuryId == null || this.servSaleInv.formData.TreasuryId == 0)
    this.isValid = false;
    else if (this.servSaleInv.formData.saleInvItems.length == 0)
      this.isValid = false;
    else if (this.servSaleInv.formData.SellingType == null || this.servSaleInv.formData.SellingType == '')
      this.isValid = false;


    return this.isValid;
  }

  validateForPopUp() {
    this.isValid = true;
    if (this.servSaleInv.formData.CustomerID == null || this.servSaleInv.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.servSaleInv.formData.StoreId == null || this.servSaleInv.formData.StoreId == 0)
      this.isValid = false;
    else if (this.servSaleInv.formData.TreasuryId == null || this.servSaleInv.formData.TreasuryId == 0)
     this.isValid = false;

    else if (this.servSaleInv.formData.SellingType == null || this.servSaleInv.formData.SellingType == '')
      this.isValid = false;
    return this.isValid;
  }

  setSelectedCustomer(cust) {
    this.selectedCustomer = this.customerslist.find(x => x.CustomerID == cust);


    this.servSaleInv.IsUnderCreditLimit(this.servSaleInv.formData.CustomerID).subscribe(res => {
      this.custUnderCreditLimit = res;
      if (!this.custUnderCreditLimit) {
        this.toastr.error('العميل تعدى حد الائتمان', 'فاتورة مبيعات');
        this.isValid = false;
      }
      else {
        this.isValid = true;
      }
    });

  }


  // generatePdf() {
  //   //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   const documentDefinition = this.getDocumentDefinition();
  //   //var sum = this.servSaleInv.sellingRetDets.reduce((acc, cur) => acc + cur.Qty, 0);
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
  //         text: ' بيع فاتورة ',
  //         fontSize: 16,
  //         alignment: 'center',
  //         color: '#047886'
  //       },
      


  //       // {
  //       //   text: 'INVOICE',
  //       //   fontSize: 20,
  //       //   bold: true,
  //       //   alignment: 'center',
  //       //   decoration: 'underline',
  //       //   color: 'skyblue'
  //       // },
     
  //       // {
  //       //   text: ( ' تفاصيل العميل  '  + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
  //       //   style: 'sectionHeader'
  //       // },
        
      
       
  //       {
  //         text: ('اذن استلام رقم ' + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
  //         style: 'subheader',
  //         alignment: this.alignmentRight

  //       },

  //       // {
  //       //   columns: [
  //       //       // [{ image: 'imag', fit: '50' }],
  //       //       [{ qr: this.invoice.toBase64(), fit: '50' ,  alignment: 'left' }],
  //       //       // [{ image: 'data:image/jpeg;base64,' + this.imageData }],
  //       //       // [{ text: 'Signature', alignment: 'right', italics: true }],
  //       //     ]
  //       // },

  //       {

  //         columns: [
  //           {
  //             // auto-sized columns have their widths based on their content
  //             width: '*',
  //             style: 'subheader',
  //             text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
  //             alignment: this.alignmentRight
  //           },
  //         ],

  //       },

  //       {
  //         columns: [
  //           //  {
  //           //    // star-sized columns fill the remaining space
  //           //    // if there's more than one star-column, available width is divided equally
  //           //    width: 100,
  //           //    text: '',
  //           //  },
  //           {

  //             // fixed width
  //             width: '*',
  //             style: 'subheader',
  //             text: ('التاريخ / ' + this.servSaleInv.formData.SellingDate).split(" ").reverse().join(" "),
  //             alignment: this.alignmentRight

  //           }

  //         ],

  //       },

      
         
          
  //         // optional space between columns
  //         // columnGap: 10
        

     

  //       {
  //         width: '*',
  //         text: 'الاصناف',
  //         style: 'header'
  //       },

  //       {
  //         layout: {
  //           fillColor: function (rowIndex, node, columnIndex) {
  //             return (rowIndex === 2) ? '#c2dec2' : null;
  //           },
  //         },
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 'auto', 'auto'],
  //           body: [
  //             ['الإجمالي', 'الكمية', 'السعر', 'الأصناف'],
  //             ...this.servSaleInv.formData.saleInvItems.map(p => ([ (p.Price*p.Qty).toFixed(2), p.Qty,  p.Price ,p.ItemName])),
  //             [  this.servSaleInv.formData.saleInvItems.reduce((sum, p)=> sum + (p.Qty * p.Price), 0).toFixed(2) , {text: 'الإجمالي', colSpan: 3} , {}, {}]
  //           ]
  //         }
  //       }
      
  //     ],

  //     // content: [

  //     //   {
  //     //     text: ('اذن استلام رقم ' + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
  //     //     style: 'header'
  //     //   },
  
  //     //   {
  //     //     // auto-sized columns have their widths based on their content
  //     //     width: '*',
  //     //     style: 'subheader',
  //     //     text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
  //     //     alignment: this.alignmentRight
  //     //   },
      
  //     //   // {

  //     //   //   columns: [
  //     //   //     {
  //     //   //       // star-sized columns fill the remaining space
  //     //   //       // if there's more than one star-column, available width is divided equally
  //     //   //       width: 100,
  //     //   //       text: '',
  //     //   //       alignment: this.alignmentRight

  //     //   //     },
  //     //   //   ],
  //     //   // },

  //     //   // {

  //     //   //   columns: [
  //     //   {
  //     //       // fixed width
  //     //       width: 100,
  //     //       style: 'subheader',
  //     //       text: ('التاريخ / ' + this.servSaleInv.formData.SellingDate).split(" ").reverse().join(" ")
  //     //   },
      
  //     //   //   ],
  //     //   // },
          
  //     //   //   // optional space between columns
  //     //   //   columnGap: 10
  //     //   // },

  //     //   {
  //     //     text: 'الاصناف',
  //     //     style: 'header'
  //     //   },
  //     //   this.getEducationObject(this.servSaleInv.formData.saleInvItems),
  //     //   {
  //     //     text: '  ',
  //     //     style: 'subheader',
  //     //     alignment: this.alignmentRight
  //     //   },
  //     //   {
  //     //    text: ('إجمالى الفاتورة  ' + this.servSaleInv.formData.SellingTot.toString()).split(" ").reverse().join(" "),
  //     //    style: 'subheader',
  //     //    alignment: this.alignmentLeft
  //     //   },
  //     //   {
  //     //    text: ('خصم ' + this.servSaleInv.formData.SellingDisc.toString()).split(" ").reverse().join(" "),
  //     //    style: 'subheader',
  //     //    alignment: this.alignmentLeft
  //     //   },
  //     //   {
  //     //    text: ('الاجمالى النهائى ' + this.servSaleInv.formData.SellingVal.toString()).split(" ").reverse().join(" "),
  //     //    style: 'subheader',
  //     //    alignment: this.alignmentLeft
  //     //   },

  //     //   // {
  //     //   //   layout: {
  //     //   //     fillColor: function (rowIndex, node, columnIndex) {
  //     //   //       return (rowIndex === 2) ? '#c2dec2' : null;
  //     //   //     }

  //     //   //   },
  //     //   //   table: {
  //     //   //     headerRows: 3,
  //     //   //     widths: [40, '*', 40, '*'],
  //     //   //     body: [
  //     //   //       [this.servSaleInv.formData.SellingTot, { text: ('اجمالى الفاتورة').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
  //     //   //       [this.servSaleInv.formData.SellingDisc, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
  //     //   //       [this.servSaleInv.formData.SellingVal, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
  //     //   //     ]
  //     //   //   }
  //     //   // }

  //     // ]
  //      styles: {
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
  //         ...exs
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
  //         ...saleInvItems.map(ed => {
  //           return [ed.Tot, ed.Price, ed.Qty, ed.CompanyName, ed.ItemName];
  //           //return [ed.Tot, ed.Price, ed.Qty, ed.ItemName.split(" ").reverse().join(" ")];
  //         })
  //       ]
  //     }
  //   };
  // }



//  generatePdf() {
//     //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
//     const documentDefinition = this.getDocumentDefinition();
//     //var sum = this.servSaleInv.sellingRetDets.reduce((acc, cur) => acc + cur.Qty, 0);
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
//     sessionStorage.setItem('resume', JSON.stringify(this.servSaleInv.formData));
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
//           text: ' بيع فاتورة ',
//           fontSize: 16,
//           alignment: 'center',
//           color: '#047886'
//         },
      


//         // {
//         //   text: 'INVOICE',
//         //   fontSize: 20,
//         //   bold: true,
//         //   alignment: 'center',
//         //   decoration: 'underline',
//         //   color: 'skyblue'
//         // },
     
//         // {
//         //   text: ( ' تفاصيل العميل  '  + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
//         //   style: 'sectionHeader'
//         // },
        
      
       
//         {
          
//           text: ('اذن استلام رقم ' + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
//           style: 'subheader',
//           alignment: this.alignmentRight

//         },

//         // {
//         //   columns: [
//         //       // [{ image: 'imag', fit: '50' }],
//         //       [{ qr: this.invoice.toBase64(), fit: '50' ,  alignment: 'left' }],
//         //       // [{ image: 'data:image/jpeg;base64,' + this.imageData }],
//         //       // [{ text: 'Signature', alignment: 'right', italics: true }],
//         //     ]
//         // },

//         {

//           columns: [
//             {
//               // auto-sized columns have their widths based on their content
//               width: '*',
//               style: 'subheader',
//               text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
//               alignment: this.alignmentRight
//             },
//           ],

//         },

//         {
//           columns: [
//             //  {
//             //    // star-sized columns fill the remaining space
//             //    // if there's more than one star-column, available width is divided equally
//             //    width: 100,
//             //    text: '',
//             //  },
//             {

//               // fixed width
//               width: '*',
//               style: 'subheader',
//               text: ('التاريخ / ' + this.servSaleInv.formData.SellingDate).split(" ").reverse().join(" "),
//               alignment: this.alignmentRight

//             }

//           ],

//         },

      
         
          
//           // optional space between columns
//           // columnGap: 10
        

     

//         {
//           width: '*',
//           text: 'الاصناف',
//           style: 'header'
//         },

//         {
//           layout: {
//             fillColor: function (rowIndex, node, columnIndex) {
//               return (rowIndex === 2) ? '#c2dec2' : null;
//             },
//           },
//           table: {
//             headerRows: 1,
//             widths: ['*', 'auto', 'auto', 'auto'],
//             body: [
//               ['الإجمالي', 'الكمية', 'السعر', 'الأصناف'],
//               ...this.servSaleInv.formData.saleInvItems.map(p => ([ (p.Price*p.Qty).toFixed(2), p.Qty,  p.Price ,p.ItemName])),
//               [  this.servSaleInv.formData.saleInvItems.reduce((sum, p)=> sum + (p.Qty * p.Price), 0).toFixed(2) , {text: 'الإجمالي', colSpan: 3} , {}, {}]
//             ]
//           }
//         }
      
//       ],

//       // content: [

//       //   {
//       //     text: ('اذن استلام رقم ' + this.servSaleInv.formData.SellingNo.toString()).split(" ").reverse().join(" "),
//       //     style: 'header'
//       //   },
  
//       //   {
//       //     // auto-sized columns have their widths based on their content
//       //     width: '*',
//       //     style: 'subheader',
//       //     text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
//       //     alignment: this.alignmentRight
//       //   },
      
//       //   // {

//       //   //   columns: [
//       //   //     {
//       //   //       // star-sized columns fill the remaining space
//       //   //       // if there's more than one star-column, available width is divided equally
//       //   //       width: 100,
//       //   //       text: '',
//       //   //       alignment: this.alignmentRight

//       //   //     },
//       //   //   ],
//       //   // },

//       //   // {

//       //   //   columns: [
//       //   {
//       //       // fixed width
//       //       width: 100,
//       //       style: 'subheader',
//       //       text: ('التاريخ / ' + this.servSaleInv.formData.SellingDate).split(" ").reverse().join(" ")
//       //   },
      
//       //   //   ],
//       //   // },
          
//       //   //   // optional space between columns
//       //   //   columnGap: 10
//       //   // },

//       //   {
//       //     text: 'الاصناف',
//       //     style: 'header'
//       //   },
//       //   this.getEducationObject(this.servSaleInv.formData.saleInvItems),
//       //   {
//       //     text: '  ',
//       //     style: 'subheader',
//       //     alignment: this.alignmentRight
//       //   },
//       //   {
//       //    text: ('إجمالى الفاتورة  ' + this.servSaleInv.formData.SellingTot.toString()).split(" ").reverse().join(" "),
//       //    style: 'subheader',
//       //    alignment: this.alignmentLeft
//       //   },
//       //   {
//       //    text: ('خصم ' + this.servSaleInv.formData.SellingDisc.toString()).split(" ").reverse().join(" "),
//       //    style: 'subheader',
//       //    alignment: this.alignmentLeft
//       //   },
//       //   {
//       //    text: ('الاجمالى النهائى ' + this.servSaleInv.formData.SellingVal.toString()).split(" ").reverse().join(" "),
//       //    style: 'subheader',
//       //    alignment: this.alignmentLeft
//       //   },

//       //   // {
//       //   //   layout: {
//       //   //     fillColor: function (rowIndex, node, columnIndex) {
//       //   //       return (rowIndex === 2) ? '#c2dec2' : null;
//       //   //     }

//       //   //   },
//       //   //   table: {
//       //   //     headerRows: 3,
//       //   //     widths: [40, '*', 40, '*'],
//       //   //     body: [
//       //   //       [this.servSaleInv.formData.SellingTot, { text: ('اجمالى الفاتورة').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
//       //   //       [this.servSaleInv.formData.SellingDisc, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
//       //   //       [this.servSaleInv.formData.SellingVal, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
//       //   //     ]
//       //   //   }
//       //   // }

//       // ]
//        styles: {
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

//   getExperienceObject(saleInvItems: SalesSaleInvDet[]) {
//     const exs = [];
//     saleInvItems.forEach(Itm => {
//       exs.push(
//         [{
//           columns: [
//             [{
//               text: Itm.ItemName,
//               style: 'jobTitle'
//             },
//             {
//               text: Itm.CompanyName,
//             },
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

//   getEducationObject(saleInvItems: SalesSaleInvDet[]) {
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
//             return [ed.Tot, ed.Price, ed.Qty, ed.CompanyName, ed.ItemName];
//             //return [ed.Tot, ed.Price, ed.Qty, ed.ItemName.split(" ").reverse().join(" ")];
//           })
//         ]
//       }
//     };
//   }

}
