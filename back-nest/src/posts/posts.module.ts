// posts.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { PostsCron } from './posts.cron';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService,PostsCron],
  controllers: [PostsController],
})
export class PostsModule {}
