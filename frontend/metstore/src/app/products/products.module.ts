import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-manage/product-edit/product-edit.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductManageComponent,
    ProductEditComponent,
    ProductSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
})
export class ProductsModule {}
