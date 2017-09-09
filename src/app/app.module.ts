// angular packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// installed packages
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

// routes
import { routes } from './app.routes';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { ManagerComponent } from './manager/manager.component';

// shared modules
import { ProductListModule } from './product-list/product-list.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    AccountComponent,
    ShopComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductListModule,
    RegisterModule,
    ToasterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    RouterModule.forRoot(routes, {/* enableTracing: true */})
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
