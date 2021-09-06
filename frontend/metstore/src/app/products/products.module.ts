import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { AppRoutingModule } from '../app-routing.module';
import { ProductEditComponent } from './product-manage/product-edit/product-edit.component';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductsComponent } from './products.component';
import { ProductManageComponent } from './product-manage/product-manage.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductListItemComponent,
    ProductEditComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
})
export class ProductsModule {}
