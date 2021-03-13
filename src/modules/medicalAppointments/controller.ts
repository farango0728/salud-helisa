import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import MedicalAppointments from '../../entities/medicalAppointments';
import { Message, TypeMedicalAppointment} from './types'; 


export async function getMedicalAppointment(req: Hapi.request) : Promise<TypeMedicalAppointment[]>{
  
  try{
    const connection: Connection = req.server.app.connection;
    const data = await connection.manager
      .createQueryBuilder()
      .select(['m.id as id', 'm.date as date', 'm.idPatient', 'p.name as patient', 'm.idDoctor', 'd.name as doctor', 'd.specialty as idSpecialty','s.name as especialty', 'm.idNurse', 'n.name as nurse', 'm.state as state'])
      .from(MedicalAppointments, 'm')
      .innerJoin('m.patient', 'p')
      .innerJoin('m.doctor', 'd')
      .innerJoin('m.nurse', 'n')
      .innerJoin('d.specialty', 's')
      .getRawMany();  
    return data;
  }catch (error) {
    console.log('getMedicalAppointment Error:', error);
    return error;
  }
}

export async function createMedicalAppointment(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;

    const newQuotes = new MedicalAppointments();
    newQuotes.date = new Date(req.payload.date);
    newQuotes.doctor = req.payload.idDoctor;
    newQuotes.patient =req.payload.idPatient;
    newQuotes.nurse = req.payload.idNurse;
    newQuotes.state = req.payload.state;
    await connection.manager.save(newQuotes);
    return {'message' : 'Los datos del Enfermero se crearon'};
  }catch (error) {
    console.log('createMedicalAppointment Error:', error);
    return {'message' : error};
  }
} 

export async function updateMedicalAppointment(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const {
      identification,
      name,
      state
    } = req.payload;

    await connection.manager.update(MedicalAppointments, identification, {
      state
    });
   
    return { 'message' : 'Datos Actualizados' };

  }catch (error) {
    console.log('updateMedicalAppointment Error:', error);
    return { 'message' : error};
  }
} 