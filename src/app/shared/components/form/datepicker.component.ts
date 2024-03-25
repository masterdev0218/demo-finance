import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, input, signal, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerForm } from '../../models/form/datepicker-form';
declare var Datepicker: any;

@Component({
  selector: 'app-datepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <div class="relative max-w-xs" [formGroup]="group()">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg class="w-4 h-4 mt-[100%] text-[#6b7280]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div>
      <span [ngClass]="{'text-red-700': this.elementForm()!.hasError('required') && submitted()}">{{datepickerForm()!.label}}:</span>
      <div [formGroupName]="datepickerForm()!.groupFormName">
        <input
          id="inputDate"
          datepicker
          type="text"
          class="pl-10 input input-bordered w-full" [placeholder]="datepickerForm()!.placeholder || ''"
          formControlName="datepicker"
          [ngClass]="{
            'input-error': this.elementForm()!.hasError('required') && submitted(),
          }"
        >
        <div class="h-1">
          @if (submitted() && this.elementForm()!.hasError('required')) {
            <span class="text-red-700 text-sm align-top">Campo Obbligatorio</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class DatepickerComponent implements OnInit, OnDestroy {

  group = input.required<FormGroup>();
  submitted = input<boolean>();
  datepickerForm = input<DatepickerForm>();
  elementForm = signal<AbstractControl<any, any> | null>(null);
  inputDate = signal<HTMLElement | null>(null);
  timer: any;

  validators: Validators[] = [
    [Validators.required],
  ];

  eventListener = (e: any) => {
    const value = e.target.value;
    this.group().get(`${this.datepickerForm()!.groupFormName}`)!.get('datepicker')!.setValue(value);
    this.group().get(`${this.datepickerForm()!.groupFormName}`)!.get('datepicker')!.updateValueAndValidity();
  };

  constructor(private formBuilder: FormBuilder) {
    effect( () => {
      if (this.inputDate()) {
        this.inputDate()!.addEventListener('changeDate', this.eventListener);
      }
      this.group().get(`${this.datepickerForm()!.groupFormName}`)!.get('datepicker')?.setValue(this.datepickerForm()!.select);
    })
  }

  ngOnInit() {
    this.initDatePicker();
    this.group().addControl(this.datepickerForm()!.groupFormName, this.formBuilder.group({
      datepicker: [ { value: this.datepickerForm()!.select, disabled: this.datepickerForm()!.disabledInput }, this.validators[this.datepickerForm()!.validatorNumber!] ]
    }));
    this.elementForm.set(this.group().get(`${this.datepickerForm()!.groupFormName}`)!.get('datepicker'));
    this.group().get(`${this.datepickerForm()!.groupFormName}`)!.get('datepicker')!.updateValueAndValidity();
  }

  private initDatePicker(): void {
    Datepicker.locales.it =  {
      days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
      months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
      today: "Oggi",
      monthsTitle: "Mesi",
      clear: "Cancella",
      weekStart: 1,
      format: "dd/mm/yyyy"
    }
    this.timer = setTimeout(() => {
     this.inputDate.set(document.getElementById('inputDate'));
     new Datepicker(this.inputDate(), {language: 'it'});
    });
  }

  ngOnDestroy() {
    this.inputDate()?.removeEventListener('changeDate', this.eventListener);
    clearTimeout(this.timer);
  }

}
