import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Cart from '../../interfaces/cart';
import Customer from '../../interfaces/customer';
import { CartDataService } from '../services/cart-data.service';
import { SessionService } from '../services/session.service';
import { ProductDataService } from '../services/product-data.service';
import Product from '../../interfaces/product';
import Resp from '../../interfaces/response';
import { OrderDataService } from '../services/order-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  @Input() cart: Cart[];
  @Input() customer: Customer;
  @Output() increment = new EventEmitter<Cart>();
  @Output() decrement = new EventEmitter<Cart>();
  @Output() clear = new EventEmitter<boolean>();
  username: string;
  total: number;

  constructor(private sessionService: SessionService,
    private cartDataService: CartDataService,
    private orderDataService: OrderDataService,
    private productDataService: ProductDataService,
    private router: Router) {
    this.username = this.sessionService.getSessionAttribute("Emp");
    this.cart = new Array<Cart>();
    this.total = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.cart){
      this.cart = changes.cart.currentValue;
      this.updateCart();
    }
  }
  ngOnInit() {
  }
  updateCart(): void {
    this.total = 0;
    if (this.cart) {
      this.cart = this.cart.map((c: Cart) => {
        this.productDataService.getProduct(c.productId).subscribe((product: Product) => {
          c.product = product;
          this.total = this.total + c.quantity * c.product.price;
        })
        return c;
      })
    }
  }
  decrementCart(cartItem: Cart): void {
    this.decrement.emit(cartItem)
  }
  incrementCart(cartItem: Cart): void  {
    this.increment.emit(cartItem)
  }
  clearCart(): void  {
    this.clear.emit(true);
  }
  checkoutCustomer(): void  {
    this.sessionService.setSessionAttribute("cart", JSON.stringify(this.cart));
    this.sessionService.setSessionAttribute("cartTotal", this.total);
    this.orderDataService.checkoutOrder(this.cart, this.total).subscribe((resp: Resp) => {
      this.sessionService.setSessionAttribute("orderNumber", resp.message);
      this.clearCart();
      this.router.navigate(['checkout']);
    })
  }
}
