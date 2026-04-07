import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Loja } from "../entitites/loja.entity";
import { CreateLojaDto } from '../dto/create-loja.dto';

@Injectable()
export class LojaService { //Define o Service

    constructor(
        @InjectRepository(Loja)
        private lojaRepository: Repository<Loja>
    ) { } //Conexão com Banco de Dados

    async findAll(): Promise<Loja[]> {
        return await this.lojaRepository.find();
    }

    async findById(id: number): Promise<Loja> {  //Buscar Loja por ID
        const loja = await this.lojaRepository.findOne({
            where: { id }
        });

        if (!loja) {
            throw new HttpException("Loja não encontrada", HttpStatus.NOT_FOUND);
        } //Error 404

        return loja; //Retorna a Loja, caso for encontrada
    }

    async findByNome(nome: string): Promise<Loja[]> { //Buscar por Nome da Loja
        return await this.lojaRepository.find({
            where: {
                nome: ILike(`%${nome}%`) //Ignora maiúscula/minúscula
            }
        });
    }

    async create(dto: CreateLojaDto): Promise<Loja> {
        const Loja = this.lojaRepository.create(dto);
        return await this.lojaRepository.save(Loja);
    }

    async update(loja: Loja): Promise<Loja> {
        await this.findById(loja.id); //Verifica se a Loja Existe

        return await this.lojaRepository.save(loja); //Salvar dados Atualizados
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); //Verifica se o ID da Loja Existe

        return await this.lojaRepository.delete(id); //Apaga do Banco
    }
}