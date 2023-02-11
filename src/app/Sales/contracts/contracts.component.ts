import { CustomersComponent } from './../customers/customers.component';
import { CustomerComponent } from './../../EI-Codes/customer/customer.component';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { CustomerService } from 'src/app/shared/Services/customer.service';
import { ContractsService } from './../../shared/Services/contracts.service';
import { Component, OnInit , Input , Injectable , Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, concat } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Accounts } from '../../shared/Models/accounts.model';
import { Customer } from '../../shared/Models/customer.model';

import { AccIncListQService } from '../../shared/Services/acc-inc-list-q.service'

import { Alignment } from 'pdfmake/interfaces';


import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { ToastrService } from 'ngx-toastr';



// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import {
//   NgbDateStruct, NgbCalendar, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura,
//   NgbDatepickerI18n, NgbModal, ModalDismissReasons
// } from '@ng-bootstrap/ng-bootstrap';


// const I18N_VALUES = {
//   weekdays: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
//   months: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
//     'ذو القعدة', 'ذو الحجة']
// };

// @Injectable()
// export class IslamicI18n extends NgbDatepickerI18n {

//   constructor() {
//     super();
//   }

//   getWeekdayShortName(weekday: number) {
//     return I18N_VALUES.weekdays[weekday - 1];
//   }

//   getMonthShortName(month: number) {
//     return I18N_VALUES.months[month - 1];
//   }

//   getMonthFullName(month: number) {
//     return this.getMonthShortName(month);
//   }

