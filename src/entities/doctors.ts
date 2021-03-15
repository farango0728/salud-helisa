import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Specialty from './specialty';
import MedicalAppointments from './medicalAppointments';
  
  @Entity()
export default class Doctors extends SharedProp{
  
      @PrimaryColumn('double') 
      identification: number;
  
      @Column()
      name: string; 
  
      @Column()
      cardNumber: string;
  
      @Column()
      state: boolean 

      /** Relation to Specialty */ 
      @ManyToOne(() => Specialty, specialty => specialty.id)
      specialty: Specialty[];

      /** Relation to MedicalAppointments */
      @OneToMany(
        type => MedicalAppointments,
        medicalAppointments => medicalAppointments.doctor,
      )
      
      medicalAppointments: MedicalAppointments[];
}