import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaClient) {}

  async create(dto: CreateTeacherDto) {
    // Prevent duplicate emails at the app layer
    const exists = await this.prisma.teacher.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Teacher email already in use.');

    return this.prisma.teacher.create({ data: dto });
  }

  findAll() {
    return this.prisma.teacher.findMany({ orderBy: { name: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }
}
