import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import Doctors from '../../entities/doctors';
import { Message} from './types'; 


export async function getDoctors(req: Hapi.request) : Promise<Doctors[]>{
  
  const connection: Connection = req.server.app.connection;
  const data = await connection.manager.find(Doctors, {
    relations: ['specialty'],
    order: {
      name: 'ASC' 
    },
    cache: true
  });
  
  return data;
}

export async function createDoctor(req: Hapi.request) : Promise<Message> {
  try{
      const connection: Connection = req.server.app.connection;

      const exitDoctor = await connection.manager.count(Doctors, {
        where: {
          identification: req.payload.identification
        },
      });
      
      if(exitDoctor) throw Boom.badRequest('La Identificacion del Medico ya Existe');

      const newDoctor = new Doctors();
      newDoctor.identification = req.payload.identification;
      newDoctor.name = req.payload.name;
      newDoctor.cardNumber = req.payload.cardNumber;
      newDoctor.specialty = req.payload.idSpecialty;
      newDoctor.state = req.payload.state;
      await connection.manager.save(newDoctor);
      return {'message' : 'Los datos del Medico se crearon'};
    }catch (error) {
      console.log('createDoctor Error:', error);
      return {'message' : error};
    }
} 

export async function updateDoctor(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const {
      identification,
      name,
      cardNumber,
      idSpecialty,
      state
    } = req.payload;

    await connection.manager.update(Doctors, identification, {
      name,
      cardNumber,
      specialty: idSpecialty,
      state
    });
   
    return { 'message' : 'Datos Actualizados' };

  }catch (error) {
    console.log('updateDoctor Error:', error);
    return { 'message' : error};
  }
} 