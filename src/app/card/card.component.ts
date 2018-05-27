import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Product from '../../interfaces/product';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<Product>();
  constructor() { }

  ngOnInit() {
  }
  addProduct(): void{
    this.addToCart.emit(this.product);
  }
}
