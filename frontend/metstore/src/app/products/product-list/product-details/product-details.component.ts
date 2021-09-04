import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/enums/category.enum';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  subscription!: Subscription;
  product!: Product;
  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.prodService.getCategories();
    this.route.paramMap.subscribe((params: Params) => {
      this.id = +params.params.id;
      this.editMode = params.params.id != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    /*     this.subscription.unsubscribe();
     */
  }

  initForm() {
    if (this.editMode) {
      this.prodService
        .getProductById(this.id)
        .subscribe((prod) => this.productForm.patchValue(prod));
    }
  }

  onSubmit() {
    if (this.editMode) {
      const updatedProduct = new Product(
        this.productForm.value['name'],
        this.productForm.value['price'],
        this.productForm.value['category']
      );
      updatedProduct.id = this.id;
      return this.prodService
        .updateProduct(updatedProduct)
        .subscribe((res) => console.log(res));
    } else {
      const newProduct = new Product(
        this.productForm.value['name'],
        this.productForm.value['price'],
        this.productForm.value['category']
      );
      return this.prodService.createProduct(newProduct).subscribe(
        (res) => console.log(res),
        (error) => console.log(error.error.message)
      );
    }
  }

  getProduct(id: number) {}
}
