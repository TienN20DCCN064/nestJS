import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Public, Roles } from '@/decorator/customize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @Public()
  findAll(
    @Query('skip') skip = 0,
    @Query('limit') limit = 10,
  ) {
    return this.documentsService.findAll(+skip, +limit);
  }

  @Get('category/:categoryId')
  @Public()
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.documentsService.findByCategory(categoryId);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
