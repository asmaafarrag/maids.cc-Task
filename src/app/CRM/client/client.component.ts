import { Component, OnInit , Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CRMClients } from 'src/app/shared/Models/crm-clients';
import { CRMProjects } from 'src/app/shared/Models/crm-projects';
import { CRMStages } from 'src/app/shared/Models/crm-stages';
import { CRMChannels } from 'src/app/shared/Models/crm-channels';
import { Emps } from 'src/app/shared/Models/emps';


import { CRMClientsService } from 'src/app/shared/Services/crm-clients.service';
import { CRMProjectsService } from 'src/app/shared/Services/crm-projects.service';
import { CRMStagesService } from 'src/app/shared/Services/crm-stages.service';
import { CRMChannelsService } from 'src/app/shared/Services/crm-channels.service';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { ClientActionComponent } from '../client-action/client-action.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  constructor(public service: CRMClientsService, public ProjectsService: CRMProjectsService
    , public StagesService: CRMStagesService, public ChannelsService: CRMChannelsService
    , public EmpService: VacOrdersService, public toastr: ToastrService, public currentRoute: ActivatedRoute,public dialog: MatDialog
    , private router: Router) { }
  ProjectsList: CRMProjects[];
  StagesList: CRMStages[];
  ChannelsList: CRMChannels[];
  Empslist: Emps[];
  CurrentEmpId: number;

  ngOnInit() {

    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));

    this.LoadDrops();
    let clientId = this.currentRoute.snapshot.paramMap.get('id')
  
    this.resetForm();
    if (clientId != null)
      this.populateForm(parseInt(clientId));
      
  }

  LoadDrops() {
    this.ProjectsService.getProjects().subscribe(res => this.ProjectsList = res);
    this.StagesService.getStages().subscribe(res => this.StagesList = res);
    this.ChannelsService.getChannels().subscribe(res => this.ChannelsList = res);
    this.EmpService.getEmps().subscribe(res => this.Empslist = res);

  }

  populateForm(clientId: number) {
    this.service.getClientById(clientId).subscribe(res =>  
      {
        this.service.formData = res;
      } );
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
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
      EmpID: this.CurrentEmpId,
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

  onSubmit(form: NgForm) {
    if(this.service.formData.ClientID == 0)
    this.insertRecord(form);
    else 
    this.UpdateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postClient().subscribe(
      res => {

        this.resetForm(form);
        this.toastr.success('تم الحفظ بنجاح', 'اضافة عميل');
        
      },
      err => { console.log(err); }
    )
  }

  UpdateRecord(form: NgForm) {
    this.service.putClient().subscribe(
      res => {

        this.resetForm(form);
        this.toastr.success('تم الحفظ بنجاح', 'تعديل بيانات عميل');
      },
      err => { console.log(err); }
    )
  }

  AddOrEditEvent(ClientID)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {clientID : ClientID};
    dialogConfig.direction = 'rtl';
    this.dialog.open(ClientActionComponent,dialogConfig);
  }

  openActionsReport() {
    this.router.navigate(['/CrmClientActions/report/' + this.service.formData.ClientID]);
  }


  route(){
    // if(localStorage.getItem("stageTypeId") == null){


    //   this.router.navigate(['CrmClients'])

    // }
    // else if(localStorage.getItem("stageTypeId") != null){

      let stageTypeId = localStorage.getItem("stageTypeId");
      // let clientId = localStorage.getItem("clientId");
      let clientspage = localStorage.getItem("clientspage");

      
      this.router.navigate(['CrmClients/view/'+ stageTypeId + '/' + clientspage ])

    // }
  }

  

}


