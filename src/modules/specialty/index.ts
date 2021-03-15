import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getSpecialties, createSpecialty, updateSpecialty } from './controller';

export = {
  name: 'Specialty',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/specialty/specialties`,
      options: {
        description: 'Get specialties service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getSpecialties,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/specialty/specialty`,
      options: {
        description: 'Get specialty service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            name: Joi.string().required()
          })
        },
      },
      handler: createSpecialty,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/specialty/updateSpecialty`,
      options: {
        description: 'Get updateSpecialty service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: updateSpecialty,
    });
  },
};