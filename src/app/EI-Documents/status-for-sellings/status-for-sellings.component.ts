import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CRMClientActions } from 'src/app/shared/Models/crm-client-actions';
import { CRMClientActionsService } from 'src/app/shared/Services/crm-client-actions.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentDetails } from 'src/app/shared/Models/document-details';

@Component({
  selector: 'app-status-for-sellings',
  templateUrl: './status-for-sellings.component.html',
  styleUrls: ['./status-for-sellings.component.css']
})
export class StatusForSellingsComponent implements OnInit {



  constructor(private cRMClientActionsService: CRMClientActionsService, public currentRoute: ActivatedRoute, private router: Router) { }

  ClientActionslist: DocumentDetails[];
  CurrentEmpId: number;
  saleInvId : string;
  term:string;

  ngOnInit() {
    // this.clientId = this.currentRoute.snapshot.paramMap.get('id')
     this.saleInvId = this.currentRoute.snapshot.paramMap.get('id')

    this.getClientActions(this.saleInvId);
  }

  getClientActions(saleInvId : string) {
    this.cRMClientActionsService.getClientActionsByClientID(saleInvId).subscribe(res => this.ClientActionslist = res);
  }

  returnToClient() {
    this.router.navigate(['/Invoice/edit/' + this.saleInvId]);
  }
}
