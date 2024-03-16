import UserDomain from '../domain/user.js';
import {TypeUser} from '../specification/types.js';
import {BaseRepository} from './base-repository.js';

export interface IUserRepository {
  createUser(email: string, password: string, name: string, userType: string, money: string): void;
  findUserByEmail(email: string): Promise<UserDomain | undefined>;
  findUserByID(id: string): Promise<UserDomain | undefined>;
  findUserByEmailAndPassword(email: string, password: string): Promise<UserDomain | undefined>;
}

export class UserRepository extends BaseRepository implements IUserRepository {
  findUserByID(id: string): Promise<UserDomain | undefined> {
    throw new Error('Method not implemented.');
  }
  public async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDomain | undefined> {
    const userRows = await this.db.readCSV<TypeUser>('users.csv');
    console.log(userRows);
    for (let i = 0; i < userRows.length; i++) {
      let userRow = userRows[i];

      if (userRow.email == email && userRow.password == password) {
        console.log(this.convertUserFromRowToObject(userRow));
        return this.convertUserFromRowToObject(userRow);
      }
    }
  }
  public createUser(
    email: string,
    password: string,
    name: string,
    userType: string,
    money: string,
  ) {
    this.db.appendCSV('users.csv', `${email},${password},${name},${money},${userType}`);
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
    return new UserDomain(userRow);
  }
}
