import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';
  import {SharedProp} from './sharedProp.helpers';
  
  @Entity()
  export default class Doctors extends SharedProp{
  
      @PrimaryColumn("double") 
      identification: number;
  
      @Column()
      name: string; 
  
      @Column()
      cardNumber: string;
  
      @Column()
      specialty: number;
  
      @Column()
      state: boolean 
  }