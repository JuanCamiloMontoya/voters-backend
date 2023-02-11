import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'
import { PageMetaDto } from 'src/@common/models/dtos/page-meta.dto'
import { PageOptionsDto } from 'src/@common/models/dtos/page-options.dto'
import { PageDto } from 'src/@common/models/dtos/page.dto'
import { Person } from 'src/entities/voters/person.entity'
import { CreateVoterDTO } from './dto/create-voter.dto'
import { Occupation } from 'src/entities/voters/occupation.entity'
import { Hobby } from 'src/entities/voters/hobby.entity'
import { Subdivision } from 'src/entities/geographic/subdivision.entity'

@Injectable()
export class VotersService {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private dataSource: DataSource
  ) { }

  async createVoter(voter: CreateVoterDTO) {

    let newVoter: Person

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const { document } = voter
      const { manager } = queryRunner

      const existDocument = await manager.findOne(Person, { where: { document } })
      if (existDocument)
        throw new HttpException('El número de documento ya existe!', HttpStatus.CONFLICT)

      let hobbies: Hobby[]
      if (voter.hobbies)
        hobbies = await manager.find(Hobby, { where: { id: In(voter.hobbies) } })

      let occupations: Occupation[]
      if (voter.occupations)
        occupations = await manager.find(Occupation, { where: { id: In(voter.occupations) } })

      let subdivision: Subdivision
      if (voter.subdivisionId)
        subdivision = await manager.findOne(Subdivision, { where: { id: voter.subdivisionId } })

      newVoter = await manager.save(Person, {
        ...voter,
        hobbies,
        occupations,
        subdivision
      })

      await queryRunner.commitTransaction()

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    } finally {
      await queryRunner.release()
    }

    return newVoter
  }

  async checkDocument(document: string) {
    const person = await this.personRepository.findOne({ where: { document } })
    return { exists: person ? true : false }
  }

  async getVoters(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.personRepository.createQueryBuilder('voter')

    queryBuilder.orderBy('voter.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    const itemCount = await queryBuilder.getCount()

    const voters = await queryBuilder.getMany()

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(voters, pageMetaDto)
  }

}