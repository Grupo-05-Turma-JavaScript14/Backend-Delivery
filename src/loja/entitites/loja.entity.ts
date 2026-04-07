import { IsNotEmpty, Length} from 'class-validator';
import {  Column,  Entity, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({ name: 'db_vitarun' }) 
export class Loja {

  @PrimaryGeneratedColumn() 
  id!: number;

  @IsNotEmpty()
  @Length(3,100)
  @Column({ length: 100, nullable: false })
  nome!: string;
  
  @IsNotEmpty()
  @Column({ length: 1000})
  descricao!: string;
  
  @IsNotEmpty() 
  @Column({ length: 14, nullable: false })
  cnpj!: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  categoria!: string;
  
  @IsNotEmpty()
  @Column({  length: 9, nullable: false})
  cep!: string;  

  
  @Column({ default: false })
  aberto?: boolean;

}
