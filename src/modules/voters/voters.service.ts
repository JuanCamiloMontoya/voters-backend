import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { PageMetaDto } from 'src/@common/models/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/@common/models/dtos/page-options.dto';
import { PageDto } from 'src/@common/models/dtos/page.dto';
import { Person } from 'src/entities/voters/person.entity';
import { CreateVoterDTO } from './dto/create-voter.dto';
import { Occupation } from 'src/entities/voters/occupation.entity';
import { Hobby } from 'src/entities/voters/hobby.entity';
import { Subdivision } from 'src/entities/geographic/subdivision.entity';
import { User } from 'src/entities/users/user.entity';
import { EState } from 'src/entities/@enums/state.enum';
import { UpdateVoterDTO } from './dto/update-voter.dto';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private dataSource: DataSource,
  ) {}

  async createVoter(voter: CreateVoterDTO, registrarId: number) {
    let newVoter: Person;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { document } = voter;
      const { manager } = queryRunner;

      const existDocument = await manager.findOneBy(Person, { document });
      if (existDocument)
        throw new HttpException(
          'El número de documento ya existe!',
          HttpStatus.CONFLICT,
        );

      let hobbies: Hobby[];
      if (voter.hobbies)
        hobbies = await manager.find(Hobby, {
          where: { id: In(voter.hobbies) },
        });

      let occupations: Occupation[];
      if (voter.occupations)
        occupations = await manager.find(Occupation, {
          where: { id: In(voter.occupations) },
        });

      let subdivision: Subdivision;
      if (voter.subdivision)
        subdivision = await manager.findOneBy(Subdivision, {
          id: voter.subdivision,
        });

      let registrar = await manager.findOneBy(User, { id: registrarId });

      newVoter = await manager.save(Person, {
        ...voter,
        hobbies,
        occupations,
        subdivision,
        registrar,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }

    return await this.getVoterDetail(newVoter.id);
  }

  async checkDocument(document: string) {
    const voter = await this.personRepository.findOneBy({ document });
    return { exists: voter ? true : false };
  }

  async getVoters(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.personRepository.createQueryBuilder('voter');

    queryBuilder
      .orderBy('voter.createdAt', pageOptionsDto.order)
      .where('voter.state != :state', { state: EState.Deleted })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.pageSize);

    const total = await queryBuilder.getCount();

    const voters = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

    return new PageDto(voters, pageMetaDto);
  }

  async getVoterDetail(id: number) {
    const voter = await this.personRepository.findOne({
      relations: {
        hobbies: true,
        occupations: true,
        subdivision: {
          division: true,
        },
      },
      where: { id },
    });

    if (!voter)
      throw new HttpException('El votante no existe!', HttpStatus.NOT_FOUND);

    return voter;
  }

  async updateVoter(id: number, voter: UpdateVoterDTO) {
    let updatedVoter: Person;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { manager } = queryRunner;
      let currentVoter = await manager.findOneBy(Person, { id });

      if (!currentVoter)
        throw new HttpException('El votante no existe!', HttpStatus.NOT_FOUND);

      let hobbies: Hobby[];
      if (voter.hobbies)
        hobbies = await manager.find(Hobby, {
          where: { id: In(voter.hobbies) },
        });

      let occupations: Occupation[];
      if (voter.occupations)
        occupations = await manager.find(Occupation, {
          where: { id: In(voter.occupations) },
        });

      let subdivision: Subdivision;
      if (voter.subdivision)
        subdivision = await manager.findOneBy(Subdivision, {
          id: voter.subdivision,
        });

      currentVoter = {
        ...currentVoter,
        firstname: voter.firstname,
        lastname: voter.lastname,
        phone: voter.phone,
        gender: voter.gender || null,
        email: voter.email || null,
        birthdate: voter.birthdate || null,
        subdivision: subdivision || null,
        occupations: occupations || [],
        hobbies: hobbies || [],
      };

      updatedVoter = await manager.save(Person, currentVoter);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }

    return updatedVoter;
  }

  async deleteVoter(id: number) {
    const voter = await this.personRepository.findOneBy({ id });

    if (!voter)
      throw new HttpException('El votante no existe!', HttpStatus.NOT_FOUND);

    await this.personRepository.update(id, { state: EState.Deleted });

    return { success: true };
  }
}
