import { PriceListItemComponent } from './Sales/price-list-item/price-list-item.component';
import { PriceListReportsComponent } from './Sales/price-list-reports/price-list-reports.component';
import { UserReportsComponent } from './Sales/user-reports/user-reports.component';
import { UserViewComponent } from './Sales/user-view/user-view.component';
import { UserComponent } from './Sales/user/user.component';
import { InvoiceExcelComponent } from './invoice-excel/invoice-excel.component';
import { ContractPdfComponent } from './Sales/contract-pdf/contract-pdf.component';
import { PdfviewComponent } from './Sales/pdfview/pdfview.component';
import { ContractsViewComponent } from './Sales/contracts-view/contracts-view.component';
import { ContractsComponent } from './Sales/contracts/contracts.component';
import { ItemLineComponent } from './Sales/item-line/item-line.component';
import { PriceListViewComponent } from './Sales/price-list-view/price-list-view.component';
import { PriceListComponent } from './Sales/price-list/price-list.component';
import { ChangeItemPriceComponent } from './Sales/change-item-price/change-item-price.component';
import { PdfmakenewversionComponent } from './pdfmakenewversion/pdfmakenewversion.component';
import { WaitSubComponent } from './EI-Documents/wait-sub/wait-sub.component';
import { I18nLangComponent } from './i18n-lang/i18n-lang.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepStockComponent } from './rep-stock/rep-stock.component';
import { RepSellingDetComponent } from './rep-selling-det/rep-selling-det.component';
import { RepIncomeStatmentComponent } from './rep-income-statment/rep-income-statment.component';
import { RepAccStatementComponent } from './rep-acc-statement/rep-acc-statement.component';

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

import { AuthGuard } from './auth/auth.guard';


import { ItemsComponent } from './Sales/items/items.component';

