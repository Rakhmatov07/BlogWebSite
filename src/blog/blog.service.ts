import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IBlog } from '../models/blog.model';

@Injectable()
export class BlogService {
  async create(createBlogDto: CreateBlogDto) {
    const existingBlogs = await this.findAll();
    const newBlog: IBlog = {
      ...CreateBlogDto,
      id: 0,
      title: '',
      description: '',
    };
    existingBlogs.push(newBlog);
    await fs.writeFile(
      '../database/blogs.json',
      JSON.stringify(existingBlogs, null, 2),
      'utf-8',
    );
  }

  async findAll() {
    const blogs = await fs.readFile('../database/blogs.json', 'utf-8');
    return blogs ? JSON.parse(blogs) : [];
  }

  async findOne(id: number): Promise<IBlog> {
    const blogs = await this.findAll();

    return blogs.find((blog: { id: number }) => blog.id === id);
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blogs = await this.findAll();
    const index = blogs.findIndex((blog) => blog.id === id);

    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...updateBlogDto };
      await fs.writeFile(
        '../database/blogs.json',
        JSON.stringify(blogs, null, 2),
        'utf-8');
      return blogs[index];
    }
    return null;
  }

  async remove(id: number) {
    const blogs = await this.findAll(); // Use the existing getAll method
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);

    await fs.writeFile(
      '../database/blogs.json',
      JSON.stringify(updatedBlogs, null, 2),
      'utf-8',
    );
  }
}
