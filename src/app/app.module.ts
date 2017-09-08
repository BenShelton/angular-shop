// angular packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// installed packages
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ToasterModule } from 'angular2-toaster';

// reducers
import { reducers, metaReducers } from './reducers';

// effects
import { UserEffects } from './effects/user';

// services
import { UserService } from './services/user.service';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

// router setup
const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    ToasterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    RouterModule.forRoot(appRoutes, {/* enableTracing: true */})
  ],
  providers: [
    UserService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
