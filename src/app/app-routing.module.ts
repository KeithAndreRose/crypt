import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { PromoComponent } from './components/promo/promo.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { EncryptionAnimComponent } from './components/encryption-anim/encryption-anim.component';
import { LoadingComponent } from './components/loading/loading.component';



const routes: Routes = [
  {path:'', redirectTo:'app', pathMatch:'full'},
  {path:'app',
  children:[
    {path: ':key/:id', component:HomeComponent},
    {path: ':key', component:HomeComponent},
    {path: '**', component:HomeComponent}
  ]
},
  {path:'profile', component:ProfileComponent},
  {path:'controlpanel', component:ControlPanelComponent},
  {path:'promo', component:PromoComponent},
  {path:'tutorial', component:TutorialComponent},
  {path:'dev',
  children: [
    {path: 'cipher', component: EncryptionAnimComponent},
    {path: 'loader', component: LoadingComponent}
  ]},
  {path:'**', redirectTo:'app', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
