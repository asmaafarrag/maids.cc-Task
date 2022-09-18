import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common'

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

 
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgPipesModule } from 'ngx-pipes';

import { RepStockComponent } from './rep-stock/rep-stock.component';

import { ServStockService } from '../app/shared/Services/serv-stock.service'
import { UserService } from './shared/Services/user.service';

import { SearchPipe } from './search.pip';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RepSellingDetComponent } from './rep-selling-det/rep-selling-det.component';
import { HChartBarComponent } from './home/h-chart-bar/h-chart-bar.component';
import { HChartPieComponent } from './home/h-chart-pie/h-chart-pie.component';
import { HChartLineComponent } from './home/h-chart-line/h-chart-line.component';
import { NavBarHeaderComponent } from './nav-bar-header/nav-bar-header.component';
import { RepIncomeStatmentComponent } from './rep-income-statment/rep-income-statment.component';
import { RepAccStatementComponent } from './rep-acc-statement/rep-acc-statement.component';
import { SalesRequestOrderComponent } from './sales-request-order/sales-request-order.component';
import { ClientsComponent } from './CRM/clients/clients.component';
import { ClientComponent } from './CRM/client/client.component';
import { VacOrderComponent } from './HR/vac-order/vac-order.component';
import { VacOrdersComponent } from './HR/vac-orders/vac-orders.component';
import { VacOrderApproveComponent } from './HR/vac-order-approve/vac-order-approve.component';
import { RepEmpVacComponent } from './HR/rep-emp-vac/rep-emp-vac.component';
import { ProjectsComponent } from './CRM/projects/projects.component';
import { ProjectComponent } from './CRM/project/project.component';
import { ClientActionComponent } from './CRM/client-action/client-action.component';
import { ClientActionsComponent } from './CRM/client-actions/client-actions.component';
import { EmpPermitComponent } from './HR/emp-permit/emp-permit.component';
import { EmpPermitsComponent } from './HR/emp-permits/emp-permits.component';
import { HousesComponent } from './RealState/houses/houses.component';
import { ReserveUnitsComponent } from './RealState/reserve-units/reserve-units.component';
import { SaleInvsComponent } from './Sales/sale-invs/sale-invs.component';
import { SaleInvItemsComponent } from './Sales/sale-inv-items/sale-inv-items.component';
import { SalesSaleInv } from './shared/Models/sales-sale-inv';
import { ItemsComponent } from './Sales/items/items.component';
import { InvsInComponent } from './Sales/invs-in/invs-in.component';
import { SaleInvViewComponent } from './Sales/sale-inv-view/sale-inv-view.component';
import { InvsOutComponent } from './Sales/invs-out/invs-out.component';
import { InvsInViewComponent } from './Sales/invs-in-view/invs-in-view.component';
import { InvsOutViewComponent } from './Sales/invs-out-view/invs-out-view.component';
import { TransBetStoresComponent } from './Sales/trans-bet-stores/trans-bet-stores.component';
import { TransBetStoresItemsComponent } from './Sales/trans-bet-stores-items/trans-bet-stores-items.component';
import { TransBetStoresViewComponent } from './Sales/trans-bet-stores-view/trans-bet-stores-view.component';
import { AddsComponent } from './Sales/adds/adds.component';

