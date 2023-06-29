import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-status-progressbar',
  templateUrl: './status-progressbar.component.html',
  styleUrls: ['./status-progressbar.component.scss']
})
export class StatusProgressbarComponent implements OnInit {
  @Input() title: string = 'SPAT';
  @Input() value: number = 67;
  @Input() maxValue: number = 255;
  @Input() type: string = 'water';

  subscription?: Subscription;
  currentValue = 0;
  loaded = false;
  constructor() { }

  ngOnInit() {
    const stats = ['HP', 'ATTACK', 'DEFENSE', 'SPECIAL-ATTACK', 'SPECIAL-DEFENSE', 'SPEED'];
    const shortStats = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPED'];

    this.title = shortStats[stats.findIndex(p => p === this.title.toUpperCase())];
    setTimeout(() => {
      this.loaded = true;
      this.increaseCurrentValue();
    }, 10);
  }

  increaseCurrentValue() {
    this.subscription = interval(2.5).subscribe({
      next: (value) => {
        if (this.currentValue < this.value)
          this.currentValue++;
        else
          this.subscription?.unsubscribe();
      }
    })
  }

  formatNumberWithLeadingZeros() {
    const numAsString = this.currentValue.toString();
    if (numAsString.length > 2) {
      return numAsString;
    } else {
      return numAsString.padStart(3, '0');
    }
  }

}
