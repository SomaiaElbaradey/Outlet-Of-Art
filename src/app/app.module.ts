declare var require: any
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EventEmitterService } from './services/event-emitter.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AboutComponent } from './components/about/about.component';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { LogginAuthGuardService } from './services/loggin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthService } from './services/admin-auth.service';
import { UserAuthService } from './services/user-auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromotionComponent } from './components/promotion/promotion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [LogginAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LogginAuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService, UserAuthService] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuardService, UserAuthService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    OrderComponent,
    CartComponent,
    SliderComponent,
    AboutComponent,
    OrdersComponent,
    AddProductComponent,
    PromotionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule
  ],
  providers: [
    AuthGuardService,
    LogginAuthGuardService,
    UserAuthService,
    AdminAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    EventEmitterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }