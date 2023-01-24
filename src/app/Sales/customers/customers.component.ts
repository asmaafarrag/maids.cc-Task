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

import { Observable, concat } from 'rxjs';
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
import { Branch } from 'src/app/shared/Models/branch';
import { BranchService } from 'src/app/shared/Services/branch.service';
import { RegionCity } from 'src/app/shared/Models/region-city';
import { Governate } from 'src/app/shared/Models/governate';
import { Country } from 'src/app/shared/Models/country';
import { GovernateService } from 'src/app/shared/Services/governate.service';
import { RegionCitiesService } from 'src/app/shared/Services/region-cities.service';
import { CountryService } from 'src/app/shared/Services/country.service';
import { CompanyType } from 'src/app/shared/Models/company-type';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  accountslist: Accounts[];
  storeslist: Store[];
  branchlist:Branch[];
  RegionCitylist:RegionCity[];
  Governatelist:Governate[];
  Countrylist:Country[];
  CompanyTypelist:CompanyType[];
  selectedAccount: Accounts;
  selectedCompanyType: CompanyType;
  lang:string = ''

  isValid: boolean = true;
  isEnabled: boolean = true;
  isCompany:boolean=false;
  UserID: string;
  UserType: string;
  EmpID: string;
  city;

  constructor(public CustService: CustomerService, private servStockService: ServStockService, private servAccIncListQService: AccIncListQService
    ,public  GovernateServ:GovernateService ,public regionServ:RegionCitiesService, public countryServ:CountryService , public BranchServ:BranchService , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
    this.EmpID = localStorage.getItem('EmpID');
  }


  ngOnInit() {
    let CustId = this.currentRoute.snapshot.paramMap.get('id')
    this.resetForm();
    this.lang = localStorage.getItem('lang');

    // this.CustService.formData.CountryID = 2145;
    // this.regionServ.getRegionCities().subscribe(res => this.RegionCitylist = res);
    // this.servStockService.getCompanyType().subscribe(res => this.CompanyTypelist = res);

    this.selectedAccount = new Accounts();

    if (CustId != null)
      this.populateForm(parseInt(CustId));
  }

  onSelect(governaate){

   let  id = null;
   if(governaate[1] === ':' )
   {

    id = governaate[0]

   }

   else{
     id = governaate[0].concat(governaate[1])
   }

   console.log(id , 'id');
  //  console.log(id , 'id');
    // this.city =this.RegionCitylist.filter(e => e.GovernateId == governaate);
    this.regionServ.getRegionCitiesGovernate(id).subscribe(res => this.RegionCitylist = res);
    console.log(this.RegionCitylist , "RegionCitylist")
    console.log(governaate , 'value');

  }

  populateForm(CustId: number) {
    this.CustService.getCustomerById(CustId).subscribe(res => {
      this.CustService.formData = res;

      console.log(this.CustService.formData  , 'this.CustService.formData ')
    });
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.CustService.formData = {
      // CustomerID: -1,
      // CustomerName: '',
      // AccountID: '',
      // Tele: '',
      // tele2: '',
      // mob1: '',
      // mob2: '',
      // fax: '',
      // Email: '',
      // address: '',
      // CustAccount: '',
      // MaxLimit: '',
      // OpenBalDebit: null,
      // OpenBalCredit: null,
      // StoreId: 1,
      // BranchId:null,
      // RegistrationNumber : null,
      // CompanyTypeID :null,
      // CompanyTypeName:'',
      // CountryID :null,
      // GovernateId :null,
      // RegionCityId :null,
      // RegionCityTxt:'',
      // street :'',
      // buildingNumber:'',
      // postalCode: '',
      // floor :'',
      // room: '',
      // landmark : '',
      // additionalInformation: '',
      // StoreName:'',
      // CompanyTypeNameE :'',
      // EnterpriseId:null,
      // CountryName :'',
      // CountryNameE :'',
      // GovernateName:'',
      // GovernateNameE:'',
      // GovernateTxt:'',
      // RegionCityName:'',
      // RegionCityNameE:'',
      // HasTaxGainCom:false,

      customer_ID:-1,
      customer_Name:'',
      customer_Enabled:true,
      commercial_Record:'',
      contracting_Representative:'',
      customer_Phone :'',
      entryUser :'',
      entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),

    }


  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.CustService.formData.customer_ID == -1) {

        console.log(this.CustService.formData , 'this.CustService.formData.')
        this.CustService.postCustomer().subscribe(
          res => {
            this.showSuccess();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.CustService.putCustomer().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/CustomersView']);
            this.resetForm();

          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ بيانات العميل', 'العملاء');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ العميل', 'العملاء');
  }



  validateForm() {
    this.isValid = true;
    if (this.CustService.formData.customer_Name == null || this.CustService.formData.customer_Name == '')
      this.isValid = false;

    else if (this.CustService.formData.commercial_Record == null || this.CustService.formData.commercial_Record == '')
      this.isValid = false;

    else if (this.CustService.formData.contracting_Representative == null || this.CustService.formData.contracting_Representative == '')
      this.isValid = false;
    // else if (this.CustService.formData.OpenBalCredit == null)
    //   this.isValid = false;
    // else if (this.CustService.formData.OpenBalDebit == null)
    //   this.isValid = false;

    else if (this.CustService.formData.customer_Phone == null || this.CustService.formData.customer_Phone == '')
      this.isValid = false;

    // else if (this.CustService.formData.OpenBalDebit != 0 && this.CustService.formData.OpenBalCredit != 0)
    //   this.isValid = false;

    // else if (this.CustService.formData.StoreId == null || this.CustService.formData.StoreId == 0)
    //   this.isValid = false;


    return this.isValid;
  }


}
