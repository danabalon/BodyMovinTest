import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CanvasLottie4Page} from "../pages/canvas-lottie4/canvas-lottie4";
import { HttpClientModule } from '@angular/common/http';


import { LottieAnimationViewModule } from 'ng-lottie';
import {Prueba2Page} from "../pages/prueba2/prueba2";
import {TabsPage} from "../pages/tabs/tabs";
import {Example2Page} from "../pages/example2/example2";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Prueba2Page,
    Example2Page,
    TabsPage,
    CanvasLottie4Page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LottieAnimationViewModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    Prueba2Page,
    Example2Page,
    TabsPage,
    CanvasLottie4Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
