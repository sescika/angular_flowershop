import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/api.service';
import { ICartItem } from '../../../shared/interfaces/i-cart-item';
import { SharedService } from '../../../services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: Array<any> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  pagiantedDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.dataSource
  );
  constructor(
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.changeDetector.detectChanges();
    this.pagiantedDataSource.paginator = this.paginator;
    this.obs = this.pagiantedDataSource.connect();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.pagiantedDataSource) {
      this.pagiantedDataSource.disconnect();
    }
  }

  addToCart(id: number): void {
    let item = this.dataSource.find((x) => x.id_flower == id);

    let cartItemToAdd: ICartItem = {
      id: item.id_flower,
      name: item.flower_name,
      img_name: item.image.img_name,
      img_path: item.image.path,
      quantity: 1,
      price: item.price.price,
    };

    if (!this.sharedService.lsGetItem('cart')) {
      this.addFirstProduct(cartItemToAdd);
    } else {
      this.addNewProduct(cartItemToAdd);
    }
  }

  addFirstProduct(itemToAdd: ICartItem): void {
    let itemArr: Array<any> = [];
    itemArr.push(itemToAdd);
    this.sharedService.lsSetItem('cart', itemArr);
    this.snackBar.open(`${itemToAdd.name} added to the cart`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }

  addNewProduct(itemToAdd: ICartItem): void {
    let cart = this.sharedService.lsGetItem('cart');
    let item = cart.find((x) => x.id == itemToAdd.id);

    if (!item) {
      cart.push(itemToAdd);
      this.snackBar.open(`${itemToAdd.name} Added to the cart`, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
      });
    } else {
      item.quantity++;
      this.snackBar.open(`${itemToAdd.name} ++1`, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
      });
    }
    this.sharedService.lsSetItem('cart', cart);
  }
}
