import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { LojaService } from "../services/loja.service";
import { Loja } from "../entities/loja.entity";


@Controller ("/loja") // http://localhost:4000/loja 
export class LojaController{
    constructor(private readonly lojaService : LojaService){}

    @Get() 
    @HttpCode(HttpStatus.OK)
    findAll(){ // pesquisar todas as lojas
        return this.lojaService.findAll();
    }
    @Get('/:id') //ex: http://localhost:4000/loja/1
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number){ // pesquisar por id
        return this.lojaService.findById(id);
    }

    @Get('/:nome') // ex: http://localhost:4000/loja/(nome)
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string) : Promise<Loja[]>{ // pesquisar por nome
        return this.lojaService.findByNome(nome);
    }

    @Post() // ex: http://localhost:4000/loja
    @HttpCode(HttpStatus.OK)
    create(@Body() loja: Loja): Promise<Loja>{  // criar pelo Json
        return this.lojaService.create(loja);
    }

    @Delete('/:id') //ex: http://localhost:4000/loja/(id)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number){ // deletar
        return this.lojaService.delete(id);
    }

}