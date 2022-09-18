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


import { TransBetStores, TransBetStoreDet } from '../../shared/Models/trans-bet-stores';

import { Store } from '../../shared/Models/Store';
import { Item } from '../../shared/Models/item';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { TransBetStoresService } from '../../shared/Services/trans-bet-stores.service'
import { TransBetStoresItemsComponent } from '../trans-bet-stores-items/trans-bet-stores-items.component';
import { ToastrService } from 'ngx-toastr';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';

@Component({
  selector: 'app-trans-bet-stores',
  templateUrl: './trans-bet-stores.component.html',
  styleUrls: ['./trans-bet-stores.component.css']
})
export class TransBetStoresComponent implements OnInit {

  storeslist: Store[];
  itemslist: Item[];
  selectedstore: Store;

  selectedItem: Item;

  isValid: boolean = true;
  isEnabled: boolean = true;

  today: Date = new Date();
  ItemsCount: number = 0;

  UserID : string;

  constructor(private servStockService: ServStockService, public TransBetStoresServ: TransBetStoresService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
      this.UserID = localStorage.getItem('lUsr');
  }

  ngOnInit() {
    let tbsId = this.currentRoute.snapshot.paramMap.get('id')
    this.getStores();
    this.resetForm();

    this.selectedstore = new Store();
    this.selectedstore.StoreId = 1;

    if (tbsId != null)
      this.populateForm(parseInt(tbsId));


    //today.setDate(today.getDate() - 30);
    //this.fromDate.patchValue(today);
  }

  populateForm(tbsId: number) {
    this.TransBetStoresServ.getTransBetStoresById(tbsId).subscribe(res => {
      this.TransBetStoresServ.formData = res;
      var datePipe = new DatePipe("en-US");
  let formatedyear = datePipe.transform(this.TransBetStoresServ.formData.TBSDate, 'yyyy-MM-dd');
  this.TransBetStoresServ.formData.TBSDate = formatedyear;
    });
  }

  getStores() {
    this.servStockService.getStores().subscribe(res => { this.storeslist = res; });
  }



  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.TransBetStoresServ.formData = {

      TBSID: -1,
      TBSName: '',
      Val: null,
      TBSDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      TBSNotes: '',
      FStoreId: null,
      FStoreName: '',
      ToStoreId: null,
      ToStoreName: '',
      EmpId: null,
      TbsNo: '',
      ExpFromStock: '0',
      IsLockGard: '',
      EntryUserId :  Number(this.UserID),
        EntryUserDate:'',
      transBetStoreDet: []
    }

    this.TransBetStoresServ.GetMaxTransNo().subscribe(res => {
      this.TransBetStoresServ.formData.TbsNo = res.toString();

    }
    );
  }

  AddOrEditSalInvItems(orderItemIndex, tbsId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.TransBetStoresServ.formData.FStoreId;
      dialogConfig.data = { orderItemIndex, tbsId, StoreId };
      this.dialog.open(TransBetStoresItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.TransBetStoresServ.formData.transBetStoreDet.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.TransBetStoresServ.formData.transBetStoreDet.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }

  calcDiscValue() {
    //this.servSaleInv.formData.SellingDisc = parseFloat((this.servSaleInv.formData.SellingTot * this.servSaleInv.formData.SellingDiscRatio / 100).toFixed(2));
    //this.servSaleInv.formData.SellingVal = this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc;
  }


  calcGrandTotal() {
    //this.servSaleInv.formData.SellingTot = this.servSaleInv.saleInvItems.reduce((prev, curr) => { return prev + curr.Tot }, 0);
    //this.servSaleInv.formData.SellingTot = parseFloat((this.servSaleInv.formData.SellingTot).toFixed(2));

    //this.servSaleInv.formData.SellingVal = this.servSaleInv.formData.SellingTot - this.servSaleInv.formData.SellingDisc;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      this.TransBetStoresServ.postTransBetStores().subscribe(
        res => {
          this.showSuccess();
          //this.generatePdf();
          this.resetForm();
          this.isEnabled = true;
        },
        err => { console.log(err); this.isEnabled = true;}
      )
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ اذن التحويل', 'تحويل بين المخازن');
  }



  validateForm() {
    this.isValid = true;
    if (this.TransBetStoresServ.formData.FStoreId == null)
      this.isValid = false;
    else if (this.TransBetStoresServ.formData.ToStoreId == null)
      this.isValid = false;
    else if (this.TransBetStoresServ.formData.transBetStoreDet.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  validateForPopUp() {
    this.isValid = true;
    if (this.TransBetStoresServ.formData.FStoreId == null)
      this.isValid = false;
    else if (this.TransBetStoresServ.formData.ToStoreId == null)
      this.isValid = false;
    return this.isValid;
  }


}
