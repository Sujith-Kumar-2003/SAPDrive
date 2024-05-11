import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AllocationPageComponent } from './allocation-page/allocation-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'allocate', component: AllocationPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
