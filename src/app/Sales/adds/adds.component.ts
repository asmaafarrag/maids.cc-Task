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


import { Add } from '../../shared/Models/add';
import { Store } from '../../shared/Models/Store';
import { CC } from '../../shared/Models/cc';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { AddService } from '../../shared/Services/add.service'
import { AddsItemsComponent } from '../adds-items/adds-items.component';
import { ToastrService } from 'ngx-toastr';

import { CCService } from 'src/app/shared/Services/cc.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  storeslist: Store[];
  CCslist: CC[];
  selectedstore: Store;
  selectedCC: CC;

  isValid: boolean = true;
  isEnabled: boolean = true;

  UserID: string;
  UserType: string;

  today: Date = new Date();
  ItemsCount: number = 0;
  alignmentCenter: Alignment = 'center';
  alignmentRight: Alignment = 'right';
  alignmentLeft: Alignment = 'left'

  constructor(private servStockService: ServStockService, public addServ: AddService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router
    , private ccServ : CCService) {
      this.UserID = localStorage.getItem('lUsr');
      this.UserType = localStorage.getItem('UserType');

  }


  ngOnInit() {
    let addId = this.currentRoute.snapshot.paramMap.get('id')
    this.getStores();
    this.getCC();
    this.resetForm();

    this.selectedstore = new Store();
    this.selectedstore.StoreId = 1;

    if (addId != null)
      this.populateForm(parseInt(addId));


    //today.setDate(today.getDate() - 30);
    //this.fromDate.patchValue(today);
  }

  populateForm(addId: number) {
    this.addServ.getAddById(addId).subscribe(res => {
      this.addServ.formData = res;
      //this.addServ.formData.addDets = res.addDets
    });
  }

  getStores() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servStockService.getStores().subscribe(res => this.storeslist = res);
    }
    else {
      this.servStockService.getStoresByUser(this.UserID).subscribe(res => this.storeslist = res);
    }
    // this.servStockService.getStores().subscribe(res => this.storeslist = res);
  }


  getCC() {
    //this.UserID = localStorage.getItem('lUsr');
    this.ccServ.getCCs().subscribe(res => this.CCslist = res);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.addServ.formData = {
      AddID: -1,
      AddName: '',
      AddVal: 0,
      AddDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      AddNotes: null,
      ExpFromStock: null,
      CCID: 0,
      CCName: '',
      AddNo: '',
      AddType: null,
      StoreId: 0,
      StoreName: '',
      EntryUserId :  Number(this.UserID),
        EntryUserDate:'',
      addDets : [] 
    }

    //this.addServ.formData.addDets = [];

  }

  AddOrEditSalInvItems(orderItemIndex, AddId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.addServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex, AddId, StoreId };
      this.dialog.open(AddsItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.addServ.formData.addDets.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.addServ.formData.addDets.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }



  calcGrandTotal() {
    this.addServ.formData.AddVal = this.addServ.formData.addDets.reduce((prev, curr) => { return prev + curr.Tot }, 0);
    this.addServ.formData.AddVal = parseFloat((this.addServ.formData.AddVal).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      this.addServ.postAdd().subscribe(
        res => {
          this.showSuccess();
          //this.generatePdf();
          this.resetForm();
          this.isEnabled = true;
        },
        err => { console.log(err); this.showError(); this.isEnabled = true;}
      )
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ اذن الاضافة', 'اذن الاضافة');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ اذن الاضافة', 'اذن الاضافة');
  }



  validateForm() {
    this.isValid = true;
    if (this.addServ.formData.CCID == null || this.addServ.formData.CCID == 0)
      this.isValid = false;
    else if (this.addServ.formData.StoreId == null || this.addServ.formData.StoreId == 0)
      this.isValid = false;

    else if (this.addServ.formData.addDets.length == 0)
      this.isValid = false;
     

    return this.isValid;
  }

  validateForPopUp() {
    this.isValid = true;
  
   if (this.addServ.formData.StoreId == null || this.addServ.formData.StoreId == 0)
    this.isValid = false;
 
   else if (this.addServ.formData.CCID == null || this.addServ.formData.CCID == 0)
    this.isValid = false;
   
    return this.isValid;
  }
}