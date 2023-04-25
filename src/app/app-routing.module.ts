import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminGuardService } from './services/admin-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AddEncuestaComponent } from './pages/admin/add-encuesta/add-encuesta.component';
import { ViewEncuestaComponent } from './pages/admin/view-encuesta/view-encuesta.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },


  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuardService],
    children:[
      {
        path : '',
        component : WelcomeComponent
      },
      {
        path:'encuesta',
        component:ViewEncuestaComponent
      },
      {
        path:'add-encuesta',
        component:AddEncuestaComponent
      },
    ]
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
