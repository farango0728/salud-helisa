import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getMedicalExamn, createMedicalExam, updateMedicalExam } from './controller';

export = {
  name: 'MedicalExams',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/exam/medicalExams`,
      options: {
        description: 'Get medicalExams service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getMedicalExamn,
    });
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/exam/medicalExam`,
      options: {
        description: 'Get medicalExam service',
        notes: 'Service to obtain the health of the project',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            name: Joi.string().required(),
          })
        },
      },
      handler: createMedicalExam,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/exam/updateMedicalExam`,
      options: {
        description: 'Get updateMedicalExam service',
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
      handler: updateMedicalExam,
    });
  },
};