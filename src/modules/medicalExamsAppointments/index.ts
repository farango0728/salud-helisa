import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getMedicalExamsAppointment, createMedicalExamAppointment} from './controller';

export = {
  name: 'MedicalExamsAppointments',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/consult/medicalExamAppointments`,
      options: {
        description: 'Get medicalExamsAppointments service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getMedicalExamsAppointment,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/consult/medicalExamAppointment`,
      options: {
        description: 'Get medicalExamsAppointment service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            idMedicalAppointment: Joi.number().required(),
            idMedicalExam: Joi.number().required(),
          })
        },
      },
      handler: createMedicalExamAppointment,
    });
  },
};