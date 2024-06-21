import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { Score } from 'src/typeorm/Score';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), AuthModule],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
