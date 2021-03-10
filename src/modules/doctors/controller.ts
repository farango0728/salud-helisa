import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Doctors from '../../entities/doctors';
import { Status} from './types'; 


export async function getDoctors(req: Hapi.request) {
  
  const connection: Connection = req.server.app.connection;
  const data = await connection.manager.find(Doctors, {
    order: {
      name: 'ASC'
    },
  });
  
  return data
}

export async function createDoctor(req: Hapi.request) {
  try{
    const connection: Connection = req.server.app.connection;
    const newDoctor = new Doctors();

    const exitDoctor = await connection.manager.find(Doctors, {
      where: {
        identification: req.payload.identification
      },
    });

    if(exitDoctor){
      return {"message" : "La identificacion del doctor ya existe"}
    }

    newDoctor.identification = req.payload.identification;
    newDoctor.name = req.payload.name;
    newDoctor.cardNumber = req.payload.cardNumber;
    newDoctor.specialty = req.payload.specialty;
    newDoctor.state = req.payload.state;
    await connection.manager.save(newDoctor);
    return {"message" : "Los datos delDoctor se crearon"}
  }catch (error) {
    console.log('createDoctor Error:', error);
    return {"message" : error}
  }
} 

export async function updateDoctor(req: Hapi.request)   {
  try {
    const connection: Connection = req.server.app.connection;
    const {
      identification,
      name,
      cardNumber,
      specialty,
      state
    } = req.payload;

    await connection.manager.update(Doctors, identification, {
      name,
      cardNumber,
      specialty,
      state
    });
   
    return { "message" : "Datos Actualizados" }

  }catch (error) {
    console.log('updateDoctor Error:', error);
    return { "message" : error};
  }
} 