import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojaController } from './loja/controller/loja.controller';
import { Loja } from './loja/entitites/loja.entity';
import { LojaModule } from './loja/loja.module';
import { LojaService } from './loja/services/loja.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // configuracao do banco de dados.
      type: 'mysql', // tipo do banco de dados
      host: 'localhost', // aqui é host da banco de dados
      port: 3306, // a porta do banco de dados
      username: 'root', // usuario de voces.
      password: 'root', // senha do banco de dados de vcs
      database: 'db_vitarun', // nome do banco de dados do vittarum. (ps Eu esqueci um t peço perdao.)
      entities: [Loja],
      synchronize: true,
    }),
    LojaModule
  ],
  controllers: [LojaController],
  providers: [LojaService],
})
export class AppModule {}
