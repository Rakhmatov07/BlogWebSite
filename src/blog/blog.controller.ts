import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IBlog } from 'src/models/blog.model';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    const newBlog = await this.blogService.create(createBlogDto);
    return { message: 'Success', newBlog };
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IBlog> {
    const blog = await this.blogService.findOne(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.blogService.update(id, updateBlogDto);

    if (updatedBlog) {
      return { message: 'Blog updated successfully', updatedBlog };
    } else {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.blogService.remove(id);
    return { message: 'Blog deleted successfully' };
  }
}
