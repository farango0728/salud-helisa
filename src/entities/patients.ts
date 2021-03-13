import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
      
      @Entity()
export default class Patients extends SharedProp{
      
          @PrimaryColumn() 
          identification: number;
      
          @Column()
          name: string; 
      
          @Column()
          state: boolean 
}