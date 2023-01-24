import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { Enterpriseservice } from 'src/app/shared/Services/enterprises.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.css']
})
export class EnterprisesComponent implements OnInit {


  isValid: boolean = true;
  isEnabled: boolean = true;

  UserID: string;

  constructor(public enterprisesServ: Enterpriseservice
    , private dialog: MatDialog, private toastr: ToastrService, public currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let Id = this.currentRoute.snapshot.paramMap.get('id')
    this.resetForm();

    if (Id != null)
      this.populateForm(parseInt(Id));
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.enterprisesServ.formData = {
      EnterpriseClientId :null,
      EnterpriseClientSecret:null,
      ActivityTypeID:null,
      ActivityTypeName:'',
      ActivityTypeNameE:'',
      CompanyTypeName:'',
      CompanyTypeNameE:'',
      EnterpriseId  :null,
      EnterpriseName  : '',
      EnterpriseNameE : '',
      RegistrationNumber :'',
      CompanyTypeID :null,
      EnterpriseClientSecretActive :'',
      EnterpriseClientIdActive : '',
      IsActivated:false,
      EnterpriseCertificateName:'',
    }
  }

  populateForm(Id: number) {
    this.enterprisesServ.getEnterprisesById(Id).subscribe(res => {
      this.enterprisesServ.formData = res;
      //this.addServ.formData.addDets = res.addDets
    });
  }

  onSubmit(form: NgForm) {
    console.log('aa');
    if (this.validateForm()) {
      this.isEnabled = false;

      if (this.enterprisesServ.formData.EnterpriseClientId == -1) {
        this.enterprisesServ.postEnterprises().subscribe(
          res => {
            this.showSuccess();
            //this.generatePdf();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        console.log('w');
        this.enterprisesServ.putEnterprises().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/EnterprisesView']);
            this.resetForm();
  
          },
          err => { console.log(err); this.isEnabled = true; }
        )
      }
    }
    
  }


  showSuccess() {
    this.toastr.success('تم حفظ البيانات', 'البيانات');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ البيانات', 'البيانات');
  }



  validateForm() {
    this.isValid = true;
    if (this.enterprisesServ.formData.EnterpriseClientSecret == null || this.enterprisesServ.formData.EnterpriseClientSecret == '')
      this.isValid = false;
    
    return this.isValid;
  }


}
  

