import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CRMProjects } from 'src/app/shared/Models/crm-projects';
import { CRMProjectsService } from 'src/app/shared/Services/crm-projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  CRMProjectsList : CRMProjects[];
  term:string;
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  constructor(private cRMProjectsService: CRMProjectsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    let pageNo = localStorage.getItem("projectspage")
    this.page=+pageNo
    this.getProjects();
   

  }

  getProjects() {
    this.cRMProjectsService.getProjects().subscribe((data: any) => {
      this.CRMProjectsList = data;
     
    },
      (err: HttpErrorResponse) => {        
      }); 

  } 

  onProjectDelete(projectId: number) {
    if (confirm('هل انت متأكد من حذف هذا المشروع')) {
      this.cRMProjectsService.deleteProject(projectId).subscribe(
        res => {
          this.toastr.warning('تم الحذف بنجاح', 'حذف مشروع');
          this.getProjects();
        },
        err => { console.log(err); }
      );
    }
  }

  openForEdit(clientId: number) {
    this.router.navigate(['/CrmProject/edit/' + clientId]);
  }

  
 getRequestParams(searchTitle, page, pageSize) {
  // tslint:disable-next-line:prefer-const
  let params = {};

  //if (searchTitle) {
  //  params['title'] = searchTitle;
  //}

  if (page) {
    params['PageNumber'] = page  ;
  }

  if (pageSize) {
    params['PageSize'] = pageSize;
  }

  return params;
}


handlePageChange(event) {
  this.page = event;
  localStorage.setItem( "projectspage", event)
  this.getProjects();
}

handlePageSizeChange(event) {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getProjects();
}

}
