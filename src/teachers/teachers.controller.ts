// src/teachers/teachers.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private svc: TeachersService) {}

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(+id);
  }
}