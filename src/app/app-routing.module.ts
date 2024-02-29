import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/library',
    pathMatch: 'full',
  },
  {
    path: 'library',
    component: HomeComponent,
  },

  {
    path: 'addbook',
    component: AddBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
