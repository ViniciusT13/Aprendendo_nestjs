import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecadoService } from './recado.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Controller('recado')
export class RecadoController {
  constructor(private readonly recadoService: RecadoService) {}

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadoService.create(createRecadoDto);
  }

  @Get()
  findAll() {
    return this.recadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadoService.update(+id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadoService.remove(+id);
  }
}
