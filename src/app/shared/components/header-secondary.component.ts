import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, signal } from '@angular/core';
import { VariantIconComponent } from './variant-icon.component';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VariantIcon } from '../models/variant-icon';
import { ButtonElement } from '../models/button-element';

@Component({
  selector: 'app-header-secondary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VariantIconComponent,
    RouterLink,
    CommonModule
  ],
  template: `
  <div class="pb-[140px]">
    <div class="navbar bg-opacity-20 backdrop-blur-md bg-slate-500 text-primary-content fixed z-30 mt-[65.33px] h-[55px] min-h-0">
      <div class="navbar-start">
        <button type="button" class="btn btn-neutral neutral min-h-0 h-[40px]" (click)="locationBack()"><app-variant-icon class="mt-[12px]" [variant]="arrowSx()"></app-variant-icon><div class="hidden phone:contents">Torna indietro</div></button>
      </div>
      <div class="navbar-center hidden lg:flex">
        @if (buttonTitle() && buttonTitle()!.name!.length > 0) {
          <a class="btn btn-ghost hover:bg-transparent text-xl text-white" [routerLink]="buttonTitle()?.path || undefined"><app-variant-icon [marginTop]="buttonTitle()?.icon?.marginTop" [variant]="buttonTitle()?.icon?.variant"></app-variant-icon>{{ buttonTitle()?.name }}</a>
        }
      </div>
      <div class="navbar-end gap-3">
        @if (buttonLeft() && buttonLeft()!.type!.length > 0) {
          <button
            (click)="onSubmitLeft.emit()"
            type="button"
            class="btn min-h-0 h-[40px]"
            [ngClass]="{
              'btn-success success': buttonLeft()?.type === 'success',
              'btn-neutral neutral': buttonLeft()?.type === 'neutral',
              'btn-error error': buttonLeft()?.type === 'error',
            }"
          >
            <app-variant-icon [marginTop]="buttonLeft()?.icon?.marginTop" [variant]="buttonLeft()?.icon?.variant"></app-variant-icon>
            <div class="hidden phone:contents">{{ buttonLeft()?.name }}</div>
          </button>
        }
        @if (buttonRight() && buttonRight()!.type!.length > 0) {
          <button
            (click)="onSubmitRight.emit()"
            type="button"
            class="btn min-h-0 h-[40px]"
            [ngClass]="{
              'btn-success success': buttonRight()?.type === 'success',
              'btn-neutral neutral': buttonRight()?.type === 'neutral',
              'btn-error error': buttonRight()?.type === 'error',
            }"
          >
            <app-variant-icon [marginTop]="buttonRight()?.icon?.marginTop" [variant]="buttonRight()?.icon?.variant"></app-variant-icon>
            <div class="hidden phone:contents">{{ buttonRight()?.name }}</div>
          </button>
        }
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class HeaderSecondaryComponent {

  buttonTitle = input<ButtonElement | undefined>();
  buttonLeft = input<ButtonElement | undefined>();
  buttonRight = input<ButtonElement | undefined>();
  arrowSx = signal<VariantIcon>('arrowSx');
  @Output() onSubmitRight = new EventEmitter();
  @Output() onSubmitLeft = new EventEmitter();

  constructor(private _location: Location) {}

  locationBack() {
    this._location.back()
  }

}
