import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import MedicalAppointments from './medicalAppointments';
import MedicalExams from './medicalExams';
      
@Entity()
export default class MedicalExamsAppointment extends SharedProp{
    
    @PrimaryGeneratedColumn() 
     id: number;
        
    /** Relation to MedicalAppointments */
    @ManyToOne(
      type => MedicalAppointments,
      medicalAppointments => medicalAppointments.id,
    )
      @JoinColumn({ name: 'idMedicalAppointment' })
      medicalAppointment: MedicalAppointments; 

    /** Relation to MedicalAppointments */
    @ManyToOne(
      type => MedicalExams,
      medicalExams => medicalExams.id,
    )
    @JoinColumn({ name: 'idMedicalExam' })
    medicalExam: MedicalExams; 
      

}