import { AddsItemsComponent } from './Sales/adds-items/adds-items.component';
import { AddsViewComponent } from './Sales/adds-view/adds-view.component';
import { AddRetsComponent } from './Sales/add-rets/add-rets.component';
import { AddRetsItemsComponent } from './Sales/add-rets-items/add-rets-items.component';
import { AddRetsViewComponent } from './Sales/add-rets-view/add-rets-view.component';
import { PurchasingsComponent } from './Purchase/purchasings/purchasings.component';
import { PurchasingsItemsComponent } from './Purchase/purchasings-items/purchasings-items.component';
import { PurchasingsViewComponent } from './Purchase/purchasings-view/purchasings-view.component';
import { CustomersComponent } from './Sales/customers/customers.component';
import { CustomersViewComponent } from './Sales/customers-view/customers-view.component';
import { SuppliersComponent } from './Purchase/suppliers/suppliers.component';
import { SuppliersViewComponent } from './Purchase/suppliers-view/suppliers-view.component';
import { RepItemCardViewComponent } from './rep-item-card-view/rep-item-card-view.component';
import { ItemsViewComponent } from './Sales/items-view/items-view.component';
import { SellingRetsComponent } from './Sales/selling-rets/selling-rets.component';
import { SellingRetsItemsComponent } from './Sales/selling-rets-items/selling-rets-items.component';
import { SellingRetsViewComponent } from './Sales/selling-rets-view/selling-rets-view.component';
import { PurchasingForSellingComponent } from './Purchase/purchasing-for-selling/purchasing-for-selling.component';
import { PurchasingForSellingItemsComponent } from './Purchase/purchasing-for-selling-items/purchasing-for-selling-items.component';
import { CustDiscountsComponent } from './Sales/cust-discounts/cust-discounts.component';
import { CustDiscountsViewComponent } from './Sales/cust-discounts-view/cust-discounts-view.component';
import { SuppDiscountsComponent } from './Purchase/supp-discounts/supp-discounts.component';
import { SuppDiscountsViewComponent } from './Purchase/supp-discounts-view/supp-discounts-view.component';
import { RepInventoryComponent } from './rep-inventory/rep-inventory.component';
import { RepInventoryItemsComponent } from './rep-inventory-items/rep-inventory-items.component';
import { SalesAnalysisReportComponent } from './sales-analysis-report/sales-analysis-report.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PdfComponent } from './pdf/pdf.component';
import { TestComponent } from './sales/test/test.component';
import { TestItemsComponent } from './sales/test-items/test-items.component';
import { ChangeItemPriceComponent } from './sales/change-item-price/change-item-price.component';
import { ImportClientsComponent } from './CRM/import-clients/import-clients.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { ExampleComponent } from './crm/example/example.component';
import { ChangeClientsComponent } from './CRM/change-clients/change-clients.component';
import { PriceListComponent } from './sales/price-list/price-list.component';
import { PriceListViewComponent } from './sales/price-list-view/price-list-view.component';
import { PriceListItemComponent } from './sales/price-list-item/price-list-item.component';
import { RepPurchAnalysisComponent } from './rep-purch-analysis/rep-purch-analysis.component';

// import Chart from 'chart.js';

@NgModule({
  declarations: [
    AppComponent,
    RepStockComponent,     
    SearchPipe,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    RepSellingDetComponent,
    HChartBarComponent,
    HChartPieComponent,
    HChartLineComponent,
    NavBarHeaderComponent,
    RepIncomeStatmentComponent,
    RepAccStatementComponent,
    SalesRequestOrderComponent,
    ClientsComponent,
    ClientComponent,
    VacOrderComponent,
    VacOrdersComponent,
    VacOrderApproveComponent,
    RepEmpVacComponent,
    ProjectsComponent,
    ProjectComponent,
    ClientActionComponent,
    ClientActionsComponent,
    EmpPermitComponent,
    EmpPermitsComponent,
    HousesComponent,
    ReserveUnitsComponent,
    SaleInvsComponent,
    SaleInvItemsComponent,
    ItemsComponent,
    InvsInComponent,
    SaleInvViewComponent,
    InvsOutComponent,
    InvsInViewComponent,
    InvsOutViewComponent,
    TransBetStoresComponent,
    TransBetStoresItemsComponent,
    TransBetStoresViewComponent,
    AddsComponent,
    AddsItemsComponent,
    AddsViewComponent,
    AddRetsComponent,
    AddRetsItemsComponent,
    AddRetsViewComponent,
    PurchasingsComponent,
    PurchasingsItemsComponent,
    PurchasingsViewComponent,
    CustomersComponent,
    CustomersViewComponent,
    SuppliersComponent,
    SuppliersViewComponent,
    RepItemCardViewComponent,
    ItemsViewComponent,
    SellingRetsComponent,
    SellingRetsItemsComponent,
    SellingRetsViewComponent,
    PurchasingForSellingComponent,
    PurchasingForSellingItemsComponent,
    CustDiscountsComponent,
    CustDiscountsViewComponent,
    SuppDiscountsComponent,
    SuppDiscountsViewComponent,
    RepInventoryComponent,
    RepInventoryItemsComponent,
    SalesAnalysisReportComponent,
    PdfComponent,
    TestComponent,
    TestItemsComponent,
    ChangeItemPriceComponent,
    ImportClientsComponent,
    ExampleComponent,
    ChangeClientsComponent,
    PriceListComponent,
    PriceListViewComponent,
    PriceListItemComponent,
    RepPurchAnalysisComponent,
  
  ],
  imports: [
    BrowserModule, NgxPaginationModule,  NgPipesModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,MatTableModule, MatFormFieldModule,MatAutocompleteModule ,MatInputModule,MatPaginatorModule,MatDialogModule,
    Ng2SearchPipeModule ,
    ToastrModule.forRoot() , // ToastrModule added
    DropDownsModule,
    InputsModule,
    LabelModule,
    AgGridModule.withComponents([]),
    // Chart,
    

  ],
  entryComponents:[SaleInvItemsComponent],
  providers: [MatDatepickerModule,MatPaginatorModule,ServStockService,UserService,DatePipe, AuthGuard
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
