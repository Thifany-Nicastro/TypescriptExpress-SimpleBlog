import { getCustomRepository } from 'typeorm';

import Post from '../models/Post';
import PostRepository from '../repositories/PostsRepository';
import User from "../models/User";

interface Request {
  title: string;
  body: string;
  user: User;
}

class CreatePostService {
  public async execute({ title, body, user }: Request): Promise<Post> {
    const postsRepository = getCustomRepository(PostRepository);

    const post = postsRepository.create({
      title,
      body,
      user
    });

    await postsRepository.save(post);

    return post;
  }
}

export default CreatePostService;