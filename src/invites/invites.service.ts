// src/invites/invites.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient, InviteStatus } from '@prisma/client';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvitesService {
  constructor(private prisma: PrismaClient) {}

  private logAction(action: string, id: number) {
    const entry = `${new Date().toISOString()} | Invite ${id} | ${action}\n`;
    fs.appendFileSync(path.resolve('log.txt'), entry);
  }

  async create(dto: CreateInviteDto) {
    // Prevent duplicate teacher-student-time invites
    const exists = await this.prisma.lessonInvite.findFirst({
      where: {
        teacherId: dto.teacherId,
        studentId: dto.studentId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
    if (exists) throw new BadRequestException('Duplicate invite.');

    const invite = await this.prisma.lessonInvite.create({
      data: {
        teacher: { connect: { id: dto.teacherId } },
        student: { connect: { id: dto.studentId } },
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
    this.logAction('CREATED', invite.id);
    return invite;
  }

  async updateStatus(id: number, dto: UpdateInviteDto) {
    const invite = await this.prisma.lessonInvite.findUnique({ where: { id } });
    if (!invite) throw new BadRequestException('Invite not found.');

    if (dto.status === InviteStatus.accepted) {
      // Ensure one future accepted invite per sstudent
      const conflict = await this.prisma.lessonInvite.findFirst({
        where: {
          studentId: invite.studentId,
          status: InviteStatus.accepted,
          scheduledAt: { gt: new Date() },
        },
      });
      if (conflict) throw new BadRequestException('Student already has an accepted invite.');

      // Auto-reject other invites at the same time
      await this.prisma.lessonInvite.updateMany({
        where: {
          studentId: invite.studentId,
          scheduledAt: invite.scheduledAt,
          id: { not: id },
        },
        data: { status: InviteStatus.rejected },
      });
    }

    const updated = await this.prisma.lessonInvite.update({
      where: { id },
      data: { status: dto.status },
    });
    this.logAction(dto.status.toUpperCase(), id);
    return updated;
  }

  findAll(status?: InviteStatus) {
    return this.prisma.lessonInvite.findMany({
      where: status ? { status } : {},
      include: { teacher: true, student: true },
      orderBy: { scheduledAt: 'desc' },
    });
  }
}
