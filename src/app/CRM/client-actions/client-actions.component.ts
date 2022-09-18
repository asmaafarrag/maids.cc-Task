import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CRMClientActions } from 'src/app/shared/Models/crm-client-actions';
import { CRMClientActionsService } from 'src/app/shared/Services/crm-client-actions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-actions',
  templateUrl: './client-actions.component.html',
  styleUrls: ['./client-actions.component.css']
})
export class ClientActionsComponent implements OnInit {
  

  constructor(private cRMClientActionsService: CRMClientActionsService, public currentRoute: ActivatedRoute, private router: Router) { }

  ClientActionslist: CRMClientActions[];
  CurrentEmpId: number;
  clientId : string;
  term:string;

  ngOnInit() {
    this.clientId = this.currentRoute.snapshot.paramMap.get('id')
    this.getClientActions(this.clientId);
  }

  getClientActions(clientId : string) {
    this.cRMClientActionsService.getClientActionsByClientID(clientId).subscribe(res => this.ClientActionslist = res);
  }

  returnToClient() {
    this.router.navigate(['/CrmClient/edit/' + this.clientId]);
  }

}
