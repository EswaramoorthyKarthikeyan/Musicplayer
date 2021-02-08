import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppServiceService } from './app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NotfoundComponent } from './feature/notfound/notfound.component';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { FeatureModule } from './feature/feature.module';
// Import BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// Import your library
import { AlertModule } from 'ngx-alerts';
import { IndexComponent } from './index/index.component';
import { SelectedplaylistComponent } from './selectedplaylist/selectedplaylist.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    NavbarComponent,
    IndexComponent,
    SelectedplaylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FeatureModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({
      maxMessages: 5,
      timeout: 5000,
      positionX: 'right',
      positionY: 'bottom',
    }),
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
