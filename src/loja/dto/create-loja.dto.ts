import { IsNotEmpty, IsString, Matches, Length, IsOptional } from 'class-validator';

export class CreateLojaDto {

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(3, 100, { message: 'Nome deve ter entre 3 e 100 caracteres' })
  nome!: string;

  @IsNotEmpty({ message: 'CNPJ é obrigatório' })
  @IsString({ message: 'CNPJ deve ser uma string' })
  @Matches(/^\d{14}$/, { message: 'CNPJ deve conter 14 números' })
  cnpj!: string;

  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @IsString({ message: 'CEP deve ser uma string' })
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido. Formato esperado: 12345-678' })
  cep!: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @IsString({ message: 'Descrição deve ser uma string' })
  @Length(1, 1000, { message: 'Descrição deve ter entre 1 e 1000 caracteres' })
  descricao!: string;

  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @IsString({ message: 'Categoria deve ser uma string' })
  @Length(1, 255, { message: 'Categoria deve ter até 255 caracteres' })
  categoria!: string;

  @IsOptional()
  aberto?: boolean;
}