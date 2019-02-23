import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export const PROGRAM_VERSION: string = "0.1";
export const PROGRAM_LICENCE: string = "GPLv3";
export const PROGRAM_AUTHORS: Array<string> = ["Mondei1", "720degreeLotus"]

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
