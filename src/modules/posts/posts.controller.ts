import { Controller, Get, Post as PostMethod, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Public } from '@/decorator/customize';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostMethod()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Public()
  @Get()
  findAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.postsService.findAll(+skip, +limit);
  }

  @Public()
  @Get('featured')
  findFeatured() {
    return this.postsService.findFeatured();
  }

  @Public()
  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.postsService.findByCategory(categoryId);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
