import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

import { AppBarComponent } from './app-bar/app-bar.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import {MatDividerModule} from '@angular/material/divider';
import { ClosetAddDialog, ClosetComponent } from './closet/closet.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { AuthenticationService } from './Services/authentication.service';
import { ClothingTypePipe } from '../pipes/clothing-type.pipe';
import {AppBarAboutDialog} from './app-bar/app-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HomeComponent,
    SidenavComponent,
    BottomNavComponent,
    LoginComponent,
    ClosetComponent,
    FavoritesComponent,
    SpeedDialFabComponent,
    ClothingTypePipe,
    AppBarAboutDialog,
    ClosetAddDialog,
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebaseConfig),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatTooltipModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule
  ],
  exports: [AngularFireModule, AngularFireAuthModule],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
