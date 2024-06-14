import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  productId: any;
  productData: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productData = this.getData(this.productId);
  }

  getData(id: number): void {
    this.apiService.getAllProducts().subscribe({
      next: (data) => {
        // console.log(data.find((x: { id_flower: number; }) => x.id_flower === id))
        this.productData = data.find((x: { id_flower: number; }) => x.id_flower === id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
