import { Module } from '@nestjs/common';
import { RecadoService } from './recado.service';
import { RecadoController } from './recado.controller';

@Module({
  controllers: [RecadoController],
  providers: [RecadoService],
})
export class RecadoModule {}
