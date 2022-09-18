import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {

  term: string;

  ItemsList: Item[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 10;
  pageSizes = [10, 20, 30,40,50];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;

  constructor(private ItemServ: ItemService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
       
        this.getItems();
        
      }
    });
  }
  ngOnInit() {
    let pageNo = localStorage.getItem("itemspage")
    this.page=+pageNo
  
  }


  getItems() {
    const params = this.getRequestParams(this.term, this.page, this.pageSize);
      
      this.ItemServ.getItemsList(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.ItemsList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
     }

 

  openForEdit(itemId: number) {
    this.router.navigate(['/Items/edit/' + itemId]);
  }

  onOrderDelete(ItemIndex: number, ItemId: number) {
    if (confirm("هل انت متأكد من حذف هذا الصنف")) {
      this.ItemServ.deleteItem(ItemId).subscribe(
        res => {
          this.showDeleted();
          this.ItemsList.splice(ItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف الصنف', 'الاصناف');
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
    localStorage.setItem( "itemspage", event)
    this.getItems();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getItems();
  }

}
