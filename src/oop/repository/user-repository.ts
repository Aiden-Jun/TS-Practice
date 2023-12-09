export interface IUserRepository {
  create_user(email, password, name, user_type);
}

export class UserRepository implements IUserRepository {}
