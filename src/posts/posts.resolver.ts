import { Resolver, Query } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(returns => [Post])
  async getPosts() {
    return await this.postsService.getAll();
  }
}
