import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStatistic } from 'src/models';
import { HttpBase } from 'src/shared/services/http/http-base.service';

@Injectable()
export class StatisticHttpService {
  constructor(private http: HttpBase) {}

  private readonly controllerPath = 'Statistic';

  statistic(): Observable<UserStatistic> {
    return this.http.get<UserStatistic>(`${this.controllerPath}`);
  }
}
