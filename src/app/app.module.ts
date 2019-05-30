import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { environment } from '../environments/environment';

import { AuthService } from "./services/auth.service";
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainMenuComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) : []
  ],
  providers: [
    AuthService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
