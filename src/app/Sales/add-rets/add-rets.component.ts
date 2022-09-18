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


import { AddRet } from '../../shared/Models/add-ret';
import { Store } from '../../shared/Models/Store';
import { CC } from '../../shared/Models/cc';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { AddRetService } from '../../shared/Services/add-ret.service'
import { AddRetsItemsComponent } from '../add-rets-items/add-rets-items.component';
import { ToastrService } from 'ngx-toastr';

import { CCService } from 'src/app/shared/Services/cc.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';

@Component({
  selector: 'app-add-rets',
  templateUrl: './add-rets.component.html',
  styleUrls: ['./add-rets.component.css']
})
export class AddRetsComponent implements OnInit {

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

  constructor(private servStockService: ServStockService, public addRetServ: AddRetService
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
    this.addRetServ.getAddRetById(addId).subscribe(res => {
      this.addRetServ.formData = res;
      console.log(  this.addRetServ.formData  , 'k')
      //this.addRetServ.formData.addDets = res.addDets
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
    this.addRetServ.formData = {
      AddRetID: -1,
      AddRetName: '',
      AddRetVal: 0,
      AddRetDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      AddRetNotes: null,
      ExpFromStock: null,
      CCId: 0,
      CCName: '',
      AddRetNo: '',
      AddRetType: null,
      StoreId: 0,
      StoreName: '',
      EntryUserId :  Number(this.UserID),
        EntryUserDate:'',
      addRetDets : [] 
    }

    //this.addRetServ.formData.addDets = [];

  }

  AddOrEditSalInvItems(orderItemIndex, AddId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      var StoreId = this.addRetServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex, AddId, StoreId };
      this.dialog.open(AddRetsItemsComponent, dialogConfig).afterClosed().subscribe(res => { this.calcGrandTotal(); this.calcItemsQty(); });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.addRetServ.formData.addRetDets.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.addRetServ.formData.addRetDets.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }



  calcGrandTotal() {
    this.addRetServ.formData.AddRetVal = this.addRetServ.formData.addRetDets.reduce((prev, curr) => { return prev + curr.Tot }, 0);
    this.addRetServ.formData.AddRetVal = parseFloat((this.addRetServ.formData.AddRetVal).toFixed(2));
  }

  onSubmit(form: NgForm) {
    
    if (this.validateForm()) {
      this.isEnabled = false;
      this.addRetServ.postAddRet().subscribe(
        res => {
          this.showSuccess();
          //this.generatePdf();
          this.resetForm();
          this.isEnabled = true;
        },
        err => { console.log(err); this.showError();this.isEnabled = true;}
      )
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ اذن الصرف', 'اذن الصرف');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ اذن الصرف', 'اذن الصرف');
  }



  validateForm() {
    this.isValid = true;
    if (this.addRetServ.formData.CCId == null || this.addRetServ.formData.CCId == 0)
      this.isValid = false;
    else if (this.addRetServ.formData.StoreId == null || this.addRetServ.formData.StoreId == 0)
      this.isValid = false;
    else if (this.addRetServ.formData.addRetDets.length == 0)
      this.isValid = false;
     

    return this.isValid;
  }

  validateForPopUp() {
    this.isValid = true;
  
   if (this.addRetServ.formData.StoreId == null || this.addRetServ.formData.StoreId == 0)
    this.isValid = false;

    else if (this.addRetServ.formData.CCId == null || this.addRetServ.formData.CCId == 0)
    this.isValid = false;
 
   
    return this.isValid;
  }
}