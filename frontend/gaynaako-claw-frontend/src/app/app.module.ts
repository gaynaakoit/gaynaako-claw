import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { TendersComponent } from './pages/tenders/tenders.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CompaniesComponent,
    TendersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
