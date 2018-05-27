import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import Cart from '../../interfaces/cart';
import Customer from '../../interfaces/customer';
import { SessionService } from '../services/session.service';
import { OrderDataService } from '../services/order-data.service';
import Resp from '../../interfaces/response';
import { CartDataService } from '../services/cart-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart[];
  customer: Customer;
  username: string;
  cartTotal: number;
  paymentMode: string;
  constructor(private sessionService: SessionService,
    private router: Router,
    private orderDataService: OrderDataService,
    private cartDataService: CartDataService) {
    this.paymentMode = "Cash";
    this.username = this.sessionService.getSessionAttribute("Emp");
  }

  ngOnInit() {
    if (!this.username) {
      this.router.navigate(['']);
    }
    this.cart = JSON.parse(this.sessionService.getSessionAttribute("cart"));
    this.customer = JSON.parse(this.sessionService.getSessionAttribute("customer"));
    this.username = this.sessionService.getSessionAttribute("Emp");
    this.cartTotal = this.sessionService.getSessionAttribute("cartTotal");
  }
  saveOrder(): void {
    this.orderDataService.saveOrder(this.sessionService.getSessionAttribute("orderNumber")).subscribe((resp: Resp) => {
      if (resp.key) {
        swal({
          type: 'success',
          text: resp.message
        })
        this.sessionService.clearSession();
        this.sessionService.setSessionAttribute("Emp", this.username);
        this.router.navigate(['employee']);
      }
    });
  }
  placeOrder(paymentMethod: string): void {
    this.orderDataService.placeOrder(this.sessionService.getSessionAttribute("orderNumber"), paymentMethod).subscribe((resp: Resp) => {
      if (resp.key) {
        swal({
          type: 'success',
          text: resp.message,
          background: '#2b2e31',
          confirmButtonColor: '#879948'
        })
        this.sessionService.clearSession();
        this.sessionService.setSessionAttribute("Emp", this.username);
        this.router.navigate(['employee']);
      } else {
        swal({
          type: 'error',
          text: resp.message,
          background: '#2b2e31',
          confirmButtonColor: '#A55045'
        })
      }
    });
  }
}
