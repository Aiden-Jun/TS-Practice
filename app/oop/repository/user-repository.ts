import User from '../domain/user.js';
import {TypeUser} from '../specification/types.js';
import {BaseRepository} from './base-repository.js';

export interface IUserRepository {
  createUser(email: string, password: string, name: string, userType: string): void;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserByID(id: string): Promise<User | undefined>;
  findUserByEmailAndPassword(email: string, password: string): Promise<User | undefined>;
}

export class UserRepository extends BaseRepository implements IUserRepository {
  findUserByID(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  findUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  public createUser(email: string, password: string, name: string, userType: string) {
    this.db.appendCSV('users.csv', `${email},${password},${name},0,${userType}`);
  }

  public async findUserByEmail(email: string) {
    const userRows = await this.db.readCSV<TypeUser>('users.csv');
    for (let i = 0; i < userRows.length; i++) {
      let userRow = userRows[i];

      if (userRow.email == email) {
        console.log(this.convertUserFromRowToObject(userRow));
        return this.convertUserFromRowToObject(userRow);
      }
    }
  }

  public convertUserFromRowToObject(userRow: TypeUser) {
    return new User(userRow);
  }
}
