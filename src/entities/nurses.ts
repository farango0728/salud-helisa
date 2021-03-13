import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import MedicalAppointments from './medicalAppointments'
      
@Entity()
export default class Nurses extends SharedProp{
      
  @PrimaryColumn() 
  identification: number;

  @Column()
  name: string; 

  @Column()
  state: boolean 
  
  /** Relation to MedicalAppointments */
  @OneToMany(
    type => MedicalAppointments,
    medicalAppointments => medicalAppointments.nurse,
  )
  medicalAppointments: MedicalAppointments[];
}