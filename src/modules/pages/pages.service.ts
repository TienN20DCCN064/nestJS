import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const existing = await this.pageRepository.findOneBy({ slug: createPageDto.slug });
    if (existing) {
      await this.pageRepository.update(existing.id, createPageDto as any);
      return this.pageRepository.findOneBy({ id: existing.id });
    }
    const page = this.pageRepository.create(createPageDto as any);
    return this.pageRepository.save(page);
  }

  async findAll(onlyPublished = false) {
    if (onlyPublished) {
      return this.pageRepository.find({ where: { isPublished: true } });
    }
    return this.pageRepository.find();
  }

  async findOne(id: string) {
    return this.pageRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async findBySlug(slug: string, onlyPublished = false) {
    if (onlyPublished) {
      return this.pageRepository.findOneBy({ slug, isPublished: true });
    }
    return this.pageRepository.findOneBy({ slug });
  }

  async findByType(type: string, onlyPublished = false) {
    const where: any = { type };
    if (onlyPublished) {
      where.isPublished = true;
    }
    return this.pageRepository.findOneBy(where);
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    const pageId = parseInt(id, 10);
    await this.pageRepository.update(pageId, updatePageDto as any);
    return this.pageRepository.findOneBy({ id: pageId });
  }

  async updateBySlug(slug: string, updatePageDto: UpdatePageDto) {
    const existing = await this.pageRepository.findOneBy({ slug });
    if (!existing) {
      return null;
    }
    await this.pageRepository.update(existing.id, updatePageDto as any);
    return this.pageRepository.findOneBy({ id: existing.id });
  }

  async remove(id: string) {
    const result = await this.pageRepository.delete(parseInt(id, 10));
    return result;
  }
}
