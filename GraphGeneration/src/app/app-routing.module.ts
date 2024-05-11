// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarChartComponent } from './components/bar-chart/bar.chart.component';
import { PieChartIndexLabelComponent } from './components/pie-chart/pie.chart.indexlabel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bar-chart-category-axis', component: BarChartComponent },
  { path: 'pie-chart-index-data-label', component: PieChartIndexLabelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
