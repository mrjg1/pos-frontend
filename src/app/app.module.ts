import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDataService } from './services/employee-data.service';
import { CustomerDataService } from './services/customer-data.service';
import { ProductDataService } from './services/product-data.service';
import { AlertComponent } from './alert/alert.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { CartComponent } from './cart/cart.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CardComponent } from './card/card.component';
import { SessionService } from './services/session.service';
import { SessionStorageService } from 'angular-web-storage';
import { CartDataService } from './services/cart-data.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDataService } from './services/order-data.service';
import { SavedOrdersComponent } from './saved-orders/saved-orders.component';
import { PlacedOrdersComponent } from './placed-orders/placed-orders.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerDataService } from './services/drawer-data.service';
import { SalesReportComponent } from './sales-report/sales-report.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    EmployeeComponent,
    CustomerComponent,
    CartComponent,
    AddCustomerComponent,
    CardComponent,
    CheckoutComponent,
    SavedOrdersComponent,
    PlacedOrdersComponent,
    NavigatorComponent,
    DrawerComponent,
    SalesReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'checkout', component: CheckoutComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'employee/saved', component: SavedOrdersComponent },
      { path: 'employee/placed', component: PlacedOrdersComponent },
      { path: 'employee/drawer', component: DrawerComponent },
      { path: 'employee/sales-report', component: SalesReportComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [
    DrawerDataService,
    EmployeeDataService, 
    CustomerDataService, 
    ProductDataService, 
    SessionService, 
    SessionStorageService,
    CartDataService,
    OrderDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
