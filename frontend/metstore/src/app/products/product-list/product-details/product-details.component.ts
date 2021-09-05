import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id!: number;
  //editMode determina se o formulário será carregado em branco (novo produto) ou com dados do produto à ser editado
  editMode = false;
  product!: Product;
  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.prodService.getCategories();
    //Se há o parametro ID na rota, muda o editMode para true e carrega o formulario com os dados do produto a ser editado.
    this.route.paramMap.subscribe((params: Params) => {
      this.id = +params.params.id;
      this.editMode = params.params.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      this.prodService
        .getProductById(this.id)
        .subscribe((prod) => this.productForm.patchValue(prod)); //Carrega os dados do produto no formulario para edição.
    }
  }

  onSubmit() {
    //Se o editMode estiver true, envia uma solicitação para atualizar um produto existente
    if (this.editMode) {
      const updatedProduct = new Product(
        this.productForm.value['name'],
        this.productForm.value['price'],
        this.productForm.value['category']
      );
      updatedProduct.id = this.id;
      this.prodService.updateProduct(updatedProduct);
      this.editMode = false;
      return this.productForm.reset();
    } else {
      //Se o editMode estiver false, envia uma solicitação para criar um novo produto
      const newProduct = new Product(
        this.productForm.value['name'],
        this.productForm.value['price'],
        this.productForm.value['category']
      );
      this.prodService.createProduct(newProduct);
      return this.productForm.reset();
    }
  }

  onCancel() {
    this.productForm.reset();
    this.router.navigate(['admin']);
  }

  onDeleteProd() {
    return this.prodService.deleteProduct(this.id);
  }
}