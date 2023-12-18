import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {BlogComponent} from './component/blog/blog.component';
import {CounterComponent} from './component/counter/counter.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"counter",component:CounterComponent, canActivate:[AuthGuard]},
  {path:"blog",component:BlogComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
