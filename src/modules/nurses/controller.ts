import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import Nurses from '../../entities/nurses';
import { Message} from './types'; 


export async function getNurses(req: Hapi.request) : Promise<Nurses[]>{
  
  const connection: Connection = req.server.app.connection;
  const data = await connection.manager.find(Nurses, {
    order: {
      name: 'ASC' 
    },
    cache: true
  });
  
  return data;
}

export async function createNurse(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;

    const exitNurse = await connection.manager.count(Nurses, {
      where: {
        identification: req.payload.identification
      },
    });
      
    if(exitNurse) throw Boom.badRequest('La Identificacion del Enfermero ya Existe');

    const newNurse = new Nurses();
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

export async function updateNurse(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const {
      identification,
      name,
      state
    } = req.payload;

    await connection.manager.update(Nurses, identification, {
      name,
      state
    });
   
    return { 'message' : 'Datos Actualizados' };

  }catch (error) {
    console.log('updateDoctor Error:', error);
    return { 'message' : error};
  }
} 