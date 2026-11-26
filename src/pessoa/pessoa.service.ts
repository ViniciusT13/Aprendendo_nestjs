import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}
  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const passwordHash = await this.hashingService.hash(
        createPessoaDto.password,
      );
      const pessoaData = {
        nome: createPessoaDto.nome,
        passwordHash,
        email: createPessoaDto.email,
      };
      const novaPessoa = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
      throw error;
    }
  }

  async findAll() {
    const pessoas = this.pessoaRepository.find({
      order: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
    };
    if (updatePessoaDto?.password) {
      const passwordHash = await this.hashingService.hash(
        updatePessoaDto.password,
      );
      dadosPessoa['passwordHash'] = passwordHash;
    }
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
