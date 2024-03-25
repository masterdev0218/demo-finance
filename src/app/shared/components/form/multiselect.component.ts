import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MultiselectForm,
  MultiselectOption,
} from '../../models/form/multiselect-form';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Flowbite } from '../../utilities/flowbite';
import { VariantIconComponent } from '../variant-icon.component';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    VariantIconComponent
  ],
  template: `
  <div>
    <span [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{multiselectForm()!.label}}:</span>
    <button
      [id]="multiselectForm()!.idButton"
      [attr.data-dropdown-toggle]="multiselectForm()!.idDropdown"
      class="select select-bordered w-full text-white vertical flex items-center pr-0"
      type="button"
      [ngClass]="{
        'select-error': this.elementForm()!.hasError('required') && submitted()
      }">
        <div class="flex justify-between w-full h-full items-center">
          <span class="break-normal truncate">{{ label() }}</span>
          <svg class="w-2.5 h-2.5 ms-3 mr-[0.95rem] text-[#6b7280] z-50 bg-[#1d232a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </div>
    </button>
    <!-- Dropdown menu -->
    <div class="relative mt-[-15px]">
      <div [id]="multiselectForm()!.idDropdown" class="dropdown-menu hidden divide-y shadow bg-[#1d232a] border-r-[0.1px] border-t-[0.1px] border-l-[0.1px] border-[#9a9a9a] z-50 max-h-52 overflow-y-scroll w-full">
        <ul class="p-3 space-y-3 text-sm text-gray-200" [attr.aria-labelledby]="multiselectForm()!.idButton">
          @for (option of multiselectForm()!.options; track option.id) {
            <li>
              <div class="flex items-center">
                <input
                  [id]="'check-' + option.id"
                  type="checkbox"
                  [checked]="isChecked(option)"
                  (change)="setValue(option)"
                  class="w-5 h-5 text-[#6b7280] rounded focus:ring-[#6b7280] ring-offset-gray-800 bg-[#1d232a] border-[#383f47]"
                />
                <label [for]="'check-' + option.id" class="ms-2 text-sm font-medium text-gray-300">{{ option.description }}</label>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
    <div class="h-1 mt-[15px]">
      @if (submitted() && this.elementForm()!.hasError('required')) {
        <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
      }
    </div>
  </div>
  `,
  styles: `
    .dropdown-menu {
      transform: translate3d(0px, 15.3px, 0px) !important;
    }
  `,
})
@Flowbite()
export class MultiselectComponent implements OnInit, OnDestroy {
  group = input.required<FormGroup>();
  label = signal<string>('');
  submitted = input<boolean>();
  multiselectForm = input<MultiselectForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);
  document = inject(DOCUMENT);
  validators: Validators[] = [[Validators.required]];
  firstInizialize = signal<boolean>(true);

  constructor(private formBuilder: FormBuilder) {
    effect(
      () => {
        if (
          this.multiselectForm()!.select &&
          this.multiselectForm()!.select!.length > 0 &&
          this.label() === '' &&
          this.firstInizialize()
        ) {
          this.multiselectForm()!.select!.forEach((element) => {
            this.setValue(element);
          });
          this.firstInizialize.update((v) => false);
        }
      },
      { allowSignalWrites: true }
    );
  }


  setLabel() {
    this.label.update((v) => '');
    if (this.elementForm()?.getRawValue().length > 0) {
      this.elementForm()
        ?.getRawValue()
        .forEach((element: MultiselectOption) => {
          if (this.label().length === 0) {
            this.label.update((v) => (v = `${element.description!}`));
          } else {
            this.label.update(
              (v) => (v = `${this.label()}, ${element.description!}`)
            );
          }
        });
    }
    return this.label();
  }

  setValue(value: any) {
    if (
      this.elementForm()
      ?.getRawValue()
      .find((x: MultiselectOption) => x.id === value.id)
      ) {
        this.elementForm()!.setValue([
          ...this.elementForm()!
          .getRawValue()
          .filter((x: MultiselectOption) => x.id !== value.id),
      ]);
    } else {
      this.elementForm()!.setValue([
        ...this.elementForm()!.getRawValue(),
        value,
      ]);
    }

      this.setLabel();


  }

  isChecked(element: MultiselectOption) {
    return this.multiselectForm()!.select
      ? this.multiselectForm()!.select!.find((x) => x.id === element.id)
      : false;
  }

  ngOnInit() {


    this.group().addControl(
      this.multiselectForm()!.groupFormName,
      this.formBuilder.group({
        multiselect: [
          { value: [], disabled: this.multiselectForm()!.disabledInput },
          this.validators[this.multiselectForm()!.validatorNumber!],
        ],
      })
    );
    this.elementForm.set(
      this.group()
        .get(`${this.multiselectForm()!.groupFormName}`)!
        .get('multiselect')
    );
    this.group()
      .get(`${this.multiselectForm()!.groupFormName}`)!
      .get('multiselect')!
      .updateValueAndValidity();


  }

  ngOnDestroy(): void {
    this.elementForm()?.setValue([])
  }
}
