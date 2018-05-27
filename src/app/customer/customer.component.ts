import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import swal from 'sweetalert2';
import Customer from '../../interfaces/customer';
import Cart from '../../interfaces/cart';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() cart;
  @Output() setCustomerParent = new EventEmitter<Customer>();
  @Output() increment = new EventEmitter<Cart>();
  @Output() decrement = new EventEmitter<Cart>();
  @Output() clear = new EventEmitter<boolean>();
  addCustomer: boolean;
  customers: Customer[];
  customer: Customer;
  ngOnChanges(changes: SimpleChanges){
    this.cart = changes.cart.currentValue;
  }
  constructor(private dataService: CustomerDataService, private sessionService: SessionService) {
    this.addCustomer = false;
  }

  ngOnInit() {
    if(this.sessionService.getSessionAttribute('customer')){
      this.setCustomer(JSON.parse(this.sessionService.getSessionAttribute('customer')));
    }
  }

  search(keyword: string): void {
    this.dataService.searchCustomer(keyword).subscribe((custList: Customer[]) => {
      this.customers = custList;
    })
  }
  
  setCustomer(customer: Customer): void {
    this.customer = customer;
    this.setCustomerParent.emit(customer);
    this.customers = undefined;
    this.addCustomer = false;
    this.sessionService.setSessionAttribute('customer', JSON.stringify(this.customer));
  }
  addNewCustomer(): void {
    this.addCustomer = this.addCustomer ? false : true;
  }

  addCustomerCancel(receivedValue: boolean): void{
    this.addCustomer = receivedValue
  }
  removeCustomer(): void {
    this.customer = undefined;
  }
  incrementCustomerCart(cartItem: Cart): void{
    this.increment.emit(cartItem);
  }
  decrementCustomerCart(cartItem: Cart): void {
    this.decrement.emit(cartItem);
  }
  clearCustomerCart(): void{
    this.clear.emit(true);
  }
}
