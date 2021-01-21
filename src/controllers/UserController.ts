import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
  
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
  
      const createUser = new CreateUserService();
    
      const user = await createUser.execute({
        name,
        email,
        password,
      });
    
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}