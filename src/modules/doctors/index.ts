import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi'
import { Options } from '../../config/types';
import { getDoctors, createDoctor, updateDoctor } from './controller';

export = {
  name: 'Doctors',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/doctors`,
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getDoctors,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/doctor`,
      options: {
        description: 'Get doctor service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            identification: Joi.number().required(),
            name: Joi.string().required(),
            specialty: Joi.number().min(1).max(9999).required().strict(true),
            cardNumber: Joi.string().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: createDoctor,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/updateDoctor`,
      options: {
        description: 'Get updateDoctor service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            identification: Joi.number().required(),
            name: Joi.string().required(),
            specialty: Joi.number().min(1).max(9999).required().strict(true),
            cardNumber: Joi.string().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: updateDoctor,
    });
  },
};