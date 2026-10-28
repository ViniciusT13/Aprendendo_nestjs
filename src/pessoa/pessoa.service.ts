import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}
  async create(createPessoaDto: CreatePessoaDto) {
    const pessoaData = {
      nome: createPessoaDto.nome,
      passwordHash: createPessoaDto.password,
      email: createPessoaDto.email,
    };
    const novaPessoa = this.pessoaRepository.create(pessoaData);
    await this.pessoaRepository.save(novaPessoa);
    return novaPessoa;
  }

  async findAll() {
    const pessoas = this.pessoaRepository.find({
      order: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };
    const person = await this.pessoaRepository.preload({
      id,
      ...dadosPessoa,
    });
    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return this.pessoaRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.pessoaRepository.findOneBy({
      id,
    });
    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return this.pessoaRepository.remove(person);
  }
}
