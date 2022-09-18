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

import { Accounts } from '../../shared/Models/accounts.model';
import { Supplier } from '../../shared/Models/supplier';

import { AccIncListQService } from '../../shared/Services/acc-inc-list-q.service'

import { Alignment } from 'pdfmake/interfaces';


import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/shared/Services/supplier.service';
import { Store } from 'src/app/shared/Models/Store';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  UserID: string;
  UserType: string;
  EmpID: string;

  accountslist: Accounts[];
  storeslist:Store[];
  
  selectedAccount: Accounts;

  isValid: boolean = true;

  constructor(public SuppService: SupplierService, private servAccIncListQService: AccIncListQService , public servStockService:ServStockService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
      this.UserType = localStorage.getItem('UserType');
      this.UserID = localStorage.getItem('lUsr');
  }


  ngOnInit() {
    let SuppId = this.currentRoute.snapshot.paramMap.get('id')
    this.getAccounts();
    this.getStores();
    this.resetForm();


    this.selectedAccount = new Accounts();

    if (SuppId != null)
      this.populateForm(parseInt(SuppId));
  }

  populateForm(CustId: number) {
    this.SuppService.getSupplierById(CustId).subscribe(res => {
      this.SuppService.formData = res;
    });
  }

  getAccounts() {
    //this.UserID = localStorage.getItem('lUsr');
    //this.servAccIncListQService.getAllAccounts().subscribe(res => this.accountslist = res);
  }

  getStores() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servStockService.getStores().subscribe(res => this.storeslist = res);
    }
    else {
      this.servStockService.getStoresByUser(this.UserID).subscribe(res => this.storeslist = res);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.SuppService.formData = {
      SupplierId: -1,
      SupplierName: '' ,
      SupplierNameE:'',
      SerNo:null,
      StoreId:null,
      tele:null,
      tele2:null,
      mob1:null,
      mob2:null,
      fax:null,
      address:null,
      email:null,
      AccountID:null,
      SuppAccount:null,
      OpenValR:null,
      OpenValS:null,
      RegionSuppId:null,
      SuppFieldId:null,
      SuppGroupId:null,
      ManagerName:null,
      CommRegister:null,
      AffinityCard:null,
      RegisterNo:null,
      IsAdvancePayments:'',
      IsUnderTaxRules:'',
  
      PurchRes:'',
  
      OpenBalDebit:null,
      OpenBalCredit:null    
    }


  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      if (this.SuppService.formData.SupplierId == -1) {
        this.SuppService.postSupplier().subscribe(
          res => {
            this.showSuccess();
            this.resetForm();
          },
          err => { console.log(err); }
        )
      }
      else {
        this.SuppService.putSupplier().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/SuppliersView']);
            //this.resetForm();
          },
          err => { console.log(err); }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ بيانات المورد', 'الموردون');
  }



  validateForm() {
    this.isValid = true;
    if (this.SuppService.formData.SupplierName == null || this.SuppService.formData.SupplierName == '')
      this.isValid = false;

    else if (this.SuppService.formData.StoreId == null || this.SuppService.formData.StoreId == 0)
      this.isValid = false;

      
    return this.isValid;
  }


}
