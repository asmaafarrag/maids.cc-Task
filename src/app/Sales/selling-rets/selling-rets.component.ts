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


import { SellingRet, SellingRetDets } from '../../shared/Models/selling-ret';

import { Store } from '../../shared/Models/Store';
import { Item } from '../../shared/Models/item';
import { Customer } from '../../shared/Models/customer.model';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { SellingRetService } from '../../shared/Services/selling-ret.service'
import { SellingRetsItemsComponent } from '../selling-rets-items/selling-rets-items.component';
import { ToastrService } from 'ngx-toastr';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { Treasury } from 'src/app/shared/Models/treasury';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';

@Component({
  selector: 'app-selling-rets',
  templateUrl: './selling-rets.component.html',
  styleUrls: ['./selling-rets.component.css']
})
export class SellingRetsComponent implements OnInit {

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

  today: Date = new Date();
  ItemsCount: number = 0;
  alignmentCenter: Alignment = 'center';
  alignmentRight: Alignment = 'right';
  alignmentLeft: Alignment = 'left'

  constructor(private servStockService: ServStockService, public servSellingRet: SellingRetService
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

    this.selectedstore = new Store();

    if (saleInvId != null)
      this.populateForm(parseInt(saleInvId));


    //today.setDate(today.getDate() - 30);
    //this.fromDate.patchValue(today);
  }

  populateForm(saleInvId: number) {
    this.servSellingRet.getSellingRetsById(saleInvId).subscribe(res => {
      this.servSellingRet.formData = res;
      console.log( this.servSellingRet.formData , 'l')

      this.selectedCustomer = new Customer();
      this.selectedCustomer.CustomerID = this.servSellingRet.formData.CustomerID;
      this.selectedCustomer.CustomerName = this.servSellingRet.formData.CustomerName;

      this.calcItemsQty();

      if (this.UserType.toUpperCase() != 'ADMIN') {
        this.isEnabled = false;
      }
      //  var datePipe = new DatePipe("en-US");
      //let formatedyear = datePipe.transform(this.servSellingRet.formData.SellingDate, 'yyyy-MM-dd');
      //this.servSellingRet.formData.SellingDate = formatedyear;
      //this.servSellingRet.formData.sellingRetDets = res.sellingRetDets
    } ) ;
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
    this.servSellingRet.formData = {
      SellingRetId: -1,
      SellingRetName: '',
      SellingRetVal: 0,
      SellingRetDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      SellingRetNotes: '',
      SellingRetType: null,
      CustomerID: 0,

      CustomerName: '',
      SellingRetDisc: 0,
      SellingRetTot: 0,
      StoreId: 0,
      StoreName: '',
      SellingRetDiscRatio: 0,

      SellingRetNo: null,
      AgentId: null,
      EntryUserId: Number(this.UserID),
       TreasuryId: null,
      TaxGainCom:0,
      TaxGainComRatio:null,
      SaleTax:0,
      SaleTaxRatio:null,
      longId:null,
      BranchId:null,
      EnterpriseId:null,
      uuid:null,
  
      sellingRetDets: []
    }

    this.servSellingRet.formData.sellingRetDets = [];
    this.servSellingRet.GetMaxSellingRetsNo().subscribe(res => {
      this.servSellingRet.formData.SellingRetNo = res;

    }
    );


  }

