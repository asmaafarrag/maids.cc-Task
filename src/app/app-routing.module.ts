import { RepPurchAnalysisComponent } from './rep-purch-analysis/rep-purch-analysis.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepStockComponent } from './rep-stock/rep-stock.component';
import { RepSellingDetComponent } from './rep-selling-det/rep-selling-det.component';
import { RepIncomeStatmentComponent } from './rep-income-statment/rep-income-statment.component';
import { RepAccStatementComponent } from './rep-acc-statement/rep-acc-statement.component';

import { SalesRequestOrderComponent } from './sales-request-order/sales-request-order.component';

import { ClientsComponent } from './CRM/clients/clients.component';
import { ClientComponent } from './CRM/client/client.component';
import { ProjectsComponent } from './CRM/projects/projects.component';
import { ProjectComponent } from './CRM/project/project.component';
import { ClientActionComponent } from './CRM/client-action/client-action.component';
import { ClientActionsComponent } from './CRM/client-actions/client-actions.component';

import { VacOrderComponent } from './HR/vac-order/vac-order.component';

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

import { AuthGuard } from './auth/auth.guard';
import { VacOrdersComponent } from './HR/vac-orders/vac-orders.component';
import { RepEmpVacComponent } from './HR/rep-emp-vac/rep-emp-vac.component';
import { EmpPermitComponent } from './HR/emp-permit/emp-permit.component';
import { EmpPermitsComponent } from './HR/emp-permits/emp-permits.component';

import { HousesComponent } from './RealState/houses/houses.component';
import { ReserveUnitsComponent } from './RealState/reserve-units/reserve-units.component';

import { SaleInvsComponent } from './Sales/sale-invs/sale-invs.component';
import { SaleInvViewComponent } from './Sales/sale-inv-view/sale-inv-view.component';
import { ItemsComponent } from './Sales/items/items.component';

import { InvsInComponent } from './Sales/invs-in/invs-in.component';
import { InvsInViewComponent } from './Sales/invs-in-view/invs-in-view.component';
import { InvsOutComponent } from './Sales/invs-out/invs-out.component';
import { InvsOutViewComponent } from './Sales/invs-out-view/invs-out-view.component';

import { TransBetStoresComponent } from './Sales/trans-bet-stores/trans-bet-stores.component';
import { TransBetStoresViewComponent } from './Sales/trans-bet-stores-view/trans-bet-stores-view.component';
import { AddsViewComponent } from './Sales/adds-view/adds-view.component';
import { AddsComponent } from './Sales/adds/adds.component';
import { AddRetsViewComponent } from './Sales/add-rets-view/add-rets-view.component';
import { AddRetsComponent } from './Sales/add-rets/add-rets.component';
import { PurchasingsViewComponent } from './Purchase/purchasings-view/purchasings-view.component';
import { PurchasingsComponent } from './Purchase/purchasings/purchasings.component';
import { CustomersComponent } from './Sales/customers/customers.component';
import { CustomersViewComponent } from './Sales/customers-view/customers-view.component';
import { ItemCardView } from './shared/Models/item-card-view';
import { RepItemCardViewComponent } from './rep-item-card-view/rep-item-card-view.component';
import { SuppliersViewComponent } from './Purchase/suppliers-view/suppliers-view.component';
import { SuppliersComponent } from './Purchase/suppliers/suppliers.component';
import { ItemsViewComponent } from './Sales/items-view/items-view.component';
import { SellingRetsViewComponent } from './Sales/selling-rets-view/selling-rets-view.component';
import { SellingRetsComponent } from './Sales/selling-rets/selling-rets.component';
import { PurchasingForSellingComponent } from './Purchase/purchasing-for-selling/purchasing-for-selling.component';

