import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, SkipSelf } from '@angular/core';
import { Optional } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LayoutModule } from '@angular/cdk/layout';

import { environment } from '../../environments/environment';
import { EnsureModuleLoadedOnceGuard } from './guards/ensureModuleLoadedOnceGuard';
import { LoaderInterceptor } from './interceptors/spinner.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppLayoutModule } from './layout/layout.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigModule } from './configuration/config.module';
import { BackendModule } from './configuration/backend-config.module';

@NgModule({
  imports: [
    AppLayoutModule,
    BackendModule.withConfig(environment.backend),
    ButtonModule,
    CommonModule,
    ConfigModule.forRoot(environment.Ui),
    HttpClientModule,
    InputTextareaModule,
    InputTextModule,
    LayoutModule,
    NavigationModule,
    NgxSpinnerModule,
    RippleModule,
    RouterModule,
    SidebarModule,
    ToastModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
  ],
  exports: [
    AppLayoutModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    NavigationModule,
    NgxSpinnerModule,
    RippleModule,
    SidebarModule,
    ToastModule,
    UtilsModule,
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
