import path from 'path';
import glob from 'glob';
import Hapi from '@hapi/hapi';
import config from '.';
import { Environments } from './types';

const registerModules = async (server: Hapi.Server): Promise<void> => {
  const dirname = path.join(__dirname, '../');
  // TODO: read de js file on prod and not build read de ts file
  const routesFile = config.server.environment === Environments.PROD ? 'index.js' : 'index.ts';
  const modules = glob.sync(`/modules/**/${routesFile}`, {
    root: dirname,
  });
  for (const file of modules) {
    const module = require(file);
    
    await server.register({
      plugin: module,
      options: {
        routePrefix: '/api'
      }
    });
    
    console.log(
      `\x1b[33mModule register:\x1b[0m ${module.name}`
    );

  }
};

export default registerModules;
