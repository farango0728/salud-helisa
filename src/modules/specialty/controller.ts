import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import Specialty from '../../entities/specialty';
import { Message, TypesSpecialty} from './types'; 


export async function getSpecialties(req: Hapi.request) : Promise<TypesSpecialty[]>{
  try{
    const connection: Connection = req.server.app.connection;
    const data = await connection.manager.find(Specialty, {
      select: ['id', 'name', 'state'],
      order: {
        id: 'ASC' 
      },
      cache: true
    });  
    return data;
  }catch (error) {
    console.log('getSpecialties Error:', error);
    return error;
  }
}

export async function createSpecialty(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;
    const exitSpecialty = await connection.manager.count(Specialty, {
      select : ['id'],
      where: {
        name: req.payload.name
      },
    });
        
    if(exitSpecialty) throw Boom.badRequest(`La especialidad : ${req.payload.name} ya Existe`);

    const newSpecialty = new Specialty();
    newSpecialty.name = req.payload.name;
    newSpecialty.state = true;
    await connection.manager.save(newSpecialty);
    return {'message' :  `Los datos de la especialidad : ${req.payload.name} fue creada en la BD`};
  }catch (error) {
    console.log('createSpecialty Error:', error);
    return {'message' : error};
  }
} 

export async function updateSpecialty(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const exitSpecialty = await connection.manager.count(Specialty, {
      select : ['id'],
      where: {
        id: req.payload.id
      },
    });

    if(!exitSpecialty) throw Boom.badRequest(`El id : ${req.payload.id} no existe en plataforma`);

    const {
      id,
      name,
      state
    } = req.payload;

    await connection.manager.update(Specialty, id, {
      name,
      state
    });
   
    return { 'message' : `El id : ${id} se actualizo con el nombre : ${name} y estado : ${state}` };

  }catch (error) {
    console.log('updateSpecialty Error:', error);
    return { 'message' : error};
  }
} 