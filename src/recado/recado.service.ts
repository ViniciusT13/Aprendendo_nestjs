import { Injectable } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadoService {
  create(createRecadoDto: CreateRecadoDto) {
    return 'This action adds a new recado';
  }

  findAll() {
    return `This action returns all recado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recado`;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    return `This action updates a #${id} recado`;
  }

  remove(id: number) {
    return `This action removes a #${id} recado`;
  }
}
