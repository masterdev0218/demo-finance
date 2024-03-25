import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, effect, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxForm } from '../../models/form/checkbox-form';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div [formGroup]="group()" class="form-control flex flex-col w-[12%]">
      <label class="label cursor-pointer" [formGroupName]="checkboxForm()!.groupFormName">
        <span class="label-text" [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{ checkboxForm()!.placeholder }}</span>
        <input type="checkbox" formControlName="checkbox" checked="checked" class="checkbox" [ngClass]="{'checkbox-error': this.elementForm()!.hasError('required') && submitted()}"/>
      </label>
      <div class="h-1">
        @if (submitted() && this.elementForm()!.hasError('required')) {
          <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
        }
      </div>
    </div>
  `,
  styles: [``]
})
export class CheckboxComponent implements OnInit {
  group = input.required<FormGroup>();
  submitted = input<boolean>();
  checkboxForm = input<CheckboxForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);

  validators: Validators[] = [
    [Validators.requiredTrue],
  ];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.group().get(`${this.checkboxForm()!.groupFormName}`)!.get('checkbox')?.setValue(this.checkboxForm()!.select);
    })
  }

  ngOnInit() {
    this.group().addControl(this.checkboxForm()!.groupFormName, this.formBuilder.group({
      checkbox: [ { value: this.checkboxForm()!.select, disabled: this.checkboxForm()!.disabledInput }, this.validators[this.checkboxForm()!.validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.checkboxForm()!.groupFormName}`)!.get('checkbox'));
    this.group().get(`${this.checkboxForm()!.groupFormName}`)!.get('checkbox')!.updateValueAndValidity();
  }

}
