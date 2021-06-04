import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';
import {AppRegistrationOptions} from '../tokens/microzords';
import {registerApp} from '@microzord/core';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  constructor(private loader: LoaderService) {}

  registerApps(apps: AppRegistrationOptions[]) {
    apps.map(app => this.register(app));
  }

  register({name, assetMap, props}: AppRegistrationOptions) {
    registerApp({
      name,
      props,
      loadApp: () => this.loader.loadByAssetsMap(name, assetMap),
    });
  }
}
