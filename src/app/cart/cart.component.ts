import { Component } from '@angular/core';
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items = this.cartService.getItems();

constructor(private readonly cartService:CartService) {
}

  removeItem(productId:number){
    this.items=this.items.filter((item)=>{
      return item.id !== productId
    })

    return this.items
  }
}
