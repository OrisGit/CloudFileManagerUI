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
import { PlatformTableComponent } from './components/platform-table/platform-table.component';
import { DeveloperTableComponent } from './components/developer-table/developer-table.component';
import { PublisherTableComponent } from './components/publisher-table/publisher-table.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import {MatFormFieldModule} from "@angular/material/form-field";


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'genres', component: GenreTableComponent},
  { path: 'platforms', component: PlatformTableComponent},
  { path: 'developers', component: DeveloperTableComponent},
  { path: 'publishers', component: PublisherTableComponent},
  { path: 'games', component: GameTableComponent},
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
    GenreTableComponent,
    PlatformTableComponent,
    DeveloperTableComponent,
    PublisherTableComponent,
    GameTableComponent
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
    MatTableModule,
    MatFormFieldModule
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
