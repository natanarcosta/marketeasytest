import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-manage/product-edit/product-edit.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'list', component: ProductListComponent },
      { path: 'search', component: ProductSearchComponent },
    ],
  },
  { path: 'admin', component: ProductManageComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
