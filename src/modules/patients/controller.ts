import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import Patients from '../../entities/patients';
import { Message} from './types'; 


export async function getPatients(req: Hapi.request) : Promise<Patients[]>{
  
  const connection: Connection = req.server.app.connection;
  const data = await connection.manager.find(Patients, {
    order: {
      name: 'ASC' 
    },
    cache: true
  });
  
  return data;
}

export async function createPatient(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;

    const exitNurse = await connection.manager.count(Patients, {
      where: {
        identification: req.payload.identification
      },
    });
      
    if(exitNurse) throw Boom.badRequest('La Identificacion del Paciente ya Existe');

    const newNurse = new Patients();
    newNurse.identification = req.payload.identification;
    newNurse.name = req.payload.name;
    newNurse.state = req.payload.state;
    await connection.manager.save(newNurse);
    return {'message' : 'Los datos del Enfermero se crearon'};
  }catch (error) {
    console.log('createDoctor Error:', error);
    return {'message' : error};
  }
} 

export async function updatePatient(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const {
      identification,
      name,
      state
    } = req.payload;

    await connection.manager.update(Patients, identification, {
      name,
      state
    });
   
    return { 'message' : 'Datos Actualizados' };

  }catch (error) {
    console.log('updateDoctor Error:', error);
    return { 'message' : error};
  }
} 