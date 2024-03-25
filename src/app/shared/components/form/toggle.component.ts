import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleForm } from '../../models/form/toggle-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div [formGroup]="group()" class="form-control flex flex-col">
      <label class="label cursor-pointer p-0" [formGroupName]="toggleForm()!.groupFormName" [ngClass]="toggleForm()!.placeholder ? 'w-1/5' : 'w-full'">
        @if(toggleForm()!.placeholder) {
          <span [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{ toggleForm()!.placeholder }}:</span>
        }
        <input formControlName="toggle" type="checkbox" value="" class="sr-only peer">
        <div class="relative w-11 h-6 bg-red-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a96e]"></div>
      </label>
      @if (submitted() && this.elementForm()!.hasError('required')) {
        <div>
          <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
        </div>
      }
    </div>
  `,
  styles: ``
})
export class ToggleComponent {

  group = input.required<FormGroup>();
  submitted = input<boolean>();
  toggleForm = input<ToggleForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);

  validators: Validators[] = [
    [Validators.requiredTrue],
  ];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.group().get(`${this.toggleForm()!.groupFormName}`)!.get('toggle')?.setValue(this.toggleForm()!.select);
    })
  }

  ngOnInit() {
    this.group().addControl(this.toggleForm()!.groupFormName, this.formBuilder.group({
      toggle: [ { value: this.toggleForm()!.select, disabled: this.toggleForm()!.disabledInput }, this.validators[this.toggleForm()!.validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.toggleForm()!.groupFormName}`)!.get('toggle'));
    this.group().get(`${this.toggleForm()!.groupFormName}`)!.get('toggle')!.updateValueAndValidity();
  }

}
