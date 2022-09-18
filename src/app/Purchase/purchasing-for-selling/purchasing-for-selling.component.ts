import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import { Store } from '../../shared/Models/Store';
import { Item } from '../../shared/Models/item';
import { Supplier } from '../../shared/Models/supplier';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { PurchasingForSellingItemsComponent } from '../purchasing-for-selling-items/purchasing-for-selling-items.component';
import { SupplierService } from '../../shared/Services/supplier.service'
import { ToastrService } from 'ngx-toastr';
import { Treasury } from '../../shared/Models/treasury';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { PurchasingService } from 'src/app/shared/Services/purchasing.service';
import { Customer } from 'src/app/shared/Models/customer.model';

@Component({
  selector: 'app-purchasing-for-selling',
  templateUrl: './purchasing-for-selling.component.html',
  styleUrls: ['./purchasing-for-selling.component.css']
})
export class PurchasingForSellingComponent implements OnInit {

  storeslist: Store[];
  itemslist: Item[];
  Supplierslist: Supplier[];
  customerslist: Customer[];
  selectedstore: Store;

  treasurylist: Treasury[];

  selectedItem: Item;


  isValid: boolean = true;
  isEnabled: boolean = true;


  UserID: string;
  UserType: string;
  EmpID: string;

  today: Date = new Date();
  ItemsCount: number = 0;
  PurchasingTotDollar:number = 0;
  SellingPriceTot : number = 0;
  alignmentCenter: Alignment = 'center';
  alignmentRight: Alignment = 'right';
  alignmentLeft: Alignment = 'left'

