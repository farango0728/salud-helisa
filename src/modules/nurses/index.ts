import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getNurses, createNurse, updateNurse } from './controller';

export = {
  name: 'Nurses',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/nurses`,
      options: {
        description: 'Get nurses service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getNurses,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/nurse`,
      options: {
        description: 'Get nurses service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            identification: Joi.number().required(),
            name: Joi.string().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: createNurse,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/updateNurse`,
      options: {
        description: 'Get updateNurse service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            identification: Joi.number().required(),
            name: Joi.string().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: updateNurse,
    });
  },
};