import { Component, OnInit , Inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CRMProjects } from 'src/app/shared/Models/crm-projects';
import { CRMStages } from 'src/app/shared/Models/crm-stages';
import { CRMChannels } from 'src/app/shared/Models/crm-channels';
import { Emps } from 'src/app/shared/Models/emps';

import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';
import { DocumentSummaryDTO } from 'src/app/shared/Models/document-summary-dto';
import { AllInvoiceService } from 'src/app/shared/Services/all-invoice.service';
import { saveAs } from 'file-saver'
// import { enableRipple, createElement } from '@syncfusion/ej2-base';
// import { TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Item } from 'src/app/shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';
@Component({
  selector: 'app-all-codes',
  templateUrl: './all-codes.component.html',
  styleUrls: ['./all-codes.component.css']
})
export class AllCodesComponent implements OnInit {


  // term: string;

  // SalesSaleInvList: Item[];
  // currentIndex = -1;
  // page: number = 1;
  // count: number = 0;
  // pageSize: number = 5;
  // pageSizes = [5, 10, 20];
  // title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;
  // tab2:boolean = false;
  // tab3:boolean = false;
  // panelOpenState = false;

  // constructor(public salInvServ:ItemService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute
  //   , private ExcelServ: ExcelService) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //       //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

  //       //if (stageTypeId == null) {
  //       this.getAllInv();
  //       //}
  //       //else if  (stageTypeId == '0') {
  //       //this.GetEmpAlertsList();
  //       //}
  //       //else {
  //       //this.getStageClients(parseInt(stageTypeId));
  //       //}
  //     }
  //   });
  // }

  ngOnInit() {
    // let saleInvId = this.currentRoute.snapshot.paramMap.get('id')

    // this.resetForm();

    // if (saleInvId != null)
    //   this.populateForm(parseInt(saleInvId));

  }


  // tab2Clicked(){
  //   this.tab2 = true
  //   console.log(this.tab2, "2")
  // }

  // tab3Clicked(){
  //   this.tab3 = !this.tab3
  // }


  // // populateForm(clientId: number) {
  // //   this.service.getClientById(clientId).subscribe(res =>
  // //     {
  // //       this.service.formData = res;
  // //     } );
  // // }


  // getAllInv() {
  //   const params = this.getRequestParams(this.title, this.page, this.pageSize);
  //   // console.log(params,"param")
  //     // this.salInvServ.RecentDocuments(params).subscribe(res => {
  //     //   // console.log("param2")
  //     //   // const { TotalRecords, Data } = res;
  //     //   // this.SalesSaleInvList = Data;
  //     //   // this.count = TotalRecords;
  //     //   // console.log(TotalRecords, Data)
  //     //   this.SalesSaleInvList = res.result ;
  //     //   // console.log(res , "res")
  //     //   // console.log(this.SalesSaleInvList , "SalesSaleInvList")
  //     // },
  //     //   err => { console.log(err); });

  // }

  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();
  //   this.salInvServ.formData = {
  //     ItemID: null,
  //     ItemNO: null,
  //     ItemName: '',
  //     ItemNameE:'',
  //     ItemSalePrice: null,
  //     UnitId: null,
  //     UnitName: '',
  //     ItemNote1: '',
  //     ItemNote2: '',
  //     CompanyName: '',
  //     AvailableQty: null,
  //     GroupID:null,
  //     ItmTaxRatio:null,
  //     TaxTypeID:null,
  //     ItemBarCode:'',
  //     GS1Code :'',
  //     EGSCode :'',
  //     RequestId :'',
  //     parentCode:'',
  //     activeFrom:'',
  //     activeTo:'',
  //     codeType:'',
  //     isSelected: false,
  //   }




  // }




  // getRequestParams(searchTitle, page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   // if (searchTitle) {
  //   //  params['SearchString'] = searchTitle;
  //   // }

  //   if (page) {
  //     params['pageNo'] = page;
  //   }

  //   if (pageSize) {
  //     params['pageSize'] = pageSize;
  //   }

  //   return params;
  // }


  // handlePageChange(event) {
  //   this.page = event;
  //   this.getAllInv();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getAllInv();
  // }

  // fnExport() {
  //   this.ExcelServ.exportToFile('amir', 'Tbl');
  // }

  // fnImport() {
  //   this.ExcelServ.exportToFile('amir', 'Tbl');
  // }

  // onFileChange(evt: any) {
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  //   var obj = { SellingDate: 'a', CustomerName: 'b', StoreName: 'c' , SellingTot: 'c', SellingDisc: 'c', SellingVal: 'c'};
  //    //const header: string[] = Object.getOwnPropertyNames(new SalesSaleInv());
  //     const header: string[] = Object.getOwnPropertyNames(obj);
  //     console.log(header);

  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {

  //     const bstr: string = e.target.result;
  //     const data = <any[]>this.ExcelServ.importFromFile(bstr);



  //     const importedData = data.slice(1, -1);

  //     this.SalesSaleInvList = importedData.map(arr => {
  //       const obj = {};
  //       for (let i = 0; i < header.length; i++) {
  //         const k = header[i];
  //         obj[k] = arr[i];
  //       }
  //       return <Item>obj;
  //     })

  //   };
  //   reader.readAsBinaryString(target.files[0]);

  // }


}
