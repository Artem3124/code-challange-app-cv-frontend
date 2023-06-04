import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import dayjs from "dayjs";
import { Challenge } from "src/models";
import { ChallengeService } from "src/shared/services/http/challenge.service";

@Component({
    selector: 'challenge-timer',
    templateUrl: './challenge-timer.component.html'
})

export class ChallengeTimerComponent implements OnDestroy, AfterViewInit {
    @Input() challenge: Challenge;
    @Output() onTimeout: EventEmitter<void> = new EventEmitter<void>();

    timeLeft: string;
    timeInterval: NodeJS.Timer;

    hours: string = '00';
    minutes: string = '00';
    seconds: string = '00';

    constructor(private challengeService: ChallengeService) {}

    ngAfterViewInit(): void {
      if (!this.challenge?.userAttempt) {
        return;
      }
      var deadline = dayjs(this.challenge.userAttempt.startedDateTimeUtc).utc(true).add(this.challenge.timeLimitMinutes, 'minute').toString();
      this.initializeClock(this.challenge.uuid, deadline);
    }

    ngOnDestroy(): void {
      clearInterval(this.timeInterval);
    }

    getTimeRemaining(endTime: string) {
        var t = Date.parse(endTime) - Date.parse(dayjs.utc().toString());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        return {
          'total': t,
          'hours': this.normalize(hours),
          'minutes': this.normalize(minutes),
          'seconds': this.normalize(seconds),
        };
      }
      
      initializeClock(id: string, endTime: string) {
        const clock = document.getElementById(id);
        if (!clock) {
            return;
        }
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');

        if (!hoursSpan || !minutesSpan || !secondsSpan) {
            return;
        }

        const updateClock = () => {
          var t = this.getTimeRemaining(endTime);
          this.hours = ('0' + t.hours).slice(-2);
          this.minutes = ('0' + t.minutes).slice(-2);
          this.seconds = ('0' + t.seconds).slice(-2);

          if (t.total <= 0) {
            clearInterval(this.timeInterval);
            this.onTimeout.emit();
          }
        }
      
        updateClock();
        this.timeInterval = setInterval(updateClock, 1000);
    }

    private normalize(value: number): number {
        return value < 0 ? 0 : value;
    }
}