  constructor(private servStockService: ServStockService, public PurchasingServ: PurchasingService, public suppServ: SupplierService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router
    , private treasuryServ: TreasuryService) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');
  }



  ngOnInit() {
    let PurchasingId = this.currentRoute.snapshot.paramMap.get('id')
    this.getStores();
    this.getSuppliers();
    this.getCustomers();
    this.getTreasury();
    this.resetForm();

    this.selectedstore = new Store();
    this.selectedstore.StoreId = 1;

    if (PurchasingId != null)
      this.populateForm(parseInt(PurchasingId));


    //today.setDate(today.getDate() - 30);
    //this.fromDate.patchValue(today);
  }

  populateForm(PurchasingId: number) {
    this.PurchasingServ.getPurchasingById(PurchasingId).subscribe(res => {
      this.PurchasingServ.formData = res;

      this.calcItemsQty();
      this.calcGrandTotal();
      //this.PurchasingServ.formData.saleInvItems = res.saleInvItems
    });
  }

  getStores() {
    this.servStockService.getStores().subscribe(res => this.storeslist = res);
  }

  getSuppliers() {
    this.suppServ.getSuppliers().subscribe(res => { this.Supplierslist = res; console.log(this.Supplierslist) });
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
    this.PurchasingServ.formData = {
      PurchasingID: -1,
      PurchasingName: '',
      PurchasingVal: 0,
      PurchasingDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      PurchasingNotes: '',
      SupplierId: 0,
      SupplierName: '',
      PurchasingType: 'CREDIT',
      InP: '',
      PurchasingNo: '',
      SaleTax: null,
      PurchasingNet: null,
      PurchasingDisc: 0,
      TaxGainCom: null,
      PurchasingDiscRatio: 0,
      PurchasingTot: 0,
      StoreId: 0,
      StoreName: '',
      TreasuryId: null,

      TreasuryName: '',
      DeliverOrderNo: '',
      BranchId: null,
      EntryUserId: Number(this.UserID),
      EntryUserDate: '',
      CustomerID: 0,
      ExchangeRate: null,
      purchasingDets: []
    }
    if (this.UserType.toUpperCase() != 'ADMIN') {
      this.PurchasingServ.formData.ExchangeRate = 0;
    }
  }

  AddOrEditSalInvItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.PurchasingServ.formData.StoreId;
      var ExchangeRate = this.PurchasingServ.formData.ExchangeRate;
      dialogConfig.data = { orderItemIndex, SellingId, StoreId, ExchangeRate};
      this.dialog.open(PurchasingForSellingItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.PurchasingServ.formData.purchasingDets.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.PurchasingServ.formData.purchasingDets.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;

    let SellPsum: number = 0;
    this.PurchasingServ.formData.purchasingDets.forEach(a => SellPsum += parseFloat((a.SellingPrice * a.Qty).toString()));
    this.SellingPriceTot = SellPsum;
  }

  calcDiscValue() {
    this.PurchasingServ.formData.PurchasingDisc = parseFloat((this.PurchasingServ.formData.PurchasingTot * this.PurchasingServ.formData.PurchasingDiscRatio / 100).toFixed(2));
    this.PurchasingServ.formData.PurchasingVal = parseFloat((this.PurchasingServ.formData.PurchasingTot - this.PurchasingServ.formData.PurchasingDisc).toFixed(2));
  }

  calcDiscRatio() {
    this.PurchasingServ.formData.PurchasingDiscRatio = parseFloat((this.PurchasingServ.formData.PurchasingDiscRatio / this.PurchasingServ.formData.PurchasingTot * 100).toFixed(2));
    this.PurchasingServ.formData.PurchasingVal = parseFloat((this.PurchasingServ.formData.PurchasingTot - this.PurchasingServ.formData.PurchasingDisc).toFixed(2));
  }

  calcGrandTotal() {
    this.PurchasingServ.formData.PurchasingTot = this.PurchasingServ.formData.purchasingDets.reduce((prev, curr) => { return prev + curr.Tot }, 0);
    this.PurchasingServ.formData.PurchasingTot = parseFloat((this.PurchasingServ.formData.PurchasingTot).toFixed(2));

    this.PurchasingTotDollar = this.PurchasingServ.formData.purchasingDets.reduce((prev, curr) => { return prev + curr.DollarPriceTot }, 0);
    this.PurchasingTotDollar  = parseFloat(( this.PurchasingTotDollar).toFixed(2));

    // this.PurchasingTotDollar = parseFloat((this.PurchasingServ.formData.PurchasingTot / this.PurchasingServ.formData.ExchangeRate).toFixed(2));


    this.PurchasingServ.formData.PurchasingVal = parseFloat((this.PurchasingServ.formData.PurchasingTot - this.PurchasingServ.formData.PurchasingDisc).toFixed(2));
  }



  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.PurchasingServ.formData.PurchasingID == -1) {
        this.PurchasingServ.postPurchasingForSelling().subscribe(
          res => {
            this.showSuccess();
            //this.generatePdf();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.PurchasingServ.putPurchasing().subscribe(
          res => {
            this.showSuccess();
            //this.generatePdf();
            //this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )

      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ الفاتورة', 'فاتورة المشتريات');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ الفاتورة', 'فاتورة المشتريات');
  }



  validateForm() {
    this.isValid = true;
    if (this.PurchasingServ.formData.SupplierId == null || this.PurchasingServ.formData.SupplierId == 0)
      this.isValid = false;
    else if (this.PurchasingServ.formData.CustomerID == null || this.PurchasingServ.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.PurchasingServ.formData.StoreId == null || this.PurchasingServ.formData.StoreId == 0)
      this.isValid = false;
    else if (this.PurchasingServ.formData.purchasingDets.length == 0)
      this.isValid = false;
    else if (this.PurchasingServ.formData.PurchasingNo == null || this.PurchasingServ.formData.PurchasingNo == '')
      this.isValid = false;
    else if (this.PurchasingServ.formData.TreasuryId == null || this.PurchasingServ.formData.TreasuryId == 0)
      this.isValid = false;



    return this.isValid;
  }


  validateForPopUp() {
    this.isValid = true;
    if (this.PurchasingServ.formData.SupplierId == null || this.PurchasingServ.formData.SupplierId == 0)
      this.isValid = false;

    else if (this.PurchasingServ.formData.StoreId == null || this.PurchasingServ.formData.StoreId == 0)
      this.isValid = false;

    else if (this.PurchasingServ.formData.CustomerID == null || this.PurchasingServ.formData.CustomerID == 0)
      this.isValid = false;

    else if (this.PurchasingServ.formData.TreasuryId == null || this.PurchasingServ.formData.TreasuryId == 0)
      this.isValid = false;

    //else if (this.PurchasingServ.formData.SellingType == null || this.PurchasingServ.formData.SellingType == '')
    //this.isValid = false;
    return this.isValid;
  }


}
