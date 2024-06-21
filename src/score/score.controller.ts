import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ScoreService } from './score.service';
import { JWTGuard } from 'src/auth/utils/JWTGuard';
import { ScoreDto } from './dtos/score.dto';
import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(JWTGuard)
  @UseGuards(ThrottlerGuard)
  submitScore(@Body() score: ScoreDto, @Req() req: Request) {
    return this.scoreService.submitScore(score, req.user['username']);
  }

  @Get('leaderboard')
  @UseGuards(ThrottlerGuard)
  getLeaderboard() {
    return this.scoreService.getLeaderboard();
  }
}