  AddOrEditSalInvItems(orderItemIndex, SellingRetId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.servSellingRet.formData.StoreId;
      dialogConfig.data = { orderItemIndex, SellingRetId, StoreId };
      this.dialog.open(SellingRetsItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.servSellingRet.formData.sellingRetDets.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.servSellingRet.formData.sellingRetDets.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }

  calcDiscValue() {
    this.servSellingRet.formData.SellingRetDisc = parseFloat((this.servSellingRet.formData.SellingRetTot * this.servSellingRet.formData.SellingRetDiscRatio / 100).toFixed(2));
    this.servSellingRet.formData.SellingRetVal = parseFloat((this.servSellingRet.formData.SellingRetTot - this.servSellingRet.formData.SellingRetDisc).toFixed(2));
  }

  calcDiscRatio() {
    this.servSellingRet.formData.SellingRetDiscRatio = parseFloat((this.servSellingRet.formData.SellingRetDiscRatio / this.servSellingRet.formData.SellingRetTot * 100).toFixed(2));
    this.servSellingRet.formData.SellingRetVal = parseFloat((this.servSellingRet.formData.SellingRetTot - this.servSellingRet.formData.SellingRetDisc).toFixed(2));
  }

  calcGrandTotal() {
    this.servSellingRet.formData.SellingRetTot = this.servSellingRet.formData.sellingRetDets.reduce((prev, curr) => { return prev + curr.tot }, 0);
    this.servSellingRet.formData.SellingRetTot = parseFloat((this.servSellingRet.formData.SellingRetTot).toFixed(2));

    this.servSellingRet.formData.SellingRetVal = parseFloat((this.servSellingRet.formData.SellingRetTot - this.servSellingRet.formData.SellingRetDisc).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.servSellingRet.formData.SellingRetId == -1) {
        this.servSellingRet.postSellingRet().subscribe(
          res => {
            this.showSuccess();
            this.generatePdf();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.servSellingRet.putSellingRet().subscribe(
          res => {
            this.showSuccess();
            //    this.generatePdf();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ المرتجع', 'مرتجع مبيعات');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ المرتجع', 'مرتجع مبيعات');
  }



  validateForm() {
    this.isValid = true;
    if (this.servSellingRet.formData.CustomerID == null || this.servSellingRet.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.servSellingRet.formData.StoreId == null || this.servSellingRet.formData.StoreId == 0)
      this.isValid = false;
    else if (this.servSellingRet.formData.sellingRetDets.length == 0)
      this.isValid = false;
    else if (this.servSellingRet.formData.SellingRetType == null || this.servSellingRet.formData.SellingRetType == '')
      this.isValid = false;
      
      else if (this.servSellingRet.formData.TreasuryId == null || this.servSellingRet.formData.TreasuryId == 0)
      this.isValid = false;
  
     



    return this.isValid;
  }

  validateForPopUp() {
    this.isValid = true;
    if (this.servSellingRet.formData.CustomerID == null || this.servSellingRet.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.servSellingRet.formData.StoreId == null || this.servSellingRet.formData.StoreId == 0)
      this.isValid = false;

    else if (this.servSellingRet.formData.TreasuryId == null || this.servSellingRet.formData.TreasuryId == 0)
    this.isValid = false;

    else if (this.servSellingRet.formData.SellingRetType == null || this.servSellingRet.formData.SellingRetType == '')
      this.isValid = false;
    return this.isValid;
  }

  setSelectedCustomer(cust) {
    this.selectedCustomer = this.customerslist.find(x => x.CustomerID == cust);
  }


  generatePdf() {
    //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    const documentDefinition = this.getDocumentDefinition();
    //var sum = this.servSellingRet.sellingRetDets.reduce((acc, cur) => acc + cur.Qty, 0);
    //console.log(sum)


    //  pdfMake.createPdf(documentDefinition).print();

    // this adds our base64 encoded data to the existing 'virtual file system'
    pdfFonts.pdfMake.vfs['GnuMICR_b64'] = strGnuMICR

    // you're going to wipe out the standard stuff when you create this
    // variable, so we need to add the stock Roboto fonts back in. I 
    // set all fonts to the same thing, as "italic MICR" would be silly. 

    pdfMake.createPdf(
      documentDefinition,
      {},
      {
        // Default font should still be available
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
        },
        // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
        GnuMICR: {
          normal: 'GnuMICR_b64',
          bold: 'GnuMICR_b64',
          italics: 'GnuMICR_b64',
          bolditalics: 'GnuMICR_b64'
        }
      },
      pdfFonts.pdfMake.vfs).print();
  }


  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.servSellingRet.formData));
    return {
      pageSize: {
        width: 445,
        height: 615
      },
        Margins: 0,
        footer: (currentPage, pageCount) => {
        return {
          text: 'Powered by www.MiniCodeCo.com',
          alignment: this.alignmentCenter,
          fontSize: 6
        }
      },

      // content: [

      //   {
      //     text: ('اذن مرتجع رقم ' + this.servSellingRet.formData.SellingRetNo.toString()).split(" ").reverse().join(" "),
      //     style: 'header'
      //   },
      //   {

      //     columns: [
      //       {
      //         // auto-sized columns have their widths based on their content
      //         width: '*',
      //         style: 'subheader',
      //         text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
      //         alignment: this.alignmentRight
      //       },

      //       {
      //         // star-sized columns fill the remaining space
      //         // if there's more than one star-column, available width is divided equally
      //         width: 100,
      //         text: '',
      //         alignment: this.alignmentRight
      //       },
      //       {
      //         // fixed width
      //         width: 100,
      //         style: 'subheader',
      //         text: ('التاريخ / ' + this.servSellingRet.formData.SellingRetDate).split(" ").reverse().join(" ")
      //       }
      //     ],
      //     // optional space between columns
      //     columnGap: 10
      //   },

      //   {
      //     text: 'الاصناف',
      //     style: 'header'
      //   },
      //   this.getEducationObject(this.servSellingRet.formData.sellingRetDets),
      //   {
      //     text: '  ',
      //     style: 'subheader',
      //     alignment: this.alignmentRight
      //   },
      //   //{
      //   //  text: ('إجمالى الفاتورة  ' + this.servSellingRet.formData.SellingRetTot.toString()).split(" ").reverse().join(" "),
      //   //  style: 'subheader',
      //   //  alignment: this.alignmentLeft
      //   //},
      //   //{
      //   //  text: ('خصم ' + this.servSellingRet.formData.SellingRetDisc.toString()).split(" ").reverse().join(" "),
      //   //  style: 'subheader',
      //   //  alignment: this.alignmentLeft
      //   //},
      //   //{
      //   //  text: ('الاجمالى النهائى ' + this.servSellingRet.formData.SellingRetVal.toString()).split(" ").reverse().join(" "),
      //   //  style: 'subheader',
      //   //  alignment: this.alignmentLeft
      //   //},

      //   {
      //     layout: {
      //       fillColor: function (rowIndex, node, columnIndex) {
      //         return (rowIndex === 2) ? '#c2dec2' : null;
      //       }

      //     },
      //     table: {
      //       headerRows: 3,
      //       widths: [40, '*', 40, '*'],
      //       body: [
      //         [this.servSellingRet.formData.SellingRetTot, { text: ('اجمالى المرتجع').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
      //         [this.servSellingRet.formData.SellingRetDisc, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
      //         [this.servSellingRet.formData.SellingRetVal, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
      //       ]
      //     }
      //   }

      // ]
        content: [

        

        {
          text: ('اذن مرتجع رقم ' + this.servSellingRet.formData.SellingRetNo.toString()).split(" ").reverse().join(" "),
          style: 'header'
        },
      


        // {
        //   text: 'INVOICE',
        //   fontSize: 20,
        //   bold: true,
        //   alignment: 'center',
        //   decoration: 'underline',
        //   color: 'skyblue'
        // },
     
        {
          // auto-sized columns have their widths based on their content
          width: '*',
          style: 'subheader',
          text: ('العميل / ' + this.selectedCustomer.CustomerName).split(" ").reverse().join(" "),
          alignment: this.alignmentRight
        },

    

        {
          // fixed width
          width: 100,
          alignment: this.alignmentRight,
          style: 'subheader',
          text: ('التاريخ / ' + this.servSellingRet.formData.SellingRetDate).split(" ").reverse().join(" ")
        },
        





        // {
        //   columns: [
        //     //  {
        //     //    // star-sized columns fill the remaining space
        //     //    // if there's more than one star-column, available width is divided equally
        //     //    width: 100,
        //     //    text: '',
        //     //  },
            
       
        //     {
        //       // fixed width
        //       width: 100,
        //       alignment: this.alignmentRight,
        //       style: 'subheader',
        //       text: ('التاريخ / ' + this.servSellingRet.formData.SellingRetDate).split(" ").reverse().join(" ")
        //     },

        //   ],

        // },

      
         
          
          // optional space between columns
          // columnGap: 10
        

     

        {
          width: '*',
          text: 'الاصناف',
          style: 'header'
        },

        this.getEducationObject(this.servSellingRet.formData.sellingRetDets),
          {
            text: '  ',
            style: 'subheader',
            alignment: this.alignmentRight
          },
          {
           text: ('إجمالى الفاتورة  ' + this.servSellingRet.formData.SellingRetTot.toString()).split(" ").reverse().join(" "),
           style: 'subheader',
           alignment: this.alignmentLeft
          },
          {
           text: ('خصم ' + this.servSellingRet.formData.SellingRetDisc.toString()).split(" ").reverse().join(" "),
           style: 'subheader',
           alignment: this.alignmentLeft
          },
          {
           text: ('الاجمالى النهائى ' + this.servSellingRet.formData.SellingRetVal.toString()).split(" ").reverse().join(" "),
           style: 'subheader',
           alignment: this.alignmentLeft
          },
  
        // {
        //   table: {
        //     headerRows: 1,
        //     widths: ['*', 'auto', 'auto', 'auto'],
        //     body: [
        //       ['الإجمالي', 'الكمية', 'السعر', 'الأصناف'],
        //       ...this.servSaleInv.formData.saleInvItems.map(p => ([ (p.Price*p.Qty).toFixed(2), p.Qty,  p.Price ,p.ItemName])),
        //       [  this.servSaleInv.formData.saleInvItems.reduce((sum, p)=> sum + (p.Qty * p.Price), 0).toFixed(2) , {text: 'الإجمالي', colSpan: 3} , {}, {}]
        //     ]
        //   }
        // },

       


      
      ],
       styles: {
        header: {
          fontSize: 15,
          bold: true,
          margin: 0
        },
        subheader: {
          fontSize: 12,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8,
        },

      }

      , defaultStyle: {
        font: 'GnuMICR',
        alignment: this.alignmentCenter
      }
    }

  }

  getExperienceObject(sellingRetDets: SellingRetDets[]) {
    const exs = [];
    sellingRetDets.forEach(Itm => {
      exs.push(
        [{
          columns: [
            [{
              text: Itm.ItemName,
              style: 'jobTitle'
            },
            {
              text: Itm.CompanyName,
            },
            {
              text: Itm.Qty.toString(),
            },
            {
              text: Itm.Price.toString(),
            },
            {
              text: Itm.tot.toString(),
            }
            ]
          ]
        }]
      );

    });
    return {
      table: {
        widths: ['*'],
        headerRows: 1,
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(sellingRetDets: SellingRetDets[]) {
    return {
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return (rowIndex === 0) ? '#c2dec2' : (rowIndex % 2 === 0) ? '#ebebeb' : '#ffffff';
        }

      },
      table: {
        headerRows: 3,
        widths: [40, '*', 40, '*'],
        body: [
          [this.servSellingRet.formData.SellingRetTot, { text: ('اجمالى المرتجع').split(" ").reverse().join(" ") }, this.ItemsCount, { text: ('اجمالى عدد الاصناف').split(" ").reverse().join(" ") }],
          [this.servSellingRet.formData.SellingRetDisc, { text: ('خصم').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }],
          [this.servSellingRet.formData.SellingRetVal, { text: ('الاجمالى النهائى ').split(" ").reverse().join(" ") }, { text: ' ', colSpan: 2 }]
        ]
      }
    };
  }


}
