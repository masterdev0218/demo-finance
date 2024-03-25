import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, effect, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAreaForm } from '../../models/form/text-area';

@Component({
  selector: 'app-text-area',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div [formGroup]="group()">
      <span [ngClass]="{'text-red-700': (this.elementForm()!.hasError('required') || this.elementForm()!.hasError('pattern')) && submitted()}">{{textAreaForm()!.label}}:</span>
      <div [formGroupName]="textAreaForm()!.groupFormName" class="flex flex-col">
        <textarea
          [rows]="textAreaForm()?.rows"
          [cols]="textAreaForm()?.cols"
          class="textarea textarea-bordered"
          formControlName="textArea"
          [placeholder]="textAreaForm()!.placeholder || ''"
          [ngClass]="{
            'textarea-error': this.elementForm()!.hasError('required') && submitted()
          }"
        >
        </textarea>
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
export class TextAreaComponent implements OnInit {

  group = input.required<FormGroup>();
  submitted = input<boolean>();
  textAreaForm = input<TextAreaForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);


  validators: Validators[] = [
    [Validators.required],
  ];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.group().get(`${this.textAreaForm()!.groupFormName}`)!.get('textArea')?.setValue(this.textAreaForm()!.select);
    })
  }

  ngOnInit() {
    this.group().addControl(this.textAreaForm()!.groupFormName, this.formBuilder.group({
      textArea: [ { value: this.textAreaForm()!.select, disabled: this.textAreaForm()!.disabledInput }, this.validators[this.textAreaForm()!.validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.textAreaForm()!.groupFormName}`)!.get('textArea'));
    this.group().get(`${this.textAreaForm()!.groupFormName}`)!.get('textArea')!.updateValueAndValidity();
  }

}
