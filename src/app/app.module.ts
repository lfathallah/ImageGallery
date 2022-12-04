import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DisplayComponent} from './display/display.component';
import {DisplayService} from "./display/display.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [DisplayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
