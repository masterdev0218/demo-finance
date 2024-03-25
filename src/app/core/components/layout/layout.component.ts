import { VariantIconComponent } from './../../../shared/components/variant-icon.component';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { principalRoute } from '../../../../environments/route';
import { Store } from '@ngrx/store';
import { UserLogin } from '../../../features/login/models/user-login';
import { selectUserLogged } from '../../../features/login/store/user.selector';
import { ButtonIcon } from '../../../shared/models/button-element';

@Component({
  selector: 'app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    RouterLink,
    VariantIconComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {
  principalRoute = signal(principalRoute);
  userLogged = this.store.selectSignal<UserLogin | null>(selectUserLogged);
  iconIoc = signal<ButtonIcon>({
    variant: 'operationIcon',
    marginTop: 'mt-[5px]'
  });
  iconScheduler = signal<ButtonIcon>({
    variant: 'calendarEdit',
    marginTop: 'mt-[5px]'
  });
  iconAdministration = signal<ButtonIcon>({
    variant: 'setting',
    marginTop: 'mt-[5px]'
  });
  iconUser = signal<ButtonIcon>({
    variant: 'user',
    marginTop: 'mt-[5px]'
  });

  constructor(private store: Store) {

  }
}
