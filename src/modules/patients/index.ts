import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getPatients, createPatient, updatePatient } from './controller';

export = {
  name: 'Patients',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/partient/patients`,
      options: {
        description: 'Get patients service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getPatients,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/partient/patient`,
      options: {
        description: 'Get patients service',
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
      handler: createPatient,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/partient/updatePatient`,
      options: {
        description: 'Get updatePatient service',
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
      handler: updatePatient,
    });
  },
};