//   getDayAriaLabel(date: NgbDateStruct): string {
//     return `${date.day}-${date.month}-${date.year}`;
//   }
// }

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  // private innerValue: string;
  // private changed = [];
  // private touched = [];
  // private disabled: boolean;

  // @Input() id: string;
  // @Input() name: string;
  // @Input() placeholder: string;

  // get value(): string {
  //   return this.innerValue;
  // }

  // set value(value: string) {
  //   if (this.innerValue !== value) {
  //     this.innerValue = value;
  //     this.changed.forEach(f => f(value));
  //   }
  // }


  // registerOnChange(fn: any): void {
  //   this.changed.push(fn);
  // }

  // registerOnTouched(fn: any): void {
  //   this.touched.push(fn);
  // }

  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // writeValue(obj: string): void {
  //   this.innerValue = obj;
  // }

  CustomerList:Customer[];
  selectedCustomer: Customer;

  isValid: boolean = true;
  isEnabled: boolean = true;
  UserID: string;
  UserType: string;
  EmpID: string;
  priceIDD:number;
  priceDate:string;
  CustomerName = "";
  stateCtrl = new FormControl();
  filteredStates: Observable<Customer[]>;
  editM:boolean=false;
  print:boolean=false;
  contract_IDP:number;
  url = 'http://pergola-api.minicodeco.com/api/Contracts/print-contract/'

  // date:  NgbDate;
  // selectedDateType  =  DateType.Hijri;  // or DateType.Gregorian

  constructor(public ServStockService: ServStockService, public contractServ:ContractsService , public PriceListsServ : PriceListsService
   ,private dialog: MatDialog, private toastr: ToastrService,
    public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
    this.EmpID = localStorage.getItem('EmpID');
  }


  ngOnInit() {
    let Id = this.currentRoute.snapshot.paramMap.get('id')
    this.resetForm();
    this.ResetForm();

    this.priceIDD =  +localStorage.getItem('priceIDD');

    console.log( this.priceIDD)
    if ( this.priceIDD == 0){

      this.populateForm(parseInt(Id));



    }
    else{

      this.ServStockService.getCustomers().subscribe(res => this.CustomerList = res);
      console.log(this.CustomerList , "this.CustomerList")


      this.PriceListsServ.getPriceListsById(this.priceIDD).subscribe(res => {
        this.PriceListsServ.formData = res;

        this.priceDate = ( this.PriceListsServ.formData.priceList_Date);
        this.contractServ.formData.customer_Name =   this.PriceListsServ.formData.priceList_Customer;


        let CustObj = this.CustomerList.filter(s => s.customer_Name ===  this.PriceListsServ.formData.priceList_Customer)
        // let studentObj =  this.CustomerList.find(t=>t.customer_Name === this.PriceListsServ.formData.priceList_Customer);
        this.contractServ.formData.customer_ID = CustObj[0].customer_ID ;

        console.log(CustObj ,  this.contractServ.formData.customer_ID)
        console.log( res)
      });

    }


    // this.contractServ.formData.contract_Hijri = new Date().toLocaleDateString(
    //   'ar-FR-u-ca-islamic',
    //   { timeZone: 'UTC', month: 'numeric', day: 'numeric', year: 'numeric' }
    // );

    this.getCustomers();

    // this.ServStockService.getCustomers().subscribe(res => this.CustomerList = res);

    this.selectedCustomer = new Customer();

    // if (Id != null)
    //   this.populateForm(parseInt(Id));
  }


  printPdf(id:number){

    window.open(this.url + id , '_blank');
  }

  getCustomers() {
    this.ServStockService.getCustomers().subscribe((data: any) => {
      this.CustomerList = data;
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.CustomerName),
          map(state => state ? this._filterStates(state) : this.CustomerList.slice())
        );
    },
      (err: HttpErrorResponse) => {
      });
  }

  private _filterStates(value: string): Customer[] {
    console.log(value , 'v')
    const filterValue = value.toLowerCase();

    return this.CustomerList.filter(state => state.customer_Name.toLowerCase().indexOf(filterValue) >= 0);

  }

  displayFn(Item?: Customer): string | undefined {


    console.log(Item , 'ittt')

      return Item ? Item.customer_Name : undefined;
  }


  populateForm(Id: number) {

    this.contractServ.getContractsById(Id).subscribe(res => {
      this.contractServ.formData = res;



      this.PriceListsServ.formData.priceList_Date = this.contractServ.formData.priceList_Date


      this.editM = true;
      this.print = true;
      // this.priceIDD =  this.contractServ.formData.priceList_ID

      // this.selectedCustomer.customer_Name =   this.contractServ.formData.customer_Name;

      console.log(this.selectedCustomer)
      console.log(this.contractServ.formData  , 'this.CustService.formData ')

      // this.ngOnInit();
    });


  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.contractServ.formData = {

      contract_ID:-1,
      contract_Code:null,
      contract_Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      contract_Hijri: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      priceList_ID:null ,
      priceList_Date:  this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      priceList_Customer:'',
      customer_ID:null,
      customer_Name:'',
      ContractJobOrders:[],
      ContractPayments: [],
      entryUser :'',
      contract_DiscountValue:0,
      entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),

    }

    this.contractServ.formData.ContractJobOrders = [];
    this.contractServ.formData.ContractPayments = [];


  }

  ResetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.PriceListsServ.formData = {

      priceList_ID:-1,
      customer_ID:null,
      priceList_Customer :'',
      priceList_Representative :'',
        priceList_Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        priceList_Validity :'',
        priceList_Total :0,
        supplying_Duration:null,
        payment_First_Percent :null,
        payment_First_Value :null,
        payment_Second_Percent :null,
        payment_Second_Value :null,
        payment_Third_Percent :null,
        payment_Third_Value :null,
        attachment_1_File:'',
        attachment_2_File:'',
        attachment_1_URL:'',
        attachment_2_URL:'',
        exchangeRate:null,
        has_Contract:false,
        priceListItems:[],
        priceListOtherItems:[],
        priceListAddOns:[],
        entryUser :'',
        priceList_DiscountRate:0,
        entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),

    }

    this.PriceListsServ.formData.priceListItems = [];
    this.PriceListsServ.formData.priceListOtherItems = [];
    this.PriceListsServ.formData.priceListAddOns = [];


  }

  // setSelectedCustomer(cust) {
  //   console.log(cust ,"cust")
  //   this.selectedCustomer = this.CustomerList.find(x => x.customer_ID == cust);

  // }


  AddOrEditSalInvItems() {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      // var StoreId = this.servSellingRet.formData.StoreId;
      // dialogConfig.data = { orderItemIndex };
      this.dialog.open(CustomerComponent, dialogConfig).afterClosed().subscribe(res => {  this.ServStockService.getCustomers().subscribe(res => this.CustomerList = res);

      });

  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      this.contractServ.formData.priceList_ID = this.priceIDD;
      this.contractServ.formData.priceList_Date = this.priceDate;
      // this.contractServ.formData.customer_ID =  this.selectedCustomer.customer_ID ;
      // this.contractServ.formData.customer_Name =  this.selectedCustomer.customer_Name ;
      if (this.contractServ.formData.contract_ID == -1) {
        console.log(this.contractServ.formData ,"this.contractServ.formData")
        this.contractServ.postContracts().subscribe(
          res => {
            this.showSuccess();
            // this.print = true;
            // this.contract_IDP = this.contractServ.formData.contract_ID ;
            // console.log( this.contract_IDP, " this.contract_IDP")
            // this.resetForm();

            this.isEnabled = true;
            localStorage.removeItem('priceIDD');
            this.router.navigate(['/contractsView']);


          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
      console.log(  this.contractServ.formData, " this.contract_IDP")

        this.contractServ.putContracts().subscribe(
          res => {
            this.showSuccess();
            localStorage.removeItem('priceIDD');
            // this.router.navigate(['/ContractView']);
            // this.resetForm();

          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ بيانات العقد', 'العقد');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ العقد', 'العقد');
  }



  validateForm() {
    this.isValid = true;
    if (this.contractServ.formData.contract_Date == null || this.contractServ.formData.contract_Date == '')
      this.isValid = false;

    // else if (this.contractServ.formData.contract_Hijri == null  || this.contractServ.formData.contract_Hijri == '')
    //   this.isValid = false;

    // else if (this.contractServ.formData.customer_Name == null  || this.contractServ.formData.customer_Name == '')
    //   this.isValid = false;

    return this.isValid;
  }
}
