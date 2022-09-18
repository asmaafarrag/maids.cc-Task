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
import { Customer } from '../../shared/Models/customer.model';

import { AccIncListQService } from '../../shared/Services/acc-inc-list-q.service'

import { Alignment } from 'pdfmake/interfaces';


import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/Services/customer.service';
import { Store } from 'src/app/shared/Models/Store';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  accountslist: Accounts[];
  storeslist: Store[];

  selectedAccount: Accounts;

  isValid: boolean = true;
  isEnabled: boolean = true;

  UserID: string;
  UserType: string;
  EmpID: string;

  constructor(public CustService: CustomerService, private servStockService: ServStockService, private servAccIncListQService: AccIncListQService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
    this.EmpID = localStorage.getItem('EmpID');
  }


  ngOnInit() {
    let CustId = this.currentRoute.snapshot.paramMap.get('id')
    this.getAccounts();
    this.getStores();
    this.resetForm();

    this.selectedAccount = new Accounts();

    if (CustId != null)
      this.populateForm(parseInt(CustId));
  }

  populateForm(CustId: number) {
    this.CustService.getCustomerById(CustId).subscribe(res => {
      this.CustService.formData = res;
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

  getAccounts() {
    //this.UserID = localStorage.getItem('lUsr');
    //this.servAccIncListQService.getAllAccounts().subscribe(res => this.accountslist = res);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.CustService.formData = {
      CustomerID: -1,
      CustomerName: '',
      AccountID: '',
      Tele: '',
      tele2: '',
      mob1: '',
      mob2: '',
      fax: '',
      Email: '',
      address: '',
      CustAccount: '',
      MaxLimit: '',
      OpenBalDebit: null,
      OpenBalCredit: null,
      StoreId: null,
      CustStoreDefaultId:null,
      RegistrationNumber:null,
      StoreName:'',
      CompanyTypeID:null,
      CompanyTypeName:'',
      CompanyTypeNameE:'',
      CountryName:'',
      CountryNameE:'',
      GovernateName:'',
      GovernateNameE:'',
      RegionCityName:'',
      RegionCityNameE:'',
      EnterpriseId:null,
      CountryID :null,
      GovernateId :null,
      RegionCityId  :null,
      street  : '',
      buildingNumber : '',
      postalCode : '',
      floor  : '',
      room  :  '',
      landmark  :'',
      additionalInformation :'',
         
    }
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.CustService.formData.CustomerID == -1) {
        this.CustService.postCustomer().subscribe(
          res => {
            this.showSuccess();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.isEnabled = true; }
        )
      }
      else {
        this.CustService.putCustomer().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/CustomersView']);
            //this.resetForm();

          },
          err => { console.log(err); this.isEnabled = true; }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ بيانات العميل', 'العملاء');
  }



  validateForm() {
    this.isValid = true;
    if (this.CustService.formData.CustomerName == null || this.CustService.formData.CustomerName == '')
      this.isValid = false;

    else if (this.CustService.formData.StoreId == null || this.CustService.formData.StoreId == 0)
      this.isValid = false;
      
    return this.isValid;
  }


}
