import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';



const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',
  children:[
    {path: ':key', component:HomeComponent},
    {path: '**', component:HomeComponent}
  ]
},
  {path:'profile', component:ProfileComponent},
  {path:'controlpanel', component:ControlPanelComponent},
  {path:'**', redirectTo:'home', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
