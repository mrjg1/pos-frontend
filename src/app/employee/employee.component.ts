import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import swal from 'sweetalert2';
import { ProductDataService } from '../services/product-data.service';
import Product from "../../interfaces/product";
import Customer from "../../interfaces/customer";
import { SessionService } from '../services/session.service';
import { CartDataService } from '../services/cart-data.service';
import Resp from '../../interfaces/response';
import Cart from '../../interfaces/cart';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  cart: Cart[];
  customer: Customer;
  username: string;
  productList: Product[];
  constructor(private productDataService: ProductDataService,
    private sessionService: SessionService,
    private router: Router,
    private cartDataService: CartDataService) {
      this.productList = new Array<Product>();
      this.productDataService.getAllProducts().subscribe((productList: Product[]) => {
      this.productList = productList;
    })
  }

  ngOnInit() {
    this.username = this.sessionService.getSessionAttribute("Emp");
    if (!this.username) {
      this.router.navigate(['']); 
    }
    this.customer = JSON.parse(this.sessionService.getSessionAttribute("customer"));
    this.updateCart();    
  }
  updateCart(): void{
    if(this.customer){
      this.cartDataService.getCart(this.username, this.customer.id).subscribe((cart:Cart[])=>{
        this.cart = cart;
      })
    }
  }
  search(keyword: string): void {
    this.productDataService.searchProduct(keyword).subscribe((productList: Product[]) => {
      this.productList = productList;
    })
  }
  setCustomer(customer: Customer): void {
    this.customer = customer;
    this.cartDataService.getCart(this.username, this.customer.id).subscribe((cart)=>{
      this.cart = cart;
    })
  }
  addProduct(product: Product): void {
    if (!this.customer) {
      swal({
        type: 'error',
        text: "Please select a customer!",
        background: '#2b2e31',
        confirmButtonColor: '#A55045'
      })
    } else {
      this.cartDataService.addToCart(this.username, this.customer.id, product.id)
      .subscribe((resp: Resp)=>{
        if(!resp.key){
          swal({
            type: 'error',
            text: resp.message,
            background: '#2b2e31',
            confirmButtonColor: '#A55045'
          })
        } else {
          this.updateCart();
        }
      })
    }
  }
  decrement(cartItem: Cart): void {
    this.cartDataService.decrement(cartItem.username, cartItem.customerId, cartItem.productId).subscribe((resp: Resp) => {
      console.log(resp.message);
      this.updateCart();
    })
  }
  increment(cartItem: Cart): void {
    this.cartDataService.addToCart(cartItem.username, cartItem.customerId, cartItem.productId).subscribe((resp:Resp)=>{
      if(!resp.key){
        swal({
          type: 'error',
          text: resp.message,
          background: '#2b2e31',
          confirmButtonColor: '#A55045'
        })
      } else {
        this.updateCart();
      }
    })
  }

  clear(): void{
    this.cartDataService.clear(this.username, this.customer.id).subscribe((resp:Resp)=>{
      console.log(resp.message);
      this.updateCart();
    })
  }
}
