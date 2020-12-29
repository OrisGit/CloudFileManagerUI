import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import {HttpInterceptorService} from './service/http-interceptor.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from "@angular/material/table";
import { GenreTableComponent } from './components/genre-table/genre-table.component';


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'genre', component: GenreTableComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LogoutComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    GenreTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      newestOnTop: true
    }),
    MatTableModule
  ],
  entryComponents: [
    SpinnerOverlayComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
