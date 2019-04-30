import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'fxy-app',
  template: `
    <fxy-navbar></fxy-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: [
    './fxy-app.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FxyAppComponent {
}