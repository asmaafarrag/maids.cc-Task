import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Customer } from 'src/app/shared/Models/customer.model';
import { CustomerService } from 'src/app/shared/Services/customer.service';

import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.css']
})
export class CustomersViewComponent implements OnInit {

  term: string;

  custList: Customer[];
  currentIndex = -1;
  page: number = 0;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20, 50 , 60 ,80 ,100];
  title: string = '';

  UserID: string;
  UserType: string;
  EmpID : string;

  constructor(private CustServ: CustomerService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute
    , private ExcelServ: ExcelService) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
   this.EmpID =localStorage.getItem('EmpID');
   sessionStorage.setItem( 'Customercount' , JSON.stringify(this.count))


    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getCustomersList();

      }
    });
  }


  ngOnInit(): void {
    sessionStorage.setItem( 'Customercount' , JSON.stringify(this.count))

  }

  getCustomersList() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
      this.CustServ.getCustomersList(params).subscribe(res => {

        console.log(res,"res")
        // const { TotalRecords, Data } = res;
        this.custList =  res.data;
        this.count = res.recordsTotal;
      },
        err => { console.log(err); });




  }

  openForEdit(custId: number) {
    this.router.navigate(['/Customers/edit/' + custId]);
  }


  onOrderDelete(Index: number,Id: number) {
    if (confirm("هل انت متأكد من حذف هذا العميل")) {
      this.CustServ.deleteCustomer(Id).subscribe(
        res => {
          this.showDeleted();
          this.custList.splice(Index, 1);
        },
        err => {
          console.log(err);
        }
      )


    }
  }


  showDeleted() {
    this.toastr.info('تم حذف العميل', 'العميل ');
  }


  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
     params['Key'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page-1 ;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    this.getCustomersList();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCustomersList();
  }


  fnExport() {
    this.ExcelServ.exportToFile('Customer', 'Tbl');
  }

  fnImport() {
    this.ExcelServ.exportToFile('Customer', 'Tbl');
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    var obj = { CustomerName: 'a', CompanyTypeName: 'b', Tele: 'c' , mob1: 'c', CountryName: 'c'

    ,GovernateName: 'c'  , RegionCityName:'c' , street:'c', buildingNumber:'c' ,  postalCode:'c'

    ,floor:'c', room:'c' , landmark:'c', additionalInformation: 'c',  StoreName:'c' , OpenBalDebit:'c'

    ,OpenBalCredit :'c' , RegistrationNumber:'c'
    };
     //const header: string[] = Object.getOwnPropertyNames(new SalesSaleInv());
      const header: string[] = Object.getOwnPropertyNames(obj);
      console.log(header);

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.ExcelServ.importFromFile(bstr);



      const importedData = data.slice(1, -1);

      this.custList = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <Customer>obj;
      })

    };
    reader.readAsBinaryString(target.files[0]);

  }
}
