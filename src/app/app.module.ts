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
import { CssThemeingService } from './services/css-themeing.service';
import { ChestItemComponent } from './components/chest-item/chest-item.component';
import { DecryptPipe } from './pipes/decrypt.pipe';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { ItemManagerService } from './services/item-manager.service';
import { PromoComponent } from './components/promo/promo.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainMenuComponent,
    HomeComponent,
    ProfileComponent,
    ChestItemComponent,
    DecryptPipe,
    ControlPanelComponent,
    ItemEditorComponent,
    PromoComponent,
    NotificationComponent,
    TutorialComponent
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
    FirebaseService,
    CssThemeingService,
    ItemManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
