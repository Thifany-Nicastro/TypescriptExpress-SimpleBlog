import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PostsRepository from '../repositories/PostsRepository';
import CreatePostService from '../services/CreatePostService';

const postsRouter = Router();

postsRouter.get('/', async (request, response) => {
  const postsRepository = getCustomRepository(PostsRepository);
  const posts = await postsRepository.find({ relations: ["user"] });

  return response.json(posts);
});

postsRouter.post('/', async (request, response) => {
  try {
    const { title, body, user } = request.body;

    const createPost = new CreatePostService();
  
    const post = await createPost.execute({
      title,
      body,
      user,
    });
  
    return response.json(post);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default postsRouter;