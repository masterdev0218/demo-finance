import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VariantIconComponent } from '../../../shared/components/variant-icon.component';
// import { UserLogin } from '../../../features/login/models/user-login';
// import { Store } from '@ngrx/store';
// import { selectUserLogged } from '../../../features/login/store/user.selector';
import { principalRoute } from '../../../enviroments/route';
// import {
//   logoutUser,
//   logoutMicrosoft,
//  } from
//  '../../../features/login/store/user.action';
// import { MsalService } from '@azure/msal-angular';
// import { openSpinner } from '../../../shared/store/setting.action';
// import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, VariantIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  principalRoute = signal(principalRoute);
  // user = this.store.selectSignal<UserLogin | null>(selectUserLogged);

  // constructor(private store: Store, private authServiceMsal: MsalService) {
  //   this.authServiceMsal.initialize();
  // }

  // logout() {
  //   if (this.authServiceMsal.instance.getAllAccounts().length > 0) {
  //     this.store.dispatch(openSpinner());
  //     this.store.dispatch(logoutMicrosoft(this.user()!));
  //     setTimeout(() => {
  //       this.authServiceMsal.logoutRedirect({
  //         postLogoutRedirectUri: environment.urlFE + principalRoute.login,
  //       });
  //     }, 2000);
  //   } else {
  //     this.store.dispatch(logoutUser(this.user()!));
  //   }
  // }
}

