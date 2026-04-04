import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findByType(type: string) {
    return this.categoryRepository.find({ where: { type } as any });
  }

  async findOne(id: string) {
    return this.categoryRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryId = parseInt(id, 10);
    await this.categoryRepository.update(categoryId, updateCategoryDto);
    return this.categoryRepository.findOneBy({ id: categoryId });
  }

  async remove(id: string) {
    return this.categoryRepository.delete(parseInt(id, 10));
  }
}
