// src/invites/dto/create-invite.dto.ts
import { IsInt, IsDateString } from 'class-validator';

export class CreateInviteDto {
  @IsInt() teacherId: number;
  @IsInt() studentId: number;
  @IsDateString() scheduledAt: string;
}
