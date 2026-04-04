import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';
import { Procedure } from './entities/procedure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProceduresController],
  providers: [ProceduresService],
  exports: [ProceduresService],
})
export class ProceduresModule {}
