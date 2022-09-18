import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CRMStages } from 'src/app/shared/Models/crm-stages';
import { CRMClientActions } from 'src/app/shared/Models/crm-client-actions';
import { Emps } from 'src/app/shared/Models/emps';

import { CRMClientActionsService } from 'src/app/shared/Services/crm-client-actions.service';
import { CRMStagesService } from 'src/app/shared/Services/crm-stages.service';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.css']
})
export class ClientActionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
    , public ClientActionsService: CRMClientActionsService, public EmpService: VacOrdersService
    , public StagesService: CRMStagesService, public toastr: ToastrService, public currentRoute: ActivatedRoute) { }

  StagesList: CRMStages[];
  CurrentEmpId: number;
  isEnabled: boolean = true;
  
  ngOnInit() {
    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));

    this.LoadDrops();
   
  
    this.resetForm();
    // if (clientId != null)
    //   this.populateForm(parseInt(clientId));
  }

  LoadDrops() {
    this.StagesService.getStages().subscribe(res => this.StagesList = res);
  }

  
  // populateForm(clientId: number) {
  //   this.ClientActionsService.getClientById(clientId).subscribe(res =>  
  //     {
  //       this.ClientActionsService.formData = res;
  //     } );
  // }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.ClientActionsService.formData = {
      ActionID: 0,
      ClientID : this.data["clientID"] ,
      ClientName: '',
      ActionDate: new Date(),
      ActionComment: '',
      EmpID: this.CurrentEmpId,
      EmpName: '',
      StageID: null,
      StageName: '',
      NewActionDate: null,
    }

  }

  onSubmit(form: NgForm)
  {
    
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.isEnabled = false;
    this.ClientActionsService.postClientActions().subscribe(
      res => {
        
        this.toastr.success('تم الحفظ بنجاح', 'اضافة متابعة');
        this.dialogRef.close();
        this.isEnabled = true;
      },
      err => { console.log(err);this.isEnabled = true; }
    )
  }

  ClosePopupEvent()
  {
    this.dialogRef.close();
  }

}
