import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VotersService } from './voters.service'
import { VotersController } from './voters.controller'
import { UsersModule } from '../users/users.module'
import { Person } from 'src/entities/voters/person.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    UsersModule
  ],
  controllers: [VotersController],
  providers: [VotersService]
})
export class VotersModule { }