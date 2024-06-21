import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ScoreDto {
  @IsNumberString()
  score: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
