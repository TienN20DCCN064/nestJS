import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.postModel
      .find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('categoryId');
  }

  async findOne(id: string) {
    return this.postModel.findById(id).populate('categoryId');
  }

  async findBySlug(slug: string) {
    return this.postModel.findOne({ slug }).populate('categoryId');
  }

  async findByCategory(categoryId: string) {
    return this.postModel.find({ categoryId, isPublished: true });
  }

  async findFeatured(limit = 5) {
    return this.postModel
      .find({ isFeatured: true, isPublished: true })
      .limit(limit);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
