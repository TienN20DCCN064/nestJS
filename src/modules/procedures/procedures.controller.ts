import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { Public, Roles } from '@/decorator/customize';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.proceduresService.create(createProcedureDto);
  }

  @Get()
  @Public()
  findAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.proceduresService.findAll(+skip, +limit);
  }

  @Get('count')
  @Public()
  count() {
    return this.proceduresService.count();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.proceduresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcedureDto: UpdateProcedureDto) {
    return this.proceduresService.update(id, updateProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proceduresService.remove(id);
  }
}
