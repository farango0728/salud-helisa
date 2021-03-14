import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Doctors from './doctors';
import Patients from './patients';
import Nurses from './nurses';
import MedicalExamsAppointment from './medicalExamsAppointment';
        
@Entity()
export default class MedicalAppointments extends SharedProp{
        
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    date: Date; 

    @Column()
    state: boolean

    /** Relation to patients */
    @ManyToOne(
      type => Patients,
      patient => patient.identification,
    )
      @JoinColumn({ name: 'idPatient' })
      patient: Patients;

    /** Relation to Doctors */
    @ManyToOne(
      type => Doctors,
      doctor => doctor.identification,
    )
    @JoinColumn({ name: 'idDoctor' })
    doctor: Doctors;


    /** Relation to Nurses */
    @ManyToOne(
      type => Nurses,
      nurse => nurse.identification,
    )
    @JoinColumn({ name: 'idNurse' })
    nurse: Nurses;

    /** Relation to MedicalAppointments */
    @OneToMany(
      type => MedicalExamsAppointment,
      medicalExamsAppointment => medicalExamsAppointment.medicalAppointment,
    )
    medicalAppointments: MedicalExamsAppointment[];


}