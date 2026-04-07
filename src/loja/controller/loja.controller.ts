import { Body, Controller, Delete, Get, Put, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { LojaService } from "../services/loja.service";
import { Loja } from "../entitites/loja.entity";
import { CreateLojaDto } from '../dto/create-loja.dto';


@Controller("/loja") // http://localhost:4000/loja 
export class LojaController {
    constructor(private readonly lojaService: LojaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() { // pesquisar todas as lojas
        return this.lojaService.findAll();
    }

    @Get(':id') //ex: http://localhost:4000/loja/1
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number) { // pesquisar por id
        return this.lojaService.findById(id);
    }

    @Get('/nome/:nome') // ex: http://localhost:4000/loja/(nome)
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Loja[]> { // pesquisar por nome
        return this.lojaService.findByNome(nome);
    }

    @Post() // http://localhost:4000/loja
    @HttpCode(HttpStatus.CREATED) // 201 para criação
    async create(@Body() dto: CreateLojaDto) {
        const lojaCriada = await this.lojaService.create(dto);
        return {
            message: 'Criado com sucesso',
        };
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() loja: Loja) {
        const lojaAtualizada = await this.lojaService.update(loja);
        return {
            message: 'Atualizado com sucesso',
            loja: lojaAtualizada,
        };
    }

    @Delete('/:id') //ex: http://localhost:4000/loja/(id)
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number) { // deletar
        await this.lojaService.delete(id);
        return { message: 'Deletado com sucesso' };
    }

}