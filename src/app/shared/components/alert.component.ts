import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VariantIconComponent } from './variant-icon.component';

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VariantIconComponent
  ],
  template: `
    <div
      role="alert"
      class="alert w-auto min-w-72 max-w-lg fixed bottom-5 z-50 left-1/2 translate-x-[-50%]"
      [ngClass]="{
          'alert-info': variant() === 'info',
          'alert-success': variant() === 'success',
          'alert-error': variant() === 'error',
        }"
    >
      <app-variant-icon [variant]="variant()"></app-variant-icon>
      <div class="w-full text-center"><ng-content></ng-content></div>
    </div>
  `,
  styles: ``
})
export class AlertComponent {
  variant = input<'info' | 'success' | 'error' | undefined>();
}