import { CustDiscountsViewComponent } from './Sales/cust-discounts-view/cust-discounts-view.component';
import { CustDiscountsComponent } from './Sales/cust-discounts/cust-discounts.component';
import { SuppDiscountsViewComponent } from './Purchase/supp-discounts-view/supp-discounts-view.component';
import { SuppDiscountsComponent } from './Purchase/supp-discounts/supp-discounts.component';
import { RepInventoryComponent } from './rep-inventory/rep-inventory.component';
import { RepInventoryItemsComponent } from './rep-inventory-items/rep-inventory-items.component';
import { SalesAnalysisReportComponent } from './sales-analysis-report/sales-analysis-report.component';
import { PdfComponent } from './pdf/pdf.component';
import { ChangeItemPriceComponent } from './sales/change-item-price/change-item-price.component';
import { ImportClientsComponent } from './CRM/import-clients/import-clients.component';
import { ExampleComponent } from './crm/example/example.component';
import { ChangeClientsComponent } from './CRM/change-clients/change-clients.component';
import { PriceListViewComponent } from './sales/price-list-view/price-list-view.component';
import { PriceListComponent } from './sales/price-list/price-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'repStock', component: RepStockComponent, canActivate: [AuthGuard] },
  { path: 'repSellingDet', component: RepSellingDetComponent, canActivate: [AuthGuard] },
  { path: 'RepIncomeStatment', component: RepIncomeStatmentComponent, canActivate: [AuthGuard] },
  { path: 'RepAccStatement', component: RepAccStatementComponent, canActivate: [AuthGuard] },
  { path: 'SalesRequestOrder', component: SalesRequestOrderComponent, canActivate: [AuthGuard] },
  { path: 'repInventory', component: RepInventoryComponent, canActivate: [AuthGuard] },
  { path: 'repInventoryItems', component: RepInventoryItemsComponent, canActivate: [AuthGuard] },
  { path: 'repSalesAnalysis', component: SalesAnalysisReportComponent, canActivate: [AuthGuard] },
  { path: 'repPurchasingsAnalysis', component: RepPurchAnalysisComponent, canActivate: [AuthGuard] },

  { path: 'pdf', component: PdfComponent, canActivate: [AuthGuard] },
  { path: 'ChangeItemPrice', component: ChangeItemPriceComponent, canActivate: [AuthGuard] },
  { path: 'ImportClients', component: ImportClientsComponent, canActivate: [AuthGuard] },

  { path: 'ChangeClients', component: ChangeClientsComponent, canActivate: [AuthGuard] },

  {
    path: 'CrmClients', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ClientsComponent, pathMatch: 'full' },
      { path: 'view/:id', component: ClientsComponent, pathMatch: 'full' },
      { path: 'view/:id/:clientspage', component: ClientsComponent, pathMatch: 'full' }
    ]
  },

  {
    path: 'test', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ExampleComponent, pathMatch: 'full' },
      { path: 'view/:id', component: ExampleComponent, pathMatch: 'full' },
      { path: 'view/:id/:clientspage', component: ExampleComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'CrmClient', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ClientComponent },
      { path: 'edit/:id', component: ClientComponent }
    ]
  },
  {
    path: 'CrmClientAction', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ClientActionComponent },
      { path: 'edit/:id', component: ClientActionComponent }
    ]
  },
  {
    path: 'CrmClientActions', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ClientActionsComponent },
      { path: 'report/:id', component: ClientActionsComponent }
    ]
  },

  { path: 'CrmProjects', component: ProjectsComponent, canActivate: [AuthGuard] },
  {
    path: 'CrmProject', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ProjectComponent },
      { path: 'edit/:id', component: ProjectComponent }
    ]
  },



  { path: 'VacOrd', component: VacOrderComponent, canActivate: [AuthGuard] },
  { path: 'VacOrds', component: VacOrdersComponent, canActivate: [AuthGuard] },
  { path: 'RepEmpVacs', component: RepEmpVacComponent, canActivate: [AuthGuard] },

  { path: 'EmpPermit', component: EmpPermitComponent, canActivate: [AuthGuard] },
  { path: 'EmpPermits', component: EmpPermitsComponent, canActivate: [AuthGuard] },

  { path: 'Houses', component: HousesComponent, canActivate: [AuthGuard] },
  { path: 'ReserveUnits', component: ReserveUnitsComponent, canActivate: [AuthGuard] },

  { path: 'SaleInvView', component: SaleInvViewComponent, canActivate: [AuthGuard] },

  {
    path: 'SaleInvs', canActivate: [AuthGuard]
    , children: [
      { path: '', component: SaleInvsComponent },
      { path: 'edit/:id', component: SaleInvsComponent }
    ]
  },

  { path: 'InvInView', component: InvsInViewComponent, canActivate: [AuthGuard] },
  {
    path: 'InvIn', canActivate: [AuthGuard]
    , children: [
      { path: '', component: InvsInComponent },
      { path: 'edit/:id', component:InvsInComponent  }
    ]
  },

  { path: 'InvOutView', component: InvsOutViewComponent, canActivate: [AuthGuard] },
  {
    path: 'InvOut', canActivate: [AuthGuard]
    , children: [
      { path: '', component: InvsOutComponent },
      { path: 'edit/:id', component: InvsOutComponent }
    ]
  },

  { path: 'TransBetStoresView', component: TransBetStoresViewComponent, canActivate: [AuthGuard] },

  {
    path: 'TransBetStores', canActivate: [AuthGuard]
    , children: [
      { path: '', component: TransBetStoresComponent },
      { path: 'edit/:id', component: TransBetStoresComponent }
    ]
  },

  { path: 'AddsView', component: AddsViewComponent, canActivate: [AuthGuard] },

  {
    path: 'Adds', canActivate: [AuthGuard]
    , children: [
      { path: '', component: AddsComponent },
      { path: 'edit/:id', component: AddsComponent }
    ]
  },

  { path: 'AddRetsView', component: AddRetsViewComponent, canActivate: [AuthGuard] },

  {
    path: 'AddRets', canActivate: [AuthGuard]
    , children: [
      { path: '', component: AddRetsComponent },
      { path: 'edit/:id', component: AddRetsComponent }
    ]
  },

  { path: 'PurchasingsView', component: PurchasingsViewComponent, canActivate: [AuthGuard] },
  { path: 'PurchasingForSelling', component: PurchasingForSellingComponent, canActivate: [AuthGuard] },

  {
    path: 'Purchasings', canActivate: [AuthGuard]
    , children: [
      { path: '', component: PurchasingsComponent },
      { path: 'edit/:id', component: PurchasingsComponent }
    ]
  },

  { path: 'CustomersView', component: CustomersViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Customers', canActivate: [AuthGuard]
    , children: [
      { path: '', component: CustomersComponent },
      { path: 'edit/:id', component: CustomersComponent }
    ]
  },

  { path: 'SuppliersView', component: SuppliersViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Suppliers', canActivate: [AuthGuard]
    , children: [
      { path: '', component: SuppliersComponent },
      { path: 'edit/:id', component: SuppliersComponent }
    ]
  },

  { path: 'RepItemCardView', component: RepItemCardViewComponent, canActivate: [AuthGuard] },

  { path: 'ItemsView', component: ItemsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Items', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ItemsComponent },
      { path: 'edit/:id', component: ItemsComponent }
    ]
  },

  { path: 'CustDiscView', component: CustDiscountsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'CustDisc', canActivate: [AuthGuard]
    , children: [
      { path: '', component: CustDiscountsComponent },
      { path: 'edit/:id', component: CustDiscountsComponent }
    ]
  },

  { path: 'SuppDiscView', component: SuppDiscountsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'SuppDisc', canActivate: [AuthGuard]
    , children: [
      { path: '', component: SuppDiscountsComponent },
      { path: 'edit/:id', component: SuppDiscountsComponent }
    ]
  },

  

  { path: 'SellingRetsView', component: SellingRetsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'SellingRets', canActivate: [AuthGuard]
    , children: [
      { path: '', component: SellingRetsComponent },
      { path: 'edit/:id', component: SellingRetsComponent }
    ]
  },
// عرض الاسعار

{ path: 'priceListView', component: PriceListViewComponent, canActivate: [AuthGuard] },
{
  path: 'PriceList', canActivate: [AuthGuard]
  , children: [
    { path: '', component: PriceListComponent},
    { path: 'edit/:id', component: PriceListComponent }
  ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
