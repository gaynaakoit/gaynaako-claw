import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TendersComponent } from './pages/tenders/tenders.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'tenders', component: TendersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
