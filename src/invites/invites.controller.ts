import { Controller, Post, Patch, Get, Param, Body, Query } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { InviteStatus } from '@prisma/client';
@Controller('invites')
export class InvitesController {
  constructor(private readonly service: InvitesService) {}

  @Post()
  create(@Body() dto: CreateInviteDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInviteDto) {
    return this.service.updateStatus(+id, dto);
  }

  @Get()
  findAll(@Query('status') status?: InviteStatus) {
    return this.service.findAll(status);
  }
}
