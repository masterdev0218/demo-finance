import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { VariantIconComponent } from './variant-icon.component';
import { ButtonElement } from '../models/button-element';

@Component({
  selector: 'app-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-x-auto w-full flex justify-center">
      @if(data() && data()!.length > 0) {
      <table
        class="border border-slate-700 border-separate border-spacing-2 !w-[90%] rounded-lg whitespace-nowrap md:whitespace-normal block xl:table overflow-x-auto"
      >
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            @for (col of cols(); track $index) {
            <th class="rounded-lg text-white" [style.width.%]="col.width">
              {{ col.header }}
            </th>
            }
          </tr>
        </thead>
        <tbody>
            @for (item of data(); track $index) {
            <tr
              class="hover:bg-base-200 "
              [ngClass]="{ 'cursor-pointer': pathRouter() }"
              [routerLink]="
                pathRouter() ? [pathRouter(), item[paramRouter()!]] : null
              "
            >
              @for (col of cols(); track $index) {
                @switch (col.field) {
              @case('buttonSuccess') {
              <td class="rounded-lg hover:rounded-lg text-center">
                <button
                  type="button"
                  class="btn btn-success success min-h-0 h-auto tooltip"
                  [attr.data-tip]="buttonSuccess()?.tooltip"
                  (click)="onBtnSuccess.emit(item)"
                >
                  <app-variant-icon
                    [marginTop]="buttonSuccess()?.icon?.marginTop"
                    [variant]="buttonSuccess()?.icon?.variant"
                  ></app-variant-icon
                  >{{ buttonSuccess()?.name }}
                </button>
              </td>
              }
              @case('buttonSuccessIoc') {
              <td class="rounded-lg hover:rounded-lg text-center">
                @if(item['dateDelete'] === 'N.A.') {
                  <button
                    type="button"
                    class="btn btn-success success min-h-0 h-auto tooltip"
                    [attr.data-tip]="buttonSuccessIoc()?.tooltip"
                    (click)="onBtnSuccess.emit(item)"
                  >
                    <app-variant-icon
                      [marginTop]="buttonSuccessIoc()?.icon?.marginTop"
                      [variant]="buttonSuccessIoc()?.icon?.variant"
                    ></app-variant-icon
                    >{{ buttonSuccessIoc()?.name }}
                  </button>
                }
              </td>
              } @case ('buttonNeutral') {
              <td class="rounded-lg hover:rounded-lg text-center">
                <button
                  type="button"
                  class="btn btn-neutral neutral min-h-0 h-auto tooltip"
                  [attr.data-tip]="buttonNeutral()?.tooltip"
                  (click)="onBtnNeutral.emit(item)"
                >
                  <app-variant-icon
                    [marginTop]="buttonNeutral()?.icon?.marginTop"
                    [variant]="buttonNeutral()?.icon?.variant"
                  ></app-variant-icon
                  >{{ buttonNeutral()?.name }}
                </button>
              </td>
              } @case ('buttonError') {
              <td class="rounded-lg hover:rounded-lg text-center">
                <button
                  type="button"
                  class="btn btn-error error min-h-0 h-auto tooltip"
                  [attr.data-tip]="buttonError()?.tooltip"
                  (click)="onBtnError.emit(item)"
                >
                  <app-variant-icon
                    [marginTop]="buttonError()?.icon?.marginTop"
                    [variant]="buttonError()?.icon?.variant"
                  ></app-variant-icon
                  >{{ buttonError()?.name }}
                </button>
              </td>
              } @case ('role') {
              <td
                class="rounded-lg hover:rounded-lg text-lg"
                [style.width.%]="col.width"
              >
                {{ item[col.field].name }}
              </td>
              } @case ('author') {
              <td
                class="rounded-lg hover:rounded-lg text-lg"
                [style.width.%]="col.width"
              >
                {{ item[col.field] ? item[col.field].name + ' ' + item[col.field].surname : 'N.A.'  }}
              </td>
              } @case ('iocType') {
              <td
                class="rounded-lg hover:rounded-lg text-lg"
                [style.width.%]="col.width"
              >
                {{ item[col.field].name }}
              </td>
              } @case ('dateDelete') {
              <td
                class="rounded-lg hover:rounded-lg text-lg"
                [style.width.%]="col.width"
              >
                @if (col.field === 'dateDelete' && col.header === 'Attivo') {
                  <div class="w-full flex justify-center">
                    <div
                      class="tooltip flex-none rounded-full p-2 w-[1.8rem]"
                      [attr.data-tip]="item[col.field] === 'N.A.' ? 'Abilitato' : 'Disabilitato'"
                      [ngClass]="
                        item[col.field] === 'N.A.'
                          ? ' text-green-200 bg-teal-400/10'
                          : ' text-rose-400 bg-rose-400/10'
                      "
                    >
                      <div
                        class="h-3 w-3 rounded-full"
                        [ngClass]="
                          item[col.field] === 'N.A.' ? ' bg-green-400' : ' bg-rose-600'
                        "
                      ></div>
                    </div>
                  </div>

                } @else {
                {{ item[col.field] }}
                }
              </td>
              } @default {
              <td
                class="rounded-lg hover:rounded-lg text-lg break-all "
                [style.width.%]="col.width"
              >
                {{ item[col.field] }}
              </td>
              } } }
            </tr>
            }
          </tbody>
        </table>
      }
      @else {
        <div class="!w-[90%] border border-slate-700 rounded-2xl h-12 flex justify-center items-center">
          <p class="text-lg text-center w-full text-white">
            Nessun record presente
          </p>
        </div>
      }
    </div>
  `,
  styles: ``,
  imports: [RouterLink, CommonModule, VariantIconComponent],
})
export class TableComponent {
  cols = input.required<{ field: string; header: string; width: number }[]>();
  data = input.required<any[] | null>();
  pathRouter = input<string>();
  paramRouter = input<string | number>();
  buttonSuccess = input<ButtonElement | undefined>();
  buttonNeutral = input<ButtonElement | undefined>();
  buttonError = input<ButtonElement | undefined>();
  buttonSuccessIoc = input<ButtonElement | undefined>();
  @Output() onBtnSuccess = new EventEmitter();
  @Output() onBtnNeutral = new EventEmitter();
  @Output() onBtnError = new EventEmitter();
}
