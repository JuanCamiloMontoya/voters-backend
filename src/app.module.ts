import { Module } from '@nestjs/common';
import { CommonModule } from './@common/common.module';
import { UsersModule } from './modules/users/users.module';
import { VotersModule } from './modules/voters/voters.module';
import { AuthModule } from './modules/auth/auth.module';
import { GeneralModule } from './modules/general/general.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule, VotersModule, GeneralModule],
})
export class AppModule {}
