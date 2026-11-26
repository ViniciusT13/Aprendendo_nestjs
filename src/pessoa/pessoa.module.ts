import { Module } from '@nestjs/common';
import { PessoasService } from './pessoa.service';
import { PessoasController } from './pessoa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
