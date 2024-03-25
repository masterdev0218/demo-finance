import { ChangeDetectionStrategy, Component, OnInit, effect, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownForm, SelectOption } from '../../models/form/dropdown-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div [formGroup]="group()">
      <span [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{dropdownForm()!.label}}:</span>
      <div [formGroupName]="dropdownForm()!.groupFormName" class="flex flex-col">
        <select
          [compareWith]="compareTech"
          formControlName="dropdown"
          class="select select-bordered w-full"
          [ngClass]="{
            'select-error': this.elementForm()!.hasError('required') && submitted()
          }"
        >
          @for (option of dropdownForm()!.options; track option.id) {
            <option [ngValue]="option">{{option.description}}</option>
          }
        </select>
        <div class="h-1">
          @if (submitted() && this.elementForm()!.hasError('required')) {
            <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class DropdownComponent implements OnInit {
  group = input.required<FormGroup>();
  submitted = input<boolean>();
  dropdownForm = input<DropdownForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);

  validators: Validators[] = [
    [Validators.required]
  ];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.group().get(`${this.dropdownForm()?.groupFormName}`)!.get('dropdown')?.setValue(this.dropdownForm()?.select);
    });
  }

  ngOnInit() {
    this.group().addControl(this.dropdownForm()!.groupFormName, this.formBuilder.group({
      dropdown: [ { value: this.dropdownForm()!.select, disabled: this.dropdownForm()!.disabledInput }, this.validators[this.dropdownForm()!.validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.dropdownForm()!.groupFormName}`)!.get('dropdown'));
    this.group().get(`${this.dropdownForm()!.groupFormName}`)!.get('dropdown')!.updateValueAndValidity();
  }

  compareTech(t1: SelectOption, t2: SelectOption): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
