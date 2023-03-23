import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(private readonly cartService: CartService, private formBuilder: FormBuilder) {}

  removeItem(productId: number) {
    this.items = this.items.filter((item) => {
      return item.id !== productId;
    });

    return this.items;
  }

  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
