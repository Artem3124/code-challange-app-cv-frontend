import { Component, OnInit } from '@angular/core';
import { UserStatistic } from 'src/models';
import { StatisticHttpService } from 'src/shared/services/http/statistic.service';

@Component({
  selector: 'problem-solved-percentage',
  templateUrl: './problems-solved-percentage.component.html',
  styleUrls: [
    './problems-solved-percentage.component.scss',
    '../../../../shared/styles/global-elements.scss',
    '../../../../shared/styles/fonts.scss',
  ],
})
export class ProblemsSolvedPercentage implements OnInit {
  statistic: UserStatistic;

  constructor(private statisticService: StatisticHttpService) {}

  ngOnInit(): void {
    this.statisticService.statistic().subscribe({
      next: (res) => (this.statistic = res),
    });
  }
}
