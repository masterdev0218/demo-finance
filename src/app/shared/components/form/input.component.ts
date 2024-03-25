import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, effect, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputForm } from '../../models/form/input-form';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div [formGroup]="group()">
      <span [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{inputForm().label}}:</span>
      <div [formGroupName]="inputForm().groupFormName" class="flex flex-col">
        <input
          formControlName="input"
          [type]="inputForm().type || 'text'"
          [placeholder]="inputForm().placeholder || ''"
          class="input input-bordered w-full"
          [ngClass]="{
            'input-error': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()
          }"
        />
        <div class="h-1">
          @if (submitted() && this.elementForm()!.hasError('required')) {
            <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
          }
          @if (submitted() && !this.elementForm()!.hasError('required') && this.elementForm()!.hasError('pattern') && inputForm().type === 'email') {
            <span class="text-red-700 text-sm align-top">Inserisci una mail valida</span>
          }
          @if (submitted() && !this.elementForm()!.hasError('required') && this.elementForm()!.hasError('pattern') && inputForm().type === 'password') {
            <span class="text-red-700 text-sm w-[20%] align-top">La password deve essere composta da almeno un numero, una minuscola, una maiuscola e non deve contenere caratteri speciali</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class InputComponent implements OnInit {

  group = input.required<FormGroup>();
  submitted = input<boolean>();
  inputForm = input.required<InputForm>();

  elementForm = signal<AbstractControl<any, any> | null>(null);

  validators: Validators[] = [
    [Validators.required],
    [Validators.required, Validators.pattern(new RegExp(/\w+@\w+\.\w{2,4}/i))],
    [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')],
    [Validators.pattern('(?=.*[A-Z])(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]
  ];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.group().get(`${this.inputForm().groupFormName}`)!.get('input')?.setValue(this.inputForm().select);
    })
  }

  ngOnInit() {
    this.group().addControl(this.inputForm().groupFormName, this.formBuilder.group({
      input: [ { value: this.inputForm().select, disabled: this.inputForm().disabledInput }, this.validators[this.inputForm().validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.inputForm().groupFormName}`)!.get('input'));
    this.group().get(`${this.inputForm().groupFormName}`)!.get('input')!.updateValueAndValidity();
  }

}
