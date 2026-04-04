import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto as any);
    return await this.postRepository.save(post);
  }

  async findAll(skip = 0, limit = 10, type?: string, status?: string) {
    const where: any = {};
    if (status === 'all') {
      // No filter on isPublished
    } else if (status === 'draft') {
      where.isPublished = false;
    } else {
      where.isPublished = true; // default
    }

    if (type) {
      where.type = type;
    }
    return this.postRepository.find({
      where,
      order: { publishedAt: 'DESC' },
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    return this.postRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async findBySlug(slug: string) {
    return this.postRepository.findOneBy({ slug });
  }

  async findByCategory(categoryId: string) {
    return this.postRepository.find({
      where: { categoryId: parseInt(categoryId, 10), isPublished: true },
    });
  }

  async findFeatured(limit = 5) {
    return this.postRepository.find({
      where: { isFeatured: true, isPublished: true },
      take: limit,
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const postId = parseInt(id, 10);
    await this.postRepository.update(postId, updatePostDto as any);
    return this.postRepository.findOneBy({ id: postId });
  }

  async count(type?: string) {
    const where: any = { isPublished: true };
    if (type) {
      where.type = type;
    }
    return this.postRepository.count({ where });
  }

  async remove(id: string) {
    const result = await this.postRepository.delete(parseInt(id, 10));
    return result;
  }
}
