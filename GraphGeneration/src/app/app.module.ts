import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { BarChartComponent } from './components/bar-chart/bar.chart.component';
import { PieChartIndexLabelComponent } from './components/pie-chart/pie.chart.indexlabel.component';

import { AppRoutingModule } from './app-routing.module';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartIndexLabelComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
