import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../services/order-data.service';
import Order from '../../interfaces/order';
import { SessionService } from '../services/session.service';
import groupedOrder from '../../interfaces/groupedOrder';
import { CustomerDataService } from '../services/customer-data.service';
import Customer from '../../interfaces/customer';
import { ProductDataService } from '../services/product-data.service';
import Product from '../../interfaces/product';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent implements OnInit {
  selectedOrder: Order[];
  order: Order[];
  groupedOrderList: groupedOrder[];
  username: string;
  orderView: boolean;
  constructor(private sessionService: SessionService,
    private orderDataService: OrderDataService,
    private customerDataService: CustomerDataService,
    private productDataService: ProductDataService,
    private router: Router) {
    this.username = this.sessionService.getSessionAttribute("Emp");
    this.orderView = false;
  }

  ngOnInit() {
    if (!this.username) {
      this.router.navigate(['']);
    }
    this.orderDataService.getPlacedOrders(this.username).subscribe((order: Order[]) => {
      this.order = order;
      this.order.map((o: Order)=>{
        this.customerDataService.getCustomer(o.customerId).subscribe((customer: Customer)=>{
          o.customer = customer;
        })
        this.productDataService.getProduct(o.productId).subscribe((product: Product)=>{
          o.product = product;
        })
        return o;
      })
      this.groupedOrderList = this.transformToGroup(this.removeDuplicate(order), "orderDate");
    })
  }
  // This function converts the order with multiple items
  // into a single order Entity
  removeDuplicate(order: Order[]): Order[]{
    return order.reduce(function (accumulator, current) {
      if (checkIfAlreadyExist(current)) {
        return accumulator
      } else {
        return accumulator.concat([current]);
      }
      function checkIfAlreadyExist(currentVal: Order) {
        return accumulator.some(function (item: Order) {
          return (item.orderNumber === currentVal.orderNumber);
        });
      }
    }, []);
  }
  // This function groups the order with same order dates
  transformToGroup(array: Array<Order>, field:string): groupedOrder[] {
      const groupedObj = array.reduce((prev, cur) => {
        if (!prev[cur[field]]) {
          prev[cur[field]] = [cur];
        } else {
          prev[cur[field]].push(cur);
        }
        return prev;
      }, {});
      return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));    
  }
  viewOrder(order: Order): void{
    this.orderView = true;
    this.selectedOrder = this.order.filter((ord: Order)=>{
        return ord.orderNumber == order.orderNumber
    })
  }
  back(): void{
    this.orderView = false;
  }
}
