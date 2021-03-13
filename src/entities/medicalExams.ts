import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import MedicalExamsAppointment from './medicalExamsAppointment';
      
@Entity()
export default class MedicalExams extends SharedProp{
      
      @PrimaryGeneratedColumn() 
      id: number;

      @Column()
      name: string; 

      @Column({ default: true })
      state: boolean

      /** Relation to MedicalAppointments */
      @OneToMany(
        type => MedicalExamsAppointment,
        medicalExamsAppointment => medicalExamsAppointment.medicalExam,
      )
      medicalExamsAppointment: MedicalExamsAppointment[];

}