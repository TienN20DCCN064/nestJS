import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Public } from '@/decorator/customize';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Public()
  @Get()
  findAll(@Query('published') published?: string) {
    const isGuest = published === 'true';
    return this.pagesService.findAll(isGuest);
  }

  @Public()
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string, @Query('published') published?: string) {
    const isGuest = published === 'true';
    const page = await this.pagesService.findBySlug(slug, isGuest);
    if (!page) return null;
    return page;
  }

  @Public()
  @Get('type/:type')
  async findByType(@Param('type') type: string, @Query('published') published?: string) {
    const isGuest = published === 'true';
    const page = await this.pagesService.findByType(type, isGuest);
    if (!page) return null;
    return page;
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch('slug/:slug')
  updateBySlug(@Param('slug') slug: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.updateBySlug(slug, updatePageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
