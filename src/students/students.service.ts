import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaClient) {}

  async create(dto: CreateStudentDto) {
    const exists = await this.prisma.student.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Student email already in use.');

    return this.prisma.student.create({ data: dto });
  }

  findAll() {
    return this.prisma.student.findMany({ orderBy: { name: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }
}
