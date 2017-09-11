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
import { UsersEffects } from './effects/users';
import { ProductEffects } from './effects/product';
import { CartEffects } from './effects/cart';
import { OrderEffects } from './effects/order';

// services
import { UserService } from './services/user.service';
import { UsersService } from './services/users.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

// routes
import { routes } from './app.routes';

// guards
import { AdminGuard } from './guards/admin.guard';
import { ManagerGuard } from './guards/manager.guard';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';

// shared modules
import { ProductListModule } from './product-list/product-list.module';
import { RegisterModule } from './register/register.module';
import { AccountModule } from './account/account.module';
import { OrderListModule } from './order-list/order-list.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    ShopComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductListModule,
    RegisterModule,
    AccountModule,
    OrderListModule,
    ToasterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects,
      UsersEffects,
      ProductEffects,
      CartEffects,
      OrderEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 7 }),
    RouterModule.forRoot(routes, {/* enableTracing: true */})
  ],
  providers: [
    UserService,
    UsersService,
    ProductService,
    OrderService,
    AdminGuard,
    ManagerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
