import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinTable
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Specialty from './specialty'
  
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
      @JoinTable()
      specialty: Specialty[];
}