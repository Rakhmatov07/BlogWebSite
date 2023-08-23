import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { v4 as uuid } from 'uuid';

import { CreateBlogDto, UpdateBlogDto } from './dto';
import { IBlog } from '../models/blog.model';
import { IRequest } from 'src/shared/types/request.type';

@Injectable()
export class BlogService {
  
  async create(createBlogDto: CreateBlogDto, req: IRequest) {
    const blogs = await this.findAll();
    const { title, description, imageName } = createBlogDto;
    const newBlog = {
      id: uuid(),
      title,
      description,
      imageName,
      userId: req.user,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    blogs.push(newBlog);
    await fs.writeFile(
      './database/blogs.json',
      JSON.stringify(blogs, null, 2),
      'utf-8',
    );

    return { message: 'Successfully created', newBlog };
  }

  async findAll() {
    const blogs = await fs.readFile('./database/blogs.json', 'utf-8');
    return blogs ? JSON.parse(blogs) : [];
  }

  async findOne(id: string): Promise<IBlog> {
    const blogs = await this.findAll();

    return blogs.find((blog: { id: string }) => blog.id == id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blogs = await this.findAll();
    const index = blogs.findIndex((blog: { id: string; }) => blog.id === id);

    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...updateBlogDto };
      blogs[index]['updatedAt'] = new Date(); 
      await fs.writeFile(
        './database/blogs.json',
        JSON.stringify(blogs, null, 2),
        'utf-8');
      return blogs[index];
    }

    return null;
  }

  async remove(id: string) {
    const blogs = await this.findAll();
    const updatedBlogs = blogs.filter((blog: { id: string; }) => blog.id !== id);

    await fs.writeFile(
      './database/blogs.json',
      JSON.stringify(updatedBlogs, null, 2),
      'utf-8',
    );

    return { message: 'Blog deleted successfully' };
  }
}
