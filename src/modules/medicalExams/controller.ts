import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import MedicalExams from '../../entities/medicalExams';
import { Message, TypesMedicalExamn} from './types'; 


export async function getMedicalExamn(req: Hapi.request) : Promise<TypesMedicalExamn[]>{
  try{
    const connection: Connection = req.server.app.connection;
    const data = await connection.manager.find(MedicalExams, {
      select: ['id', 'name', 'state'],
      order: {
        id: 'ASC' 
      },
      cache: true
    });  
    return data;
  }catch (error) {
    console.log('getMedicalExamn Error:', error);
    return error;
  }
}

export async function createMedicalExam(req: Hapi.request) : Promise<Message> {
  try{
    const connection: Connection = req.server.app.connection;
    const exitExamn = await connection.manager.count(MedicalExams, {
      select : ['id'],
      where: {
        name: req.payload.name
      },
    });
        
    if(exitExamn) throw Boom.badRequest(`El examen  : ${req.payload.name} ya Existe`);

    const newMedicalExam = new MedicalExams();
    newMedicalExam.name = req.payload.name;
    await connection.manager.save(newMedicalExam);
    return {'message' :  `Los datos del examen : ${req.payload.name} fue creada en la BD`};
  }catch (error) {
    console.log('createMedicalExam Error:', error);
    return {'message' : error};
  }
} 

export async function updateMedicalExam(req: Hapi.request) : Promise<Message>   {
  try {
    const connection: Connection = req.server.app.connection;
    const exitExamn = await connection.manager.count(MedicalExams, {
      select : ['id'],
      where: {
        id: req.payload.id
      },
    });

    if(!exitExamn) throw Boom.badRequest(`El id : ${req.payload.id} no existe en plataforma`);

    const {
      id,
      name,
      state
    } = req.payload;

    await connection.manager.update(MedicalExams, id, {
      name,
      state
    });
   
    return { 'message' : `El id : ${id} se actualizo con el nombre : ${name} y estado : ${state}` };

  }catch (error) {
    console.log('updateMedicalExam Error:', error);
    return { 'message' : error};
  }
} 