import { CustomersComponent } from './Sales/customers/customers.component';
import { CustomersViewComponent } from './Sales/customers-view/customers-view.component';
import { ItemCardView } from './shared/Models/item-card-view';
import { RepItemCardViewComponent } from './rep-item-card-view/rep-item-card-view.component';
import { ItemsViewComponent } from './Sales/items-view/items-view.component';
import { SellingCreditNotes } from './shared/Models/SellingCreditNotes';
import { DebitNoteViewComponent } from './EI-Documents/debit-note-view/debit-note-view.component';
import { DebitComponent } from './EI-Documents/debit/debit.component';
import { EnterprisesViewComponent } from './EI-Codes/enterprises-view/enterprises-view.component';
import { EnterprisesComponent } from './EI-Codes/enterprises/enterprises.component';
import { AcceptedInvComponent } from './Ei-Documents/accepted-inv/accepted-inv.component';
import { RejectedInvComponent } from './Ei-Documents/rejected-inv/rejected-inv.component';
import { AllInvoiceComponent } from './EI-Documents/all-invoice/all-invoice.component';
import { NotificationComponent } from './EI-Documents/notification/notification.component';
import { UnsubmitteSellingsRetComponent } from './EI-Documents/unsubmitte-sellings-ret/unsubmitte-sellings-ret.component';
import { TestComponent } from './test/test.component';
import { DocumentByTypeComponent } from './EI-Documents/document-by-type/document-by-type.component';
import { StatusForSellingsComponent } from './EI-Documents/status-for-sellings/status-for-sellings.component';
import { ImportItemsComponent } from './sales/import-items/import-items.component';
import { ImportCustomerComponent } from './sales/import-customer/import-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'repStock', component: RepStockComponent, canActivate: [AuthGuard] },
  { path: 'repSellingDet', component: RepSellingDetComponent, canActivate: [AuthGuard] },
  { path: 'RepIncomeStatment', component: RepIncomeStatmentComponent, canActivate: [AuthGuard] },
  { path: 'RepAccStatement', component: RepAccStatementComponent, canActivate: [AuthGuard] },
  { path: 'repAcceptedInv', component: AcceptedInvComponent, canActivate: [AuthGuard] },
  { path: 'repRejectedInv', component: RejectedInvComponent, canActivate: [AuthGuard] },
  { path: 'allInv', component: AllInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'UnSubmitedSellingRetView', component: UnsubmitteSellingsRetComponent, canActivate: [AuthGuard] },
  { path: 'ImportItems', component: ImportItemsComponent, canActivate: [AuthGuard] },
  { path: 'ImportCustomer', component: ImportCustomerComponent, canActivate: [AuthGuard] },

  // { path: 'i18n', component: I18nLangComponent, canActivate: [AuthGuard] },

  { path: 'MUnsItem', component: TestComponent, canActivate: [AuthGuard] },

  { path: 'DocumenByType', component: DocumentByTypeComponent, canActivate: [AuthGuard] },
  { path: 'statusforselling', component: StatusForSellingsComponent, canActivate: [AuthGuard] },

  { path: 'contractsReports', component: UserReportsComponent, canActivate: [AuthGuard] },
  { path: 'PriceListReports', component: PriceListReportsComponent, canActivate: [AuthGuard] },



  {
    path: 'statusforselling', canActivate: [AuthGuard]
    , children: [
      { path: '', component: StatusForSellingsComponent },
      { path: 'report/:id', component: StatusForSellingsComponent }
    ]
  },


  { path: 'userView', component: UserViewComponent, canActivate: [AuthGuard] },
  {
    path: 'user', canActivate: [AuthGuard]
    , children: [
      { path: '', component: UserComponent },
      { path: 'edit/:id', component: UserComponent }
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


  { path: 'RepItemCardView', component: RepItemCardViewComponent, canActivate: [AuthGuard] },

  // { path: 'Item', component: ItemLineComponent, canActivate: [AuthGuard] },


  {
    path: 'Item', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ItemLineComponent },
      { path: 'edit/:id', component: ItemLineComponent }
    ]
  },

  { path: 'ItemsView', component: ItemsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Items', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ItemsComponent },
      { path: 'edit/:id', component: ItemsComponent }
    ]
  },




  // { path: 'unitView', component: UnitViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'unit', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: UnitComponent },
  //     { path: 'edit/:id', component: UnitComponent }
  //   ]
  // },

  // { path: 'BranchView', component: BranchViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'Branch', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: BranchComponent },
  //     { path: 'edit/:id', component: BranchComponent }
  //   ]
  // },

  // { path: 'GroupView', component: GroupViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'Group', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: GroupComponent },
  //     { path: 'edit/:id', component: GroupComponent }
  //   ]
  // },


  // { path: 'TaxTypeView', component: TaxTypeViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'TaxType', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: TaxTypeComponent },
  //     { path: 'edit/:id', component: TaxTypeComponent }
  //   ]
  // },
  // { path: 'CountryView', component: CountryViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'Country', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: CountryComponent },
  //     { path: 'edit/:id', component: CountryComponent }
  //   ]
  // },
  // { path: 'ActivityTypeView', component: ActivityTypeViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'ActivityType', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: ActivityTypeComponent },
  //     { path: 'edit/:id', component: ActivityTypeComponent }
  //   ]
  // },


  { path: 'DebitView', component: DebitNoteViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Debit', canActivate: [AuthGuard]
    , children: [
      { path: '', component: DebitComponent },
      { path: 'edit/:id', component: DebitComponent }
    ]
  },


  { path: 'EnterprisesView', component: EnterprisesViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Enterprises', canActivate: [AuthGuard]
    , children: [
      { path: '', component: EnterprisesComponent },
      { path: 'edit/:id', component: EnterprisesComponent }
    ]
  },


  // { path: 'GovernateView', component: GovernateViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'Governate', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: GovernateComponent },
  //     { path: 'edit/:id', component: GovernateComponent }
  //   ]
  // },

  // { path: 'RegionCitiesView', component: RegionCitiesViewComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'RegionCities', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: RegionCitiesComponent },
  //     { path: 'edit/:id', component: RegionCitiesComponent }
  //   ]
  // },

  // {
  //   path: 'CreateSubscribe', canActivate: [AuthGuard]
  //   , children: [
  //     { path: '', component: CreateSubscribeComponent },
  //     { path: 'edit/:id', component: CreateSubscribeComponent }
  //   ]
  // } ,

  { path: 'Subscription', component: WaitSubComponent, canActivate: [AuthGuard] },


  // {path : 'pdf' , component: PdfmakenewversionComponent , canActivate : [AuthGuard]},

  { path: 'ChangeItemPrice', component: ChangeItemPriceComponent, canActivate: [AuthGuard] },



  // عرض الاسعار

{ path: 'priceListView', component: PriceListViewComponent, canActivate: [AuthGuard] },
{
  path: 'PriceList', canActivate: [AuthGuard]
  , children: [
    { path: '', component: PriceListComponent},
    { path: 'edit/:id', component: PriceListComponent }
  ]
},

{ path: 'PriceListItem', component: PriceListItemComponent, canActivate: [AuthGuard] },


{ path: 'contractsView', component: ContractsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'contracts', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ContractsComponent },
      { path: 'edit/:id', component: ContractsComponent }
    ]
  },

  { path: 'pdf', component: PdfviewComponent, canActivate: [AuthGuard] },
  { path: 'cpdf', component: ContractPdfComponent, canActivate: [AuthGuard] },

  // { path: 'PIExcel', component: InvoiceExcelComponent, canActivate: [AuthGuard] },

  {
    path: 'PIExcel', canActivate: [AuthGuard]
    , children: [
      { path: '', component: InvoiceExcelComponent },
      { path: ':id', component: InvoiceExcelComponent }
    ]
  },



  { path: 'ContractView', component: ContractsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'Contract', canActivate: [AuthGuard]
    , children: [
      { path: '', component: ContractsComponent },
      { path: 'edit/:id', component: ContractsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
