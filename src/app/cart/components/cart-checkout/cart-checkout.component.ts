import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { SharedTotalService } from '../../business-logic/shared-total.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css',
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  total: number;

  private sub: Subscription;

  constructor(
    private totalService: SharedTotalService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.totalService.sharedData$.subscribe((data) => {
      this.total = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkout(): void {
    this.sharedService.lsRemoveItem('cart');
    this.totalService.updateTotal(0);

    this.snackBar.open(`Successfully checked out!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}
