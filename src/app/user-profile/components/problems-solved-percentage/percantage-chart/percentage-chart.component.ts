import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexOptions,
  ApexPlotOptions,
  ApexStroke,
  ChartComponent,
} from 'ng-apexcharts';
import { UserStatistic } from 'src/models';

export class ChartOptions implements ApexOptions {
  colors?: any[];
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  stroke?: ApexStroke;
}

@Component({
  selector: 'percentage-chart',
  templateUrl: './percentage-chart.component.html',
  styleUrls: [
    '../../../../../shared/styles/fonts.scss',
    '../../../../../shared/styles/custom-environment.scss',
    './percentage-chart.component.scss',
  ],
})
export class PercentageChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() statistic: UserStatistic;
  // bruh man :(
  ngOnInit(): void {
    const amount = this.statistic.problemsCount;
    this.chartOptions = {
      colors: ['#F2D895', '#C591E1', '#91BCFD'],
      series: [
        this.statistic.hardProblemsSolved,
        this.statistic.mediumProblemsSolved,
        this.statistic.easyProblemsSolved,
      ], // here I should add the amount of resolved problems
      chart: {
        width: 380,
        type: 'pie',
      },
      stroke: {
        width: 0,
      },
      dataLabels: {
        style: {
          fontFamily: 'Poppins',
        },
        background: {
          borderRadius: 0,
        },
      },
      labels: ['Hard', 'Medium', 'Easy'],
      legend: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '14px',
        labels: {
          colors: ['#F2D895', '#C591E1', '#91BCFD'],
        },
        position: 'bottom',
        markers: {
          fillColors: ['#F2D895', '#C591E1', '#91BCFD'],
        },
        formatter(legendName, opts) {
          return ` - ${parseInt(
            (
              (opts.w.globals.series[opts.seriesIndex] / amount) *
              100
            ).toString()
          )}% solved problems is ${legendName}(${
            opts.w.globals.series[opts.seriesIndex]
          });`;
        },
      },
    };
  }

  getSolvedProblemsCount(): number {
    if (!this.statistic) {
      return 0;
    }
    return (
      this.statistic.easyProblemsSolved +
      this.statistic.mediumProblemsSolved +
      this.statistic.hardProblemsSolved
    );
  }
}
