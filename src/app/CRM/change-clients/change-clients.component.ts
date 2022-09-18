import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientExcelsheetCRM, CRMClients } from 'src/app/shared/Models/crm-clients';
import { CRMClientsService } from 'src/app/shared/Services/crm-clients.service';

import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';
import * as XLSX from 'xlsx';
import { Emps } from 'src/app/shared/Models/emps';
@Component({
  selector: 'app-change-clients',
  templateUrl: './change-clients.component.html',
  styleUrls: ['./change-clients.component.css']
})
export class ChangeClientsComponent implements OnInit {

 
  currentIndex = -1;
  page: number = 1;
  pageA: number = 1;

  count: number = 0;
  countt: number = 0;

  pageSize: number = 20;
  pageSizes = [20, 30, 40 , 50 , 60 , 70 ,80 ,90 , 100];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;
  checked = true;
  disabled = true;
  Empslist: Emps[];
  Temp:CRMClients[];
  selectedEmp:Emps;
  //lowValue: number = 0;
  //highValue: number = 50;
  CRMClientsList: CRMClients[];
  CRMClientsListt: CRMClients[];
  term: string;
  CurrentEmpId: number;


  constructor(public cRMClientsService: CRMClientsService, private router: Router, public EmpService: VacOrdersService,
     private toastr: ToastrService, private currentRoute: ActivatedRoute , private http: HttpClient) {
    //this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getClients();      }
    });
  }

 

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.cRMClientsService.formData = {
      ClientID: 0,
      ClientName: '',
      ClientMobile: '',
      ProjectID: null,
      ProjectName: '',
      CreationDate: new Date(),
      StageID: 2,
      StageName: '',
      ChannelName: '',
      ChannelID: null,
      LastComment: '',
      EmpID: null,
      NextActionDate: null,
      LastActionDate: null,
      EmpName: '',
      ClientPhone: '',
      ClientAddress: '',
      ClientCity: '',
      ClientCityState: '',
      ClientWebSite: '',
      ClientWorkField:'',
      ContactPerson: '',
      ContactPersonJob: '',
      ContactPersonMobile: '',
      ContactPersonEmail:'',
      isSelected:false,
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
   
    this.resetForm();
    this.EmpService.getEmps().subscribe(res => this.Empslist = res);

    console.log(this.Empslist  , 'this.Empslist ')

   
    let pageNo = localStorage.getItem("clientspage")
    this.page=+pageNo
    this.pageA=+pageNo


    if(pageNo == null){
      this.pageA=1
    }
  
  }

  public onSellingSelectedChanged(value: boolean, SellingIndex: number) {

    console.log(this.CRMClientsList[SellingIndex]);
    this.CRMClientsList[SellingIndex].isSelected = value;


    console.log(this.cRMClientsService.formData.EmpID ,  'eeeeee') 
    
    console.log(this.CRMClientsList[SellingIndex].isSelected , "this.CRMClientsList[SellingIndex].isSelected")
 
    var marvelHeroes = this.CRMClientsList.filter(function (hero) { 
  
      return hero.isSelected == true;
      
 
    });

    
     this.countt = marvelHeroes.length

    this.CRMClientsListt = marvelHeroes;

    for(var i=0;i<this.CRMClientsListt.length;i++)
    
    {
      this.CRMClientsListt[i].EmpID = this.cRMClientsService.formData.EmpID;
      // this.CRMClientsListt[i].EmpName = this.cRMClientsService.formData.EmpName;

      console.log( this.CRMClientsListt, 'CRMClientsListt')



    
    }

    // console.log(marvelHeroes , this.CRMClientsListt, 'marvelHeroes')

    // console.log( this.cRMClientsService.formData.EmpID , 'empid')

 
    

  }

  public isChecked$ = new BehaviorSubject(false);
  toggleChecked(value:boolean) {
    if(value === true)
    {
      for(var i=0;i<this.CRMClientsList.length;i++)
      {
        this.CRMClientsList[i].isSelected = true;

      
      }
    }
    else
    {
      for(var i=0;i<this.CRMClientsList.length;i++)
      {
        this.CRMClientsList[i].isSelected = false;
        console.log(this.CRMClientsList[i]);
      }
    }


  }


  putChange(){
  

    console.log(this.cRMClientsService.formData.EmpID , 'enmp')

    console.log(this.CRMClientsListt , '8')

    this.cRMClientsService.putClientList(this.CRMClientsListt).subscribe(
      res => {
        // console.log(res,'res')
        this.showSuccess();
        this.getClients();
        // this.resetForm();
    
      },
      
      err => { console.log(err); this.showError(); }
    )

    console.log(this.CRMClientsListt , '9')
  }


  setSelectedEmp(str){

    this.selectedEmp = str;

    
    console.log(  str , ' this.selectedEmpSTTTTTTT')
  }
   
  showSuccess() {
    this.toastr.success('تم حفظ التغير', 'التغييرات');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ التغير', 'التغييرات');
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
    this.getClients();  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.pageA =  this.page;
    this.getClients();
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
      this.getClients();   
      // this.page = this.page;
    // }
  }



}
