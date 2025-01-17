import { ApplicationMock } from '@mexo/core/testing';

import { Application } from '../models/application';
import { AppRegistrationOptions } from '../models/registration-options';
import { entityOptionsRegistry, loadedEntityRegistry } from '../registry';
import { constructAndBootstrapApp } from './construct-and-bootstrap-app';
import { loadApp } from './load-app';
import { registerApp } from './register-app';

function clearRegistry() {
  loadedEntityRegistry.clear();
  entityOptionsRegistry.clear();
}

describe('constructAndBootstrapApp', () => {
  let options: AppRegistrationOptions;
  let loadFn: jest.SpiedFunction<AppRegistrationOptions['load']>;

  beforeEach(async () => {
    options = {
      name: 'appMock',
      async load() {
        return ApplicationMock;
      },
    };

    loadFn = jest.spyOn(options, 'load');

    registerApp(options);
  });

  describe('An app is already loaded', () => {
    beforeEach(async () => {
      await loadApp('appMock');
    });

    it("shouldn't load an app again", async () => {
      expect.assertions(1);

      await constructAndBootstrapApp('appMock', '#container');

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await constructAndBootstrapApp('appMock', '#container');

      expect(app).toBeInstanceOf(ApplicationMock);
    });
  });

  describe('An app is NOT loaded', () => {
    it('should load an app', async () => {
      expect.assertions(1);

      await constructAndBootstrapApp('appMock', '#container');

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await constructAndBootstrapApp('appMock', '#container');

      expect(app).toBeInstanceOf(Application);
    });
  });

  afterEach(() => {
    clearRegistry();
  });
});
