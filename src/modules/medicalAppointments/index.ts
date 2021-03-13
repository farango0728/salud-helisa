import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getMedicalAppointment, createMedicalAppointment, updateMedicalAppointment } from './controller';

export = {
  name: 'MedicalAppointments',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/medicalAppointments`,
      options: {
        description: 'Get medicalAppointments service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getMedicalAppointment,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/medicalAppointment`,
      options: {
        description: 'Get medicalAppointment service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            date:Joi.string().required(),
            idPatient: Joi.number().required(),
            idDoctor: Joi.number().required(),
            idNurse: Joi.number().required(),
            state: Joi.boolean().required()
          })
        },
      },
      handler: createMedicalAppointment,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/updateMedicalAppointment`,
      options: {
        description: 'Get updateMedicalAppointment service',
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
      handler: updateMedicalAppointment,
    });
  },
};