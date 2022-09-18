import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';

import { CRMProjects } from 'src/app/shared/Models/crm-projects';
import { CRMProjectsService } from 'src/app/shared/Services/crm-projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(public service: CRMProjectsService, public toastr: ToastrService, public currentRoute: ActivatedRoute) { }

  ngOnInit() {

    let projectId = this.currentRoute.snapshot.paramMap.get('id')
  
    this.resetForm();
    if (projectId != null)
      this.populateForm(parseInt(projectId));
  }

  populateForm(projectId: number) {
    this.service.getProjectById(projectId).subscribe(res =>  
      {
        this.service.formData = res;
      } );
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      ProjectID : 0,
      ProjectName : ''
    }

  }

  onSubmit(form: NgForm) {
    if(this.service.formData.ProjectID == 0)
    this.insertRecord(form);
    else 
    this.UpdateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postProject().subscribe(
      res => {

        this.toastr.success('تم الحفظ بنجاح', 'اضافة مشروع');
        this.resetForm(form);
      },
      err => { console.log(err); }
    )
  }

  UpdateRecord(form: NgForm) {
    this.service.putProject().subscribe(
      res => {

        this.toastr.success('تم الحفظ بنجاح', 'تعديل بيانات مشروع');
        this.resetForm(form);
      },
      err => { console.log(err); }
    )
  }


}
