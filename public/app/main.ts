import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
import { isProd } from './serverInfo';
if (isProd) enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);