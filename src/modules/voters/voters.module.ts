import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotersService } from './voters.service';
import { VotersController } from './voters.controller';
import { UsersModule } from '../users/users.module';
import { Person } from 'src/entities/voters/person.entity';
import { Occupation } from 'src/entities/voters/occupation.entity';
import { Hobby } from 'src/entities/voters/hobby.entity';
import { Subdivision } from 'src/entities/geographic/subdivision.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Occupation, Hobby, Subdivision]),
    UsersModule,
  ],
  controllers: [VotersController],
  providers: [VotersService],
})
export class VotersModule {}
