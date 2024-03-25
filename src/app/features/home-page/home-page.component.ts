import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserLogin } from '../login/models/user-login';
import { selectUserLogged } from '../login/store/user.selector';
import { CommonModule } from '@angular/common';
import { VariantIconComponent } from '../../shared/components/variant-icon.component';
import { ButtonIcon } from '../../shared/models/button-element';
import { RouterLink } from '@angular/router';
import { principalRoute } from '../../../environments/route';

@Component({
  selector: 'app-home-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VariantIconComponent,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

  constructor(private store: Store) {}

  principalRoute = signal(principalRoute);
  userLogged = this.store.selectSignal<UserLogin | null>(selectUserLogged);
  iconIoc = signal<ButtonIcon>({
    variant: 'operationIcon',
  });
  iconScheduler = signal<ButtonIcon>({
    variant: 'calendarEdit',
  });

}
