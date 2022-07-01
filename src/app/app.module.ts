import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

import { LocalStorageService } from './services/local-storage.service';
import { SweetAlertService } from './services/sweet-alert.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SweetAlertService, LocalStorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
