import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { ButtonElement } from '../models/button-element';
import { VariantIconComponent } from "./variant-icon.component";

@Component({
    selector: 'app-pagination',
    standalone: true,
    template: `
      <div class="mt-6 mb-6" >
        <div class="flex justify-center items-center gap-2">
          <button
            (click)="pageNumberChanged.emit(0)"
            class="join-item btn text-white backdrop-blur-md shadow ring-1 ring-black ring-opacity-5 px-3 py-2 hover:text-white"
            [disabled]="pageNumber() === 0">
              Page: 1
          </button>
          <button
            (click)="pageNumberChanged.emit(pageNumber() - 1)"
            class="join-item btn  text-white backdrop-blur-md shadow ring-1 ring-black ring-opacity-5 px-3 py-2 hover:text-white"
            [disabled]="pageNumber() === 0">
              <app-variant-icon [variant]="leftButton()?.icon?.variant"></app-variant-icon>
          </button>
          @for (page of visiblePage(); track $index) {
            <button
              (click)="pageNumberChanged.emit(page)"
              [ngClass]=" {'text-white backdrop-blur-md' : pageNumber()===page, 'join-item btn text-white backdrop-blur-md shadow ring-1 ring-black ring-opacity-5 px-3 py-2 hover:text-white' : pageNumber() !== page }">
                {{page + 1}}
            </button>
          }
          <button
            (click)="pageNumberChanged.emit(pageNumber() + 1)"
            class="join-item btn  text-white backdrop-blur-md shadow ring-1 ring-black ring-opacity-5 px-3 py-2 hover:text-white"
            [disabled]="pageNumber() === totalPages() -1">
              <app-variant-icon [variant]="rightButton()?.icon?.variant"></app-variant-icon>
          </button>
          <button
            (click)="pageNumberChanged.emit(totalPages() - 1)"
            class="join-item btn  text-white backdrop-blur-md shadow ring-1 ring-black ring-opacity-5 px-3 py-2 hover:text-white"
            [disabled]="pageNumber() === totalPages() -1">
              Page: {{totalPages()}}
          </button>
        </div>
      </div>
    `,
    styles: ``,
    imports: [NgClass, VariantIconComponent]
})
export class PaginationComponent {

  leftButton = input<ButtonElement | undefined>();
  rightButton = input<ButtonElement | undefined>();
  pageElement = input.required<number>();
  totalElementNumber = input.required<number>();
  pageNumber = input.required<number>();
  @Output() pageNumberChanged = new EventEmitter<number>();

  totalPages = computed(() =>
    Math.ceil(this.totalElementNumber()! / this.pageElement())
  );

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i)
  );

  visiblePage = computed(() =>
    this.pageNumbers().slice(this.pageNumber() >0 ? this.pageNumber() -1 : 0, this.pageNumber() + 2)
  );

  constructor() {
  }

}
