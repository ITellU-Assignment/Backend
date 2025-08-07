import { IsEnum } from 'class-validator';
import { InviteStatus } from '@prisma/client';

export class UpdateInviteDto {
  @IsEnum(InviteStatus) status: InviteStatus;
}
