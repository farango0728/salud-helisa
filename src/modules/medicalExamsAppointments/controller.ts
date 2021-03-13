import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import MedicalExamsAppointment from '../../entities/medicalExamsAppointment';
import MedicalExams from '../../entities/medicalExams';
import MedicalAppointments from '../../entities/medicalAppointments';

import { Message, TypesMedicalExamsAppointment} from './types'; 


export async function getMedicalExamsAppointment(req: Hapi.request){
  try{
    const connection: Connection = req.server.app.connection;
    const data = await connection.manager.
      createQueryBuilder()
      .select(['m.idMedicalAppointment as idMedicalAppointment', 'ma.idDoctor as idDoctor', 'd.name as doctor', 's.name as specialty', 'p.identification as identification', 'p.name as patient', 'm.idMedicalExam', 'e.name as examn' ])
      .from(MedicalExamsAppointment, 'm')
      .innerJoin('m.medicalExam', 'e')
      .innerJoin('m.medicalAppointment', 'ma')
      .innerJoin('ma.doctor', 'd')
      .innerJoin('d.specialty', 's')
      .innerJoin('ma.patient', 'p')
      .getRawMany(); 
    return data;
  }catch (error) {
    console.log('getMedicalExamsAppointment Error:', error);
    return error;
  }
}

export async function createMedicalExamAppointment(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;
    const {idMedicalAppointment, idMedicalExam} = req.payload;
    const [medicalAppointments, medicalExam, exitExam] = await Promise.all([
      connection.manager.findOne(MedicalAppointments, idMedicalAppointment),
      connection.manager.findOne(MedicalExams, idMedicalExam),
      connection.manager.count(MedicalExamsAppointment, { where: { medicalAppointment: idMedicalAppointment, medicalExam: idMedicalExam}}),
    ]);

    if (!medicalAppointments) throw Boom.badRequest('la cita medica no existe');
    if (!medicalExam) throw Boom.badRequest('El examen no existe');
    if (exitExam) throw Boom.badRequest('El paciente ya tiene asignado ese examen en la cita');
    
    const newexitExam = new MedicalExamsAppointment();
    newexitExam.medicalAppointment = idMedicalAppointment;
    newexitExam.medicalExam = idMedicalExam;;
    await connection.manager.save(newexitExam);
    return {'message' :  'Los examenes del paciente se crearon corectamente'};
  }catch (error) {
    console.log('createMedicalExamsAppointment Error:', error);
    return {'message' : error};
  }
} 
