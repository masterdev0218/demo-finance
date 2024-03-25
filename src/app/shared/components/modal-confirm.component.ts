import { ModalConfirm } from './../models/modal-confirm';
import { VariantIconComponent } from './variant-icon.component';
import { ButtonElement } from './../models/button-element';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { openModalConfirm, resetModalConfirm } from '../store/setting.action';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VariantIconComponent
  ],
  template: `
    <dialog id="modal-confirm" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ modal()?.title }}</h3>
        <p class="py-4">{{ modal()?.description }}</p>
        <div class="modal-action">
          <form method="dialog">
            <button (click)="confirm()" class="btn btn-success success tooltip me-2" [attr.data-tip]="buttonConfirm().tooltip"><app-variant-icon [variant]="buttonConfirm().icon?.variant"></app-variant-icon></button>
            <button id="close-modal" (click)="cancel()" class="btn btn-error error tooltip" [attr.data-tip]="buttonCancel().tooltip"><app-variant-icon [variant]="buttonCancel().icon?.variant"></app-variant-icon></button>
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: ``
})
export class ModalConfirmComponent {

  modal = input<ModalConfirm | null>(null);
  buttonConfirm = signal<ButtonElement>({
    icon: {
      variant: 'success',
      marginTop: ''
    },
    tooltip: 'Conferma'
  });
  buttonCancel = signal<ButtonElement>({
    icon: {
      variant: 'error',
      marginTop: ''
    },
    tooltip: 'Annulla'
  });

  constructor(private store: Store) {
    effect(() => {
      if(this.modal() && this.modal()!.open) {
        (document.getElementById('modal-confirm') as HTMLFormElement)['showModal']();
      }
    });
  }

  confirm() {
    this.store.dispatch(openModalConfirm(
      {
        ...this.modal(),
        open: false,
        confirm: true
      }
    ));
  }

  cancel() {
    this.store.dispatch(resetModalConfirm());
  }

}
