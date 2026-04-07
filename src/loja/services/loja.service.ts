import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Loja } from "../entitites/loja.entity";

@Injectable()
export class LojaService { //Define o Service

    constructor(
        @InjectRepository(Loja)
        private lojaRepository: Repository<Loja>
    ) {} //Conexão com Banco de Dados

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

    async create(loja: Loja): Promise<Loja> {
        return await this.lojaRepository.save(loja);
    } //Criar Loja

    async update(loja: Loja): Promise<Loja> { 
        await this.findById(loja.id); //Verifica se a Loja Existe

        return await this.lojaRepository.save(loja); //Salvar dados Atualizados
    } 

    async delete(id: number): Promise<{ message: string }> {
        await this.findById(id);

        await this.lojaRepository.delete(id);

        return { message: 'Deletado com sucesso' };
}
}