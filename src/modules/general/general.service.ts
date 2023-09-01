import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from 'src/entities/geographic/division.entity';
import { Subdivision } from 'src/entities/geographic/subdivision.entity';
import { Hobby } from 'src/entities/voters/hobby.entity';
import { Occupation } from 'src/entities/voters/occupation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
    @InjectRepository(Hobby)
    private hobbyRepository: Repository<Hobby>,
    @InjectRepository(Occupation)
    private occupationRepository: Repository<Occupation>,
  ) {}

  async getDivisions() {
    return await this.divisionRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getSubdivisions(divisionId: number) {
    return await this.subdivisionRepository.find({
      where: { division: { id: divisionId } },
      order: { name: 'ASC' },
    });
  }

  async getFullSubdivisions(name: string) {
    return await this.divisionRepository
      .createQueryBuilder('division')
      .select('subdivision.id', 'id')
      .addSelect("CONCAT(subdivision.name, ' - ', division.name)", 'name')
      .innerJoin('division.subdivision', 'subdivision')
      .where('subdivision.name ILIKE :name', { name: `%${name}%` })
      .orderBy('name', 'ASC')
      .getRawMany();
  }

  async getFullSubdivision(id: number) {
    return await this.divisionRepository
      .createQueryBuilder('division')
      .select('subdivision.id', 'id')
      .addSelect("CONCAT(subdivision.name, ' - ', division.name)", 'name')
      .innerJoin('division.subdivision', 'subdivision')
      .where('subdivision.id = :id', { id })
      .getRawOne();
  }

  async getHobbies() {
    return await this.hobbyRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getOccupations() {
    return await this.occupationRepository.find({
      order: { name: 'ASC' },
    });
  }
}
