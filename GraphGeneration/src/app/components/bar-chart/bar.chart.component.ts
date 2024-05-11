import { Component } from '@angular/core';
     
@Component({
  selector: 'app-root',
  templateUrl: './chart.component.html'
})
export class BarChartComponent {
  stations = ['Station1', 'Station2', 'Station3', 'Station4', 'Station5', 'Station6',
              'Station7', 'Station8', 'Station9', 'Station10'];

  revenue_per_station = [152050, 149100, 143400, 134000, 125700, 42600, 37950, 41850, 55000, 134400];

  chartOptions = {
    title: {
      text: "Revenue for Each Bay"
    },
    animationEnabled: true,
    axisX: {
      title: "Stations"
    },
    axisY: {
      includeZero: true,
      title: "Revenue"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      dataPoints: this.generateDataPoints()
    }]
  }

  private generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < this.stations.length; i++) {
      dataPoints.push({ label: this.stations[i], y: this.revenue_per_station[i] });
    }
    return dataPoints;
  }
}
