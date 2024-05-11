import { Component } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: 'chart.component.html',
})
export class PieChartIndexLabelComponent {
  values = [699, 627, 577, 522, 446, 284, 253, 279, 220, 192];
  bays = ['Bay 1', 'Bay 2', 'Bay 3', 'Bay 4', 'Bay 5', 'Bay 6', 'Bay 7', 'Bay 8', 'Bay 9', 'Bay 10'];
  total: number;

  constructor() {
    this.total = this.sum(this.values);
  }

  private sum(array: number[]): number {
    return array.reduce((acc, value) => acc + value, 0);
  }
  private generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < this.bays.length; i++) {
      dataPoints.push({ y: this.values[i], name: this.bays[i] });
    }
    return dataPoints;
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "Appointments per bay"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##",
      dataPoints: this.generateDataPoints()
    }]
  }
}
