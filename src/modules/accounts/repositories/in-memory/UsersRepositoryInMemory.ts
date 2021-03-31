import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

const users: User[] = [];

class UsersRepositoryInMemory implements IUsersRepository {
  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      driver_license,
      email,
    });

    users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
