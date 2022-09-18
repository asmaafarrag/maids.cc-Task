import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientExcelsheetCRM, CRMClients } from 'src/app/shared/Models/crm-clients';
import { CRMClientsService } from 'src/app/shared/Services/crm-clients.service';

import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  currentIndex = -1;
  page: number = 1;
  pageA: number = 1;

  count: number = 0;
  pageSize: number = 20;
  pageSizes = [20, 30, 40 , 50 , 60 , 70 ,80 ,90 , 100];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;


  //lowValue: number = 0;
  //highValue: number = 50;
  CRMClientsList: CRMClients[];
  term: string;


  constructor(private cRMClientsService: CRMClientsService, private router: Router, 
     private toastr: ToastrService, private currentRoute: ActivatedRoute , private http: HttpClient) {
    //this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.GetData()
      }
    });
  }

  GetData() {
    let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')
    
    console.log(stageTypeId , "stageTypeIdA")
    if (stageTypeId == '6') {  //clients 
      // localStorage.getItem("stageTypeId");
      // localStorage.removeItem('stageTypeId')
      localStorage.setItem("stageTypeId",stageTypeId);
      

      // localStorage.removeItem('clientId')
      if (this.UserType.toUpperCase() == 'ADMIN')
        this.getClients();
      else
        this.getClientsByEmp();
    }
    else if (stageTypeId == '0') {  //مطلوب للمتابعة
      localStorage.setItem("stageTypeId",stageTypeId);
      
      if (this.UserType.toUpperCase() == 'ADMIN')
        this.GetAdminAlertsList();
      else
        this.GetEmpAlertsList();

    }
    else if (stageTypeId == '-1') {
      localStorage.setItem("stageTypeId",stageTypeId);

      this.GetEmpAlertsDelayList();
    }
    else {

      // if(stageTypeId != stageTypeId ){
      //   localStorage.setItem("clientspage",'1');
      // }
      localStorage.setItem("stageTypeId",stageTypeId);

      if (this.UserType.toUpperCase() == 'ADMIN')
        this.getStageClients(parseInt(stageTypeId));
      else
        this.getStageClientsByEmp(parseInt(stageTypeId));
    }

  }

  ngOnInit() {
    /*
    let stageId = this.currentRoute.snapshot.paramMap.get('id')
    console.log(stageId);
    if (stageId == null) {
      this.getClients();
    }
    else {
      this.getStageClients(parseInt(stageId));
    }
    */
   
    let pageNo = localStorage.getItem("clientspage")
    this.page=+pageNo
    this.pageA=+pageNo


    if(pageNo == null){
      this.pageA=1
    }
  
  }



  getClients() {
  
    let pageNo2 = localStorage.getItem("clientspage")

    console.log(this.page , 'pagggggggg')


    if(pageNo2 !=null){
        const params = this.getRequestParams(this.term, pageNo2, this.pageSize);
        console.log(this.term);
        this.cRMClientsService.getClients(params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.CRMClientsList = Data;
          this.count = TotalRecords;
        },
        err => {
          console.log(err);
        });
    }

    else if(pageNo2 == null){
    
     console.log(this.page , 'ppppppppppppppppppppppppppppppage');

      const params = this.getRequestParams(this.term, this.page, this.pageSize);
      console.log(this.term);
      this.cRMClientsService.getClients(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.CRMClientsList = Data;
        this.count = TotalRecords;
      },
      err => {
        console.log(err);
      });
    }

  
  }

  getClientsByEmp() {
    this.cRMClientsService.getClientsByEmp(this.EmpID).subscribe(res => this.CRMClientsList = res);
  }

  GetEmpAlertsList() {
    this.cRMClientsService.GetEmpAlertsList(parseInt(this.EmpID)).subscribe(res => this.CRMClientsList = res);
  }

  GetAdminAlertsList() {
    this.cRMClientsService.GetAdminAlertsList().subscribe(res => this.CRMClientsList = res);
  }


  GetEmpAlertsDelayList() {
    this.cRMClientsService.GetEmpAlertsDelayList(parseInt(this.EmpID)).subscribe(res => this.CRMClientsList = res);
  }

  getStageClients(stageTypeId: number) {
    this.cRMClientsService.getStageTypeClients(stageTypeId).subscribe(res => this.CRMClientsList = res);
  }

  getStageClientsByEmp(stageTypeId: number) {
    this.cRMClientsService.getStageTypeClientsByEmp(stageTypeId, this.EmpID).subscribe(res => this.CRMClientsList = res);
  }

  onOrderDelete(clientId: number) {
    if (confirm('هل انت متأكد من حذف هذا العميل')) {
      this.cRMClientsService.deleteClient(clientId).subscribe(
        res => {
          this.toastr.warning('تم الحذف بنجاح', 'حذف عميل');
          this.getClients();
        },
        err => { console.log(err); }
      );
    }
  }

  openForEdit(clientId: number) {
    localStorage.setItem('clientId', clientId.toString())

    this.router.navigate(['/CrmClient/edit/' + clientId]);
  }


  // getPaginatorData(event) {
  //   if (event.pageIndex === this.pageIndex + 1) {
  //     this.lowValue = this.lowValue + this.pageSize;
  //     this.highValue = this.highValue + this.pageSize;
  //   }
  //   else if (event.pageIndex === this.pageIndex - 1) {
  //     this.lowValue = this.lowValue - this.pageSize;
  //     this.highValue = this.highValue - this.pageSize;
  //   }
  //   this.pageIndex = event.pageIndex;
  // }

  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params['SearchString'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    this.pageA = event;
    localStorage.setItem( "clientspage", event)
    this.GetData();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.pageA =  this.page;
    this.GetData();
    this.goToPage(event)
  }

  goToPage(page: number) {
    
    // check to make sure number is valid
    // if(this.page <= 1 || this.page >= this.pageSizes.length || isNaN(this.page)) {
      // alert("invalid page selected");
      // this.page = this.page;
    // }

    //  else {
      this.page = page;
      page = this.page;
      localStorage.setItem('clientspage' , page.toString() )
      this.GetData()
   
      // this.page = this.page;
    // }
  }

}
