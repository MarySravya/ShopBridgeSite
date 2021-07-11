import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { HomeComponent } from './home/home.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { ViewItemComponent } from './view-item/view-item.component';

const routes: Routes = [
  { path: 'addItem', component: AddItemComponent },
  { path: 'modifyItem', component: ModifyItemComponent },
  { path: 'deleteItem', component: DeleteItemComponent },
  { path: 'viewItem', component: ViewItemComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
