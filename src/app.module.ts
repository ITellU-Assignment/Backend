import { Module } from '@nestjs/common';
import { InvitesModule } from './invites/invites.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [
    PrismaModule,
    TeachersModule,
    StudentsModule,
    InvitesModule,
  ],
})
export class AppModule {}
