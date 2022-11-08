import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageMetaDto } from 'src/@common/models/dtos/page-meta.dto'
import { PageOptionsDto } from 'src/@common/models/dtos/page-options.dto'
import { PageDto } from 'src/@common/models/dtos/page.dto'
import { Person } from 'src/entities/voters/person.entity'
import { Repository } from 'typeorm'
import { CreateVoterDTO } from './dto/create-voter.dto'

@Injectable()
export class VotersService {

  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  async createVoter(voter: CreateVoterDTO) {

  }

  async getVoters(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.personRepository.createQueryBuilder('voter')

    queryBuilder.orderBy('voter.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    const itemCount = await queryBuilder.getCount()

    const voters = await queryBuilder.getMany()
    //console.log("RAW", raw)
    console.log("voters", voters, itemCount)
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

    return new PageDto(voters, pageMetaDto)
  }

}
