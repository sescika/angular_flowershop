import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { SharedTotalService } from '../../business-logic/shared-total.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css',
})
export class CartTableComponent implements OnInit, OnDestroy {
  constructor(
    private sharedService: SharedService,
    private totalService: SharedTotalService
  ) {}

  displayedColumns: string[] = ['name', 'image', 'price', 'quantity', 'remove'];
  cartData: Array<any>;
  storageSub: Subscription;

  ngOnInit(): void {
    this.getDataFromCart();
    this.getTotal();
    this.storageSub = this.sharedService.watchStorage().subscribe(() => {
      this.cartData = this.sharedService.lsGetItem('cart') || [];
    });
  }
  ngOnDestroy(): void {
    if (this.storageSub) {
      this.storageSub.unsubscribe();
    }
  }

  getDataFromCart(): void {
    const data = this.sharedService.lsGetItem('cart');

    if (!data) {
      this.cartData = [];
    } else {
      this.cartData = data;
    }
  }

  increaseQuantity(id: number): void {
    let item = this.cartData.find((x) => x.id == id);

    item.quantity++;

    this.sharedService.lsSetItem('cart', this.cartData);

    this.getTotal();
  }

  decreaseQuantity(id: number): void {
    let item = this.cartData.find((x) => x.id == id);

    if (item.quantity <= 1) {
      item.quantity == 1;
    } else {
      item.quantity--;
    }

    this.sharedService.lsSetItem('cart', this.cartData);

    this.getTotal();
  }

  removeItemFromCart(id: number): void {
    let filteredCart = this.cartData.filter((x) => x.id !== id);
    if (filteredCart.length === 0) {
      this.sharedService.lsRemoveItem('cart');
    } else {
      this.sharedService.lsSetItem('cart', filteredCart);
    }

    this.getTotal();
  }

  getTotal(): void {
    let total: number = 0;

    this.cartData.forEach((e) => {
      total += e.price * e.quantity;
    });
    console.log(total);
    this.totalService.updateTotal(total);
  }
}
