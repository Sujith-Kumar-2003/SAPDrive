import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; // Import the appropriate module
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AllocationPageComponent } from './allocation-page/allocation-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MainPageComponent, LoginPageComponent, AllocationPageComponent],
  imports: [HttpClientModule, MatDatepickerModule, ReactiveFormsModule, BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, AppRoutingModule,  MatInputModule, MatFormFieldModule, MatMomentDateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
