import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { InputForm } from '../../shared/models/form/input-form';
import { InputComponent } from '../../shared/components/form/input.component';
// import { Store } from '@ngrx/store';
// import { loginMicrosoft, loginUser } from '../../store/user.action';
// import {
//   openAlert,
//   openSpinner,
// } from '../../../../shared/store/setting.action';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import {
//   RedirectRequest,
// } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  form = signal<FormGroup | undefined>(undefined);
  submitted = signal<boolean>(false);
  inputEmail = signal<InputForm | null>(null);
  inputPassword = signal<InputForm | null>(null);
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    // private store: Store,
    // @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private authService: MsalService,
  ) {
    this.form.set(this.formBuilder.group({}));
  }

  ngOnInit() {
    this.inputEmail.update((val) => {
      return (val = {
        groupFormName: 'email',
        label: 'Email',
        placeholder: 'Inserisci Email',
        validatorNumber: 1,
        type: 'email'
      });
    });
    this.inputPassword.update((val) => {
      return (val = {
        groupFormName: 'password',
        label: 'Password',
        placeholder: 'Inserisci Password',
        validatorNumber: 0,
        type: 'password',
      });
    });

    // this.authService.handleRedirectObservable().subscribe((res) => {
    //   if (res && res.accessToken) {
    //     this.store.dispatch(openSpinner());
    //     this.store.dispatch(loginMicrosoft({token: res.accessToken}));
    //   }
    // });
  }

  login() {
    this.submitted.update(s => true);
    this.form()!.markAllAsTouched();
    // if (this.form()!.status === 'INVALID') {
    //   this.store.dispatch(
    //     openAlert({
    //       duration: 4000,
    //       message: `Compila il form correttamente`,
    //       variant: 'error',
    //     })
    //   );
    // } else {
    //   this.store.dispatch(
    //     loginUser({
    //       email: this.form()?.value.email.input,
    //       password: this.form()?.value.password.input,
    //     })
    //   );
    // }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // loginRedirect() {
  //   if (this.msalGuardConfig.authRequest) {
  //     this.authService.loginRedirect({
  //       ...this.msalGuardConfig.authRequest,
  //     } as RedirectRequest);
  //   } else {
  //     this.authService.loginRedirect();
  //   }
  // }
}
