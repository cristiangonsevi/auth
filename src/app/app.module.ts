import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

import { LocalStorageService } from './services/local-storage.service';
import { SweetAlertService } from './services/sweet-alert.service';
import { StoreModule } from '@ngrx/store';
import { ROOT_EFFECTS, ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot(ROOT_EFFECTS),
    StoreDevtoolsModule.instrument({ name: 'TESTING'})
  ],
  providers: [SweetAlertService, LocalStorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
