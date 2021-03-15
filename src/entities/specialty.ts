import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Doctors from './doctors';
    
    @Entity()
export default class Specialty extends SharedProp{
    
        @PrimaryGeneratedColumn() 
        id: number;
    
        @Column()
        name: string; 
    
        @Column()
        state: boolean 

         /** Relation to Doctors */
         @OneToMany(() => Doctors, doctor => doctor.specialty)
         Doctors: Doctors;

         
}