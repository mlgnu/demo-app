import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from 'src/typeorm/Score';
import { Repository } from 'typeorm';
import { ScoreDto } from './dtos/score.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score) private scoreRepo: Repository<Score>,
    private readonly authService: AuthService,
  ) {}
  async submitScore(score: ScoreDto, username: string) {
    const user = await this.authService.findUserByUsername(score.username);

    if (!user) {
      throw new Error('User not found');
    }

    if (score.username !== username && user.role !== 1) {
      throw new Error('Unauthorized to submit score for another user');
    }

    return this.scoreRepo.save({ ...score, user });
  }

  async getLeaderboard() {
    const leadeboard = await this.scoreRepo.find({
      select: {
        user: {
          username: true,
        },
      },
      order: {
        score: 'DESC',
      },
      relations: {
        user: true,
      },
      take: 10,
    });
    return leadeboard;
  }
}
