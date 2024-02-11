import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  async create(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  async update(id: number, post: Post): Promise<Post> {
    await this.postsRepository.update(id, post